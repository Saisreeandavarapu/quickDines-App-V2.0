import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = "Processing verification..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3 text-center">
      <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        {message}
      </span>
    </div>
  );
};
