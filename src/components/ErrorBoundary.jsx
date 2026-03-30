import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)]">
          <div className="max-w-md w-full bg-surface/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <AlertTriangle size={32} />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We've encountered an unexpected application error. Don't worry, our team has been notified.
            </p>
            
            <div className="bg-background/50 rounded-xl p-4 text-left border border-white/5 mb-8 overflow-hidden">
              <p className="text-red-400 text-sm font-mono truncate">
                {this.state.error?.toString() || "Unknown Error"}
              </p>
            </div>
            
            <Button onClick={this.handleReload} className="w-full justify-center gap-2">
              <RefreshCcw size={18} /> Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
