import React, { createContext, useContext, useState } from "react";

type ToastItem = { id: string; message: string; kind?: "info" | "success" | "error" };

const ToastApi = { push: (t: ToastItem) => {} };

const ToastContext = createContext({
  push: (m: string, kind?: ToastItem["kind"]) => {},
});

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function pushToast(message: string, kind: ToastItem["kind"] = "info") {
    const id = String(Date.now()) + Math.random().toString(36).slice(2);
    const t = { id, message, kind };
    setToasts((s) => [...s, t]);
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, 3200);
  }

  (ToastApi as any).push = pushToast;

  return (
    <ToastContext.Provider value={{ push: pushToast }}>
      <div aria-live="polite" className="fixed right-4 top-20 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-xs px-4 py-2 rounded shadow ${
              t.kind === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : t.kind === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function pushToast(message: string, kind?: ToastItem["kind"]) {
  (ToastApi as any).push(message, kind);
}

export function useToast() {
  return useContext(ToastContext);
}
