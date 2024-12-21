import simpleGit from 'simple-git';
import 'dotenv/config';

const git = simpleGit();

async function gitDeploy() {
    try {
        console.log('Starting git deployment...');
        
        // Add all changes
        await git.add('.');
        
        // Commit changes
        const timestamp = new Date().toISOString();
        await git.commit(`Deployment ${timestamp}`);
        
        // Push changes
        await git.push('origin', 'main');
        
        console.log('Git deployment completed successfully!');
    } catch (err) {
        console.error('Error during git deployment:', err);
        process.exit(1);
    }
}

gitDeploy();
