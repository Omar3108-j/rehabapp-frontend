import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetalleTratamiento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tratamiento, setTratamiento] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarTratamiento = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tratamientos/${id}`);
        if (!res.ok) throw new Error("Error al cargar tratamiento");
        const data = await res.json();
        setTratamiento(data);
      } catch (err) {
        console.error(err);
        setError("❌ No se pudo cargar el tratamiento.");
      }
    };
    cargarTratamiento();
  }, [id]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!tratamiento) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-gray-600">
        Cargando información del tratamiento...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        💊 Detalle del Tratamiento
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>ID:</strong> {tratamiento.id}
        </p>
        <p>
          <strong>Nombre:</strong> {tratamiento.nombre}
        </p>
        <p>
          <strong>Descripción:</strong> {tratamiento.descripcion || "—"}
        </p>
        <p>
          <strong>Duración:</strong> {tratamiento.duracion || "—"}
        </p>
        <p>
          <strong>Precio:</strong>{" "}
          {tratamiento.precio
            ? `S/ ${Number(tratamiento.precio).toFixed(2)}`
            : "—"}
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate(`/editar-tratamiento/${tratamiento.id}`)}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => navigate("/tratamientos")}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          🔙 Volver
        </button>
      </div>
    </div>
  );
}






