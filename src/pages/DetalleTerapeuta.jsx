import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TerapeutaService from "../services/TerapeutaService";
import { ArrowLeft, User } from "lucide-react";

export default function DetalleTerapeuta() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [terapeuta, setTerapeuta] = useState(null);

  useEffect(() => {
    cargarTerapeuta();
  }, []);

  const cargarTerapeuta = async () => {
    try {
      const res = await TerapeutaService.obtenerPorId(id);
      setTerapeuta(res.data);
    } catch (error) {
      alert("Error cargando información del terapeuta");
    }
  };

  if (!terapeuta) {
    return (
      <div className="p-6 text-center text-gray-600">Cargando información...</div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Botón regresar */}
      <button
        onClick={() => navigate("/terapeutas")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={20} /> Regresar
      </button>

      {/* Tarjeta */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-4">
            <User size={40} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {terapeuta.nombre} {terapeuta.apellido}
          </h1>

          <p className="text-lg text-gray-600 mb-6">{terapeuta.especialidad}</p>

          {/* Información */}
          <div className="w-full space-y-4 text-gray-700">

            <div className="border-b pb-2">
              <span className="font-semibold">DNI:</span> {terapeuta.dni}
            </div>

            <div className="border-b pb-2">
              <span className="font-semibold">Correo:</span> {terapeuta.correo}
            </div>

            <div className="border-b pb-2">
              <span className="font-semibold">Teléfono:</span> {terapeuta.telefono}
            </div>

            <div className="border-b pb-2">
              <span className="font-semibold">Turno:</span> {terapeuta.turno}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
