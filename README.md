# Deployment System

## Manual Deployment

- `npm run deploy:ftp` - Builds and deploys to Bluehost via FTP
- `npm run deploy:git` - Commits and pushes to GitHub
- `npm run deploy` - Runs both FTP and Git deployment

## Live FTP Sync

- `npm run sync` - Builds and starts FTP sync (watches dist folder for changes)
- `npm run dev:sync` - Runs development server and FTP sync simultaneously

## Features

- Automatic file watching and instant FTP uploads
- Handles file additions, modifications, and deletions
- Maintains FTP connection pool for better performance
- Creates remote directories automatically
- Supports both one-time deployment and continuous sync

## Development Workflow

1. To use during development:
   - Run `npm run dev:sync` to start both development server and FTP sync
   - Make changes to your code
   - Changes will be automatically built and synced to the FTP server

2. For production deployment:
   - Run `npm run deploy` to:
     - Build the project
     - Deploy to Bluehost via FTP
     - Commit and push to GitHub

## Configuration

The system requires the following environment variables in your `.env` file:

```
FTP_HOST=your-ftp-host
FTP_USER=your-ftp-username
FTP_PASS=your-ftp-password
```
