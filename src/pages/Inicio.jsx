import React from "react";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Bienvenido al Centro de Rehabilitación
      </h1>
      <p className="text-gray-700 max-w-2xl">
        Este sistema permite gestionar pacientes, tratamientos y terapeutas de
        manera sencilla y eficiente. Utiliza el menú superior para navegar.
      </p>
    </div>
  );
}

