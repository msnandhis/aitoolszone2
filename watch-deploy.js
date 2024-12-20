import * as chokidar from 'chokidar';
import { exec } from 'child_process';
import 'dotenv/config';
import * as fs from 'fs';

// Validate environment setup
if (!fs.existsSync('.env')) {
    console.error('\x1b[31mError: .env file is missing. Copy .env.example to .env and configure it.\x1b[0m');
    process.exit(1);
}

const requiredEnvVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error('\x1b[31mError: Missing required environment variables:', missingEnvVars.join(', '), '\x1b[0m');
    process.exit(1);
}

// Deployment state tracking
let isDeploying = false;
let pendingChanges = false;

// Watch the src directory for changes
const watcher = chokidar.watch(['src', 'public'], {
    ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        /node_modules/,
        /dist/,
        /.git/
    ],
    persistent: true,
    ignoreInitial: true
});

console.log('\x1b[36mWatching for file changes...\x1b[0m');

// Debounce function to prevent multiple rapid deployments
let timeout;
const debounce = (func, wait) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
};

function deploy() {
    if (isDeploying) {
        pendingChanges = true;
        return;
    }

    isDeploying = true;
    console.log('\x1b[33mStarting deployment...\x1b[0m');

    exec('npm run deploy', (error, stdout, stderr) => {
        isDeploying = false;

        if (error) {
            console.error('\x1b[31mDeployment failed:', error.message, '\x1b[0m');
            console.error('\x1b[31mStack trace:', error.stack, '\x1b[0m');
            if (stderr) console.error('\x1b[31mStderr:', stderr, '\x1b[0m');
            return;
        }

        if (stdout) console.log('\x1b[32mDeployment output:', stdout, '\x1b[0m');
        if (stderr) console.warn('\x1b[33mWarnings:', stderr, '\x1b[0m');
        
        console.log('\x1b[32mDeployment completed successfully!\x1b[0m');

        // Handle any pending changes that occurred during deployment
        if (pendingChanges) {
            console.log('\x1b[33mProcessing pending changes...\x1b[0m');
            pendingChanges = false;
            debounce(deploy, 1000);
        }
    });
}

// Handle file changes
watcher
    .on('change', path => {
        console.log(`\x1b[36mFile changed: ${path}\x1b[0m`);
        debounce(deploy, 2000); // Wait 2 seconds before deploying to batch multiple changes
    })
    .on('add', path => {
        console.log(`\x1b[36mFile added: ${path}\x1b[0m`);
        debounce(deploy, 2000);
    })
    .on('unlink', path => {
        console.log(`\x1b[36mFile deleted: ${path}\x1b[0m`);
        debounce(deploy, 2000);
    })
    .on('error', error => {
        console.error('\x1b[31mWatcher error:', error, '\x1b[0m');
    });

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\x1b[36mStopping file watcher...\x1b[0m');
    watcher.close().then(() => {
        console.log('\x1b[32mFile watcher stopped.\x1b[0m');
        process.exit(0);
    });
});

// Log startup message
console.log('\x1b[32mWatch-deploy service started successfully!\x1b[0m');
console.log('\x1b[36mPress Ctrl+C to stop watching.\x1b[0m');
