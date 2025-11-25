import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SesionService from "../services/SesionService"; // ⬅️ IMPORTANTE

export default function DetallePaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sesiones, setSesiones] = useState([]); // ⬅️ Sesiones del paciente
  const [loadingSesiones, setLoadingSesiones] = useState(true);

  // 🔹 Cargar datos del paciente
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

  // 🔹 Cargar sesiones del paciente
  useEffect(() => {
    SesionService.obtenerPorPaciente(id)
      .then((res) => {
        setSesiones(res.data);
        setLoadingSesiones(false);
      })
      .catch((err) => {
        console.error("Error sesiones:", err);
        setLoadingSesiones(false);
      });
  }, [id]);

  const eliminarSesion = async (sesionId) => {
    if (confirm("¿Eliminar esta sesión?")) {
      await SesionService.eliminarSesion(sesionId);
      SesionService.obtenerPorPaciente(id).then((res) =>
        setSesiones(res.data)
      );
    }
  };

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

      {/* 🔹 Datos del paciente */}
      <div className="space-y-3">
        <p><span className="font-semibold">🧾 ID:</span> {paciente.id}</p>
        <p><span className="font-semibold">👤 Nombre:</span> {paciente.nombre}</p>
        <p><span className="font-semibold">🪪 DNI:</span> {paciente.dni}</p>
        <p><span className="font-semibold">🏠 Dirección:</span> {paciente.direccion}</p>
        <p><span className="font-semibold">📞 Teléfono:</span> {paciente.telefono}</p>
      </div>

      {/* 🔹 Botones superiores */}
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

      {/* 🔹 SESIONES DEL PACIENTE */}
      <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3">
        🗓️ Sesiones del Paciente
      </h3>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-600">
          Total sesiones: <strong>{sesiones.length}</strong>
        </p>
        <Link
          to={`/paciente/${id}/agregar-sesion`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Registrar Sesión
        </Link>
      </div>

      {/* Tabla de sesiones */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full border rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Terapeuta</th>
              <th className="p-3">Tratamiento</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loadingSesiones ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Cargando sesiones...
                </td>
              </tr>
            ) : sesiones.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No hay sesiones registradas.
                </td>
              </tr>
            ) : (
              sesiones.map((sesion) => (
                <tr key={sesion.id} className="border-b">
                  <td className="p-3">{sesion.fecha}</td>
                  <td className="p-3">{sesion.hora}</td>
                  <td className="p-3">{sesion.terapeutaNombre ?? "—"}</td>
                  <td className="p-3">{sesion.tratamientoNombre ?? "—"}</td>
                  <td className="p-3">{sesion.estado}</td>

                  <td className="p-3 flex gap-2">
                    <Link
                      to={`/paciente/${id}/editar-sesion/${sesion.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => eliminarSesion(sesion.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



