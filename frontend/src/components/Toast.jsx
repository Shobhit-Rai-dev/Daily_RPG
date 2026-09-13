import React from "react";
import { CheckCircle2, Sparkles, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  function renderIcon() {
    switch (toast.type) {
      case "reward":
        return <Sparkles className="toast-icon reward" size={20} />;
      case "error":
        return <AlertCircle className="toast-icon error" size={20} />;
      case "info":
        return <Info className="toast-icon info" size={20} />;
      default:
        return <CheckCircle2 className="toast-icon success" size={20} />;
    }
  }

  return (
    <div className={`toast-container ${toast.type || "success"}`}>
      <div className="toast-content">
        {renderIcon()}
        <span>{toast.message}</span>
      </div>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Dismiss notification">
          <X size={15} />
        </button>
      )}
    </div>
  );
}
