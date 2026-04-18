import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

export const Toast = () => {
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: "", visible: false });

  useEffect(() => {
    const handleToast = (e: any) => {
      setToast({ message: e.detail, visible: true });
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: toast.visible ? 1 : 0, y: toast.visible ? 0 : 50 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-full text-xs tracking-widest uppercase backdrop-blur-md pointer-events-none"
    >
      <AlertCircle size={14} />
      {toast.message}
    </motion.div>
  );
};
