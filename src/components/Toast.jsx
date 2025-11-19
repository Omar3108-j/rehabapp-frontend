import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, mensaje: "", tipo: "info" });

  const mostrarToast = useCallback((mensaje, tipo = "info") => {
    setToast({ visible: true, mensaje, tipo });
    setTimeout(() => setToast({ visible: false, mensaje: "", tipo: "info" }), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}

      {toast.visible && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm md:text-base transition-all duration-300 transform
            ${toast.tipo === "exito" ? "bg-green-600" : ""}
            ${toast.tipo === "error" ? "bg-red-600" : ""}
            ${toast.tipo === "info" ? "bg-blue-600" : ""}
          `}
        >
          {toast.mensaje}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
