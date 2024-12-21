import * as ftp from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import 'dotenv/config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const RECONNECT_DELAY = 5000;

class FtpSync {
    constructor() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = true;
        this.isConnected = false;
        this.connectionPromise = null;
        this.uploadQueue = new Set();
        this.deleteQueue = new Set();
        this.processing = false;
    }

    async connect() {
        if (this.isConnected) return;

        try {
            await this.client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER,
                password: process.env.FTP_PASS,
                secure: false
            });
            this.isConnected = true;
            console.log('Connected to FTP server');
        } catch (err) {
            console.error('FTP connection error:', err);
            this.isConnected = false;
            throw err;
        }
    }

    async ensureConnection() {
        if (!this.connectionPromise) {
            this.connectionPromise = this.connect().catch(async (err) => {
                console.log('Connection failed, retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY));
                this.connectionPromise = null;
                return this.ensureConnection();
            });
        }
        return this.connectionPromise;
    }

    async uploadFile(localPath, remotePath, retries = 0) {
        try {
            await this.ensureConnection();
            
            // Ensure remote directory exists
            const remoteDir = path.dirname(remotePath);
            await this.client.ensureDir(remoteDir);
            
            console.log(`Uploading ${localPath} to ${remotePath}`);
            await this.client.uploadFrom(localPath, remotePath);
            console.log(`Successfully uploaded ${localPath}`);
        } catch (err) {
            if (retries < MAX_RETRIES) {
                console.log(`Retry ${retries + 1}/${MAX_RETRIES} for ${localPath}`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return this.uploadFile(localPath, remotePath, retries + 1);
            }
            throw err;
        }
    }

    async deleteFile(remotePath, retries = 0) {
        try {
            await this.ensureConnection();
            console.log(`Deleting ${remotePath}`);
            await this.client.remove(remotePath);
            console.log(`Successfully deleted ${remotePath}`);
        } catch (err) {
            if (retries < MAX_RETRIES) {
                console.log(`Retry ${retries + 1}/${MAX_RETRIES} for deleting ${remotePath}`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return this.deleteFile(remotePath, retries + 1);
            }
            throw err;
        }
    }

    async processQueue() {
        if (this.processing) return;
        this.processing = true;

        try {
            // Process uploads
            for (const item of this.uploadQueue) {
                try {
                    await this.uploadFile(item.localPath, item.remotePath);
                    this.uploadQueue.delete(item);
                } catch (err) {
                    console.error(`Error uploading ${item.localPath}:`, err);
                }
            }

            // Process deletes
            for (const remotePath of this.deleteQueue) {
                try {
                    await this.deleteFile(remotePath);
                    this.deleteQueue.delete(remotePath);
                } catch (err) {
                    console.error(`Error deleting ${remotePath}:`, err);
                }
            }
        } finally {
            this.processing = false;
            
            // If there are still items in queue, process again
            if (this.uploadQueue.size > 0 || this.deleteQueue.size > 0) {
                setImmediate(() => this.processQueue());
            }
        }
    }

    queueUpload(localPath, remotePath) {
        this.uploadQueue.add({ localPath, remotePath });
        setImmediate(() => this.processQueue());
    }

    queueDelete(remotePath) {
        this.deleteQueue.add(remotePath);
        setImmediate(() => this.processQueue());
    }

    async close() {
        await this.client.close();
        this.isConnected = false;
        this.connectionPromise = null;
    }
}

// Validate environment variables
const requiredEnvVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    console.error('Please set these variables in your environment or .env file');
    process.exit(1);
}

const ftpSync = new FtpSync();
const localDir = path.resolve('dist');
const remoteDir = '/';

// Initialize watcher
const watcher = chokidar.watch(localDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

// Handle file events
watcher
    .on('add', filepath => {
        const relativePath = path.relative(localDir, filepath);
        const remotePath = path.join(remoteDir, relativePath).replace(/\\/g, '/');
        ftpSync.queueUpload(filepath, remotePath);
    })
    .on('change', filepath => {
        const relativePath = path.relative(localDir, filepath);
        const remotePath = path.join(remoteDir, relativePath).replace(/\\/g, '/');
        ftpSync.queueUpload(filepath, remotePath);
    })
    .on('unlink', filepath => {
        const relativePath = path.relative(localDir, filepath);
        const remotePath = path.join(remoteDir, relativePath).replace(/\\/g, '/');
        ftpSync.queueDelete(remotePath);
    })
    .on('error', error => console.error('Watcher error:', error));

console.log(`Watching ${localDir} for changes...`);

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\nClosing FTP connection...');
    await ftpSync.close();
    process.exit();
});
