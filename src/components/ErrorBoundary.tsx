import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-100">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-400">
                We're sorry, but something unexpected happened. Please try again.
              </p>
              {this.state.error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-red-400">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
