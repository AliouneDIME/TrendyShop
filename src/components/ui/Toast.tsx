import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const cfg = {
  success:{ icon:CheckCircle, bg:'#ECFDF5', border:'#A7F3D0', color:'#059669' },
  error:  { icon:XCircle,     bg:'#FEF2F2', border:'#FECACA', color:'#DC2626' },
  info:   { icon:Info,        bg:'#EFF6FF', border:'#BFDBFE', color:'#2563EB' },
  warning:{ icon:AlertTriangle,bg:'#FFFBEB',border:'#FDE68A', color:'#D97706' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(t => {
        const { icon:Icon, bg, border, color } = cfg[t.type];
        return (
          <div key={t.id} className="toast-enter flex items-start gap-3 p-4 rounded-xl pointer-events-auto"
            style={{ background:bg, border:`1px solid ${border}`, boxShadow:'var(--shadow-lg)' }}>
            <Icon size={16} style={{ color, flexShrink:0, marginTop:1 }}/>
            <p className="text-sm flex-1 font-medium" style={{ color:'var(--text-800)' }}>{t.message}</p>
            <button onClick={()=>removeToast(t.id)} className="flex-shrink-0 transition-colors" style={{ color:'var(--text-300)' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--text-700)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-300)'}>
              <X size={13}/>
            </button>
          </div>
        );
      })}
    </div>
  );
}
