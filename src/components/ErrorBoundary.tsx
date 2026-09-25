'use client';

import { Component, ReactNode } from 'react';
import { IconWarning } from './icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full p-6 bg-ink-800/60 border border-red-500/40 rounded-2xl text-center">
            <IconWarning className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-xl font-extrabold text-white mb-2">Coś poszło nie tak</h1>
            <p className="text-slate-400 text-sm mb-4">
              {this.state.error?.message || 'Wystąpił nieoczekiwany błąd'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
