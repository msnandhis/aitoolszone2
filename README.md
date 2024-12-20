# AI Tools Zone Admin Panel

A responsive admin panel for managing AI tools directory, built with React, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Modern UI with Tailwind CSS
- 📊 Dashboard with analytics overview
- 🛠️ Tools management with search and filtering
- 📝 Category management
- 📨 Message handling system
- 👥 User management
- 📬 Submissions review system
- 📥 Inbox for communications

## Getting Started

### Prerequisites

- Node.js >= 18.18.2
- npm >= 9.8.1

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aitoolszone2.git
cd aitoolszone2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and configure your FTP deployment settings:
```
FTP_HOST=your-ftp-host.com
FTP_USER=your-username
FTP_PASS=your-password
```

### Development

Start the development server:
```bash
npm run dev
```

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment

### Manual Deployment

Deploy to your FTP server:
```bash
npm run deploy
```

This will:
1. Validate environment variables
2. Build the project
3. Upload files to your FTP server

### Watch Mode Deployment

For automatic deployment on file changes:
```bash
npm run watch-deploy
```

This will:
1. Watch for file changes in src/ and public/
2. Automatically build and deploy when changes are detected
3. Handle multiple rapid changes efficiently
4. Provide colored console output for better visibility

### Retry Failed Uploads

If some files fail to upload:
```bash
npm run deploy:retry
```

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/
│   └── admin/        # Admin panel pages
├── contexts/         # React contexts
├── services/         # API services
├── shared/          # Shared components/utilities
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
