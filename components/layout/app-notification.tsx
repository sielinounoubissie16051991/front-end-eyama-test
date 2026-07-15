"use client";

import { useEffect } from "react";

interface AppNotificationProps {
  message: string | null;
  type: "success" | "error";
  onClose: () => void;
}

export function AppNotification({ message, type, onClose }: AppNotificationProps) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <div className={`fixed right-4 top-20 z-50 max-w-sm rounded-2xl border px-4 py-3 shadow-lg ${styles}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-semibold opacity-80 transition hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}
