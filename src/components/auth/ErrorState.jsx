import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ title = "Authentication Error", message, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 p-4 rounded-2xl space-y-3 text-xs text-red-800 dark:text-red-300">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-extrabold uppercase tracking-wider text-red-900 dark:text-red-200">
            {title}
          </h4>
          <p className="font-medium leading-relaxed">
            {message || "An unexpected error occurred during verification. Please check your credentials and try again."}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-red-700 dark:text-red-300 font-extrabold flex items-center gap-1 hover:underline pt-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
