import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit3, Trash2, UserPlus, Search } from "lucide-react";
import api from "../services/api";

export default function Terapeutas() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarTerapeutas();
  }, []);

  // 🔵 Cargar todos los terapeutas
  const cargarTerapeutas = () => {
    api.get("/terapeutas")
      .then((res) => setTerapeutas(res.data))
      .catch((err) => console.error("Error al cargar terapeutas:", err));
  };

  // 🔵 Eliminar terapeuta
  const eliminarTerapeuta = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este terapeuta?")) {
      api
        .delete(`/terapeutas/${id}`)
        .then(() => {
          alert("🗑 Terapeuta eliminado correctamente");
          cargarTerapeutas();
        })
        .catch(() => alert("❌ Error al eliminar terapeuta"));
    }
  };

  // 🔵 Filtro de búsqueda
  const terapeutasFiltrados = terapeutas.filter((t) =>
    `${t.nombre} ${t.apellido} ${t.especialidad} ${t.telefono}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-sky-700">
        👩‍⚕️ Lista de Terapeutas
      </h1>

      {/* Tarjetas superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Total de Terapeutas</h2>
          <p className="text-4xl font-bold mt-2">{terapeutas.length}</p>
        </div>

        <Link
          to="/terapeutas/agregar"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-xl shadow-md flex items-center justify-between transition"
        >
          <span className="text-xl font-semibold">Agregar Terapeuta</span>
          <UserPlus size={40} />
        </Link>
      </div>

      {/* Buscador */}
      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Buscar terapeuta..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Especialidad</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {terapeutasFiltrados.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{t.id}</td>
                <td className="p-3">{t.nombre}</td>
                <td className="p-3">{t.apellido}</td>
                <td className="p-3">{t.especialidad}</td>
                <td className="p-3">{t.telefono}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/terapeutas/detalle/${t.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Eye size={18} /> Ver
                    </Link>

                    <Link
                      to={`/terapeutas/editar/${t.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Edit3 size={18} /> Editar
                    </Link>

                    <button
                      onClick={() => eliminarTerapeuta(t.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Trash2 size={18} /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {terapeutasFiltrados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No se encontraron terapeutas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

