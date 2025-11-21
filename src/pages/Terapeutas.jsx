import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit3, Trash2, UserPlus } from "lucide-react";
import TerapeutaService from "../services/TerapeutaService";

export default function Terapeutas() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarTerapeutas();
  }, []);

  const cargarTerapeutas = async () => {
    const res = await TerapeutaService.obtenerTodos();
    setTerapeutas(res.data);
  };

  const filtrar = terapeutas.filter((t) =>
    `${t.nombre} ${t.apellido} ${t.especialidad}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const eliminarTerapeuta = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este terapeuta?")) {
      await TerapeutaService.eliminar(id);
      cargarTerapeutas();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Terapeutas</h1>

      {/* Cards superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Total de Terapeutas</h2>
          <p className="text-4xl font-bold mt-2">{terapeutas.length}</p>
        </div>

        <Link
          to="/terapeutas/agregar"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-xl shadow-md flex items-center justify-between"
        >
          <span className="text-xl font-semibold">Agregar Terapeuta</span>
          <UserPlus size={38} />
        </Link>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar terapeuta..."
        className="border p-3 w-full rounded-lg mb-4 shadow-sm"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Especialidad</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrar.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.id}</td>
                <td className="p-3">{t.nombre}</td>
                <td className="p-3">{t.apellido}</td>
                <td className="p-3">{t.especialidad}</td>
                <td className="p-3">{t.telefono}</td>

                <td className="p-3 flex gap-2">
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
                </td>
              </tr>
            ))}

            {filtrar.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
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
