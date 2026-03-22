import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: 'text-emerald-400' },
  error: { border: 'border-rose-500/30', bg: 'bg-rose-500/10', text: 'text-rose-400', icon: 'text-rose-400' },
  info: { border: 'border-electric/30', bg: 'bg-electric/10', text: 'text-blue-300', icon: 'text-blue-400' },
  warning: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', icon: 'text-amber-400' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const Icon = icons[toast.type];
        const c = colors[toast.type];
        return (
          <div
            key={toast.id}
            className={`toast-enter glass border ${c.border} ${c.bg} rounded-xl p-4 flex items-start gap-3 pointer-events-auto shadow-lg`}
          >
            <Icon className={`${c.icon} flex-shrink-0 mt-0.5`} size={18} />
            <p className={`${c.text} text-sm font-body flex-1 leading-snug`}>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-ash hover:text-ivory transition-colors ml-1 flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
