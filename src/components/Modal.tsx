import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, open, onClose }: { children: ReactNode; open: boolean; onClose: () => void; }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full p-6 z-10">
        {children}
      </div>
    </div>,
    document.body
  );
}
