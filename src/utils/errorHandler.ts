// Global error handler
const globalErrorHandler = (error: Error) => {
  console.error('Unhandled error:', error);

  // Check if we're in production
  if (process.env.NODE_ENV === 'production') {
    // In production, show a user-friendly error message
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div class="max-w-md w-full space-y-6 text-center">
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-100">
                Oops! Something went wrong
              </h2>
              <p class="text-gray-400">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              <button 
                onclick="window.location.reload()"
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg transition-colors duration-200"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
};

// Set up global error handlers
export const setupErrorHandlers = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    if (error) {
      globalErrorHandler(error);
    }
    return false;
  };

  window.onunhandledrejection = (event) => {
    globalErrorHandler(event.reason);
  };
};
