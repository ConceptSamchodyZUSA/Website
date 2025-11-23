import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle size={48} className="text-red-500" />
              <div>
                <h1 className="text-3xl font-bold">Ups! Coś poszło nie tak</h1>
                <p className="text-gray-400 mt-1">Wystąpił nieoczekiwany błąd</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-6 font-mono text-sm overflow-auto max-h-40">
              <p className="text-red-400">{this.state.error?.toString()}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                <RefreshCw size={20} />
                Odśwież stronę
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Home size={20} />
                Wróć do strony głównej
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Jeśli problem się powtarza, skontaktuj się z nami: <a href="mailto:conceptusacars@gmail.com" className="text-red-500 hover:underline">conceptusacars@gmail.com</a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
