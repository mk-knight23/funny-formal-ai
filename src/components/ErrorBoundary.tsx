"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-6 max-w-lg">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Oops! Something went wrong 🤖💥
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Even our AI couldn&apos;t predict this error! Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
