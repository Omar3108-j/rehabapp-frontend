import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PacienteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pacientes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener paciente");
        return res.json();
      })
      .then((data) => setPaciente(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Cargando información del paciente...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="text-center mt-10 text-red-500">
        No se encontró el paciente con ID {id}.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">
        Detalle del Paciente
      </h2>

      <div className="space-y-4 text-gray-800">
        <p>
          <span className="font-semibold text-gray-600">ID:</span> {paciente.id}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Nombre:</span>{" "}
          {paciente.nombre}
        </p>
        <p>
          <span className="font-semibold text-gray-600">DNI:</span>{" "}
          {paciente.dni}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Dirección:</span>{" "}
          {paciente.direccion}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Teléfono:</span>{" "}
          {paciente.telefono}
        </p>
        {paciente.fechaNacimiento && (
          <p>
            <span className="font-semibold text-gray-600">
              Fecha de nacimiento:
            </span>{" "}
            {paciente.fechaNacimiento}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate(`/editar-paciente/${paciente.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => navigate("/pacientes")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          ⬅️ Volver
        </button>
      </div>
    </div>
  );
}

