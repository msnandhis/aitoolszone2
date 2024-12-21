import * as ftp from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import simpleGit from 'simple-git';

const git = simpleGit();

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadWithRetry(client, localPath, remotePath, retries = 0) {
    try {
        console.log(`Uploading ${localPath} to ${remotePath}`);
        await client.uploadFrom(localPath, remotePath);
    } catch (err) {
        if (retries < MAX_RETRIES) {
            console.log(`Retry ${retries + 1}/${MAX_RETRIES} for ${localPath}`);
            await sleep(RETRY_DELAY);
            return uploadWithRetry(client, localPath, remotePath, retries + 1);
        }
        throw err;
    }
}

async function uploadDirectory(client, localDir, remoteDir) {
    const files = fs.readdirSync(localDir);
    const failedUploads = [];
    
    for (const file of files) {
        const localPath = path.join(localDir, file);
        const remotePath = path.join(remoteDir, file).replace(/\\/g, '/');
        
        if (fs.statSync(localPath).isDirectory()) {
            try {
                await client.ensureDir(remotePath);
                const result = await uploadDirectory(client, localPath, remotePath);
                if (result.length > 0) {
                    failedUploads.push(...result);
                }
            } catch (err) {
                console.error(`Error processing directory ${localPath}:`, err);
                failedUploads.push({ path: localPath, error: err.message });
            }
        } else {
            try {
                await uploadWithRetry(client, localPath, remotePath);
            } catch (err) {
                console.error(`Error uploading file ${localPath}:`, err);
                failedUploads.push({ path: localPath, error: err.message });
            }
        }
    }
    
    return failedUploads;
}

async function deploy() {
    // Check for required environment variables
    const requiredEnvVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
        console.error('Missing required environment variables:', missingEnvVars.join(', '));
        console.error('Please set these variables in your environment or .env file');
        process.exit(1);
    }

    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        console.log('Connecting to FTP server...');
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false
        });

        console.log('Connected! Starting upload...');
        const localDir = path.resolve('dist');
        const remoteDir = '/';
        
        const failedUploads = await uploadDirectory(client, localDir, remoteDir);
        
        if (failedUploads.length > 0) {
            console.error('\nFailed uploads:');
            failedUploads.forEach(({path, error}) => {
                console.error(`- ${path}: ${error}`);
            });
            process.exit(1);
        } else {
            console.log('FTP deployment completed successfully!');
            
            // Git operations
            try {
                console.log('Starting git operations...');
                
                // Add all changes
                await git.add('.');
                
                // Commit changes
                const timestamp = new Date().toISOString();
                await git.commit(`Deployment ${timestamp}`);
                
                // Push changes
                await git.push('origin', 'main');
                
                console.log('Git push completed successfully!');
            } catch (gitErr) {
                console.error('Error during git operations:', gitErr);
                process.exit(1);
            }
        }
    } catch (err) {
        console.error('Error during deployment:', err);
        process.exit(1);
    } finally {
        client.close();
    }
}

// Check if specific files were provided as arguments
const specificFiles = process.argv.slice(2);
if (specificFiles.length > 0 && specificFiles[0] === '--files') {
    const filesToUpload = specificFiles.slice(1);
    if (filesToUpload.length === 0) {
        console.error('No files specified after --files flag');
        process.exit(1);
    }
    console.log('Uploading specific files:', filesToUpload);
}

deploy();
