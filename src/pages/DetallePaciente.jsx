import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function DetallePaciente() {
  const { id } = useParams(); // ← obtiene el ID desde la URL
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pacientes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener paciente");
        return res.json();
      })
      .then((data) => {
        setPaciente(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">Cargando datos...</p>
    );
  }

  if (!paciente) {
    return (
      <p className="text-center text-red-500 py-10">
        No se encontró el paciente.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Detalle del Paciente
      </h2>

      <div className="space-y-3">
        <p><span className="font-semibold">🧾 ID:</span> {paciente.id}</p>
        <p><span className="font-semibold">👤 Nombre:</span> {paciente.nombre}</p>
        <p><span className="font-semibold">🪪 DNI:</span> {paciente.dni}</p>
        <p><span className="font-semibold">🏠 Dirección:</span> {paciente.direccion}</p>
        <p><span className="font-semibold">📞 Teléfono:</span> {paciente.telefono}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/editar-paciente/${paciente.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          ✏️ Editar
        </button>

        <Link
          to="/pacientes"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          ⬅️ Volver
        </Link>
      </div>
    </div>
  );
}


