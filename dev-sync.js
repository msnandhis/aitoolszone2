import { spawn } from 'child_process';
import concurrently from 'concurrently';

// First build the project
const build = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true
});

build.on('close', (code) => {
    if (code !== 0) {
        console.error('Build failed');
        process.exit(1);
    }

    // After successful build, run dev server and sync concurrently
    const { result } = concurrently([
        { 
            command: 'npm run dev',
            name: 'dev',
            prefixColor: 'blue'
        },
        { 
            command: 'node sync.js',
            name: 'sync',
            prefixColor: 'yellow'
        }
    ], {
        prefix: 'name',
        killOthers: ['failure', 'success'],
        restartTries: 3
    });

    result.catch((err) => {
        console.error('Error occurred:', err);
        process.exit(1);
    });
});
