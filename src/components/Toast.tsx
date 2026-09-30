import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-lg border shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-start gap-3 transition-all transform animate-slide-in select-none ${
            toast.type === 'success'
              ? 'bg-zinc-900/95 border-emerald-500/60 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : toast.type === 'warning'
                ? 'bg-zinc-900/95 border-amber-500/60 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-zinc-900/95 border-cyan-500/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
          }`}
        >
          <div className="mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-mono font-bold tracking-wide text-zinc-100">
              {toast.title}
            </h4>
            <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
