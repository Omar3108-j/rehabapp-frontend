import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, PlusCircle, Trash2, Edit3, Eye, Search } from "lucide-react";

export default function Tratamientos() {
  const [tratamientos, setTratamientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarTratamientos();
  }, []);

  const cargarTratamientos = () => {
    fetch("http://localhost:8080/api/tratamientos")
      .then((res) => res.json())
      .then((data) => setTratamientos(data))
      .catch((err) => console.error("Error al cargar tratamientos:", err));
  };

  const eliminarTratamiento = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este tratamiento?")) {
      fetch(`http://localhost:8080/api/tratamientos/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar tratamiento");
          alert("🗑️ Tratamiento eliminado correctamente");
          cargarTratamientos();
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Error al eliminar tratamiento");
        });
    }
  };

  const tratamientosFiltrados = tratamientos.filter((t) =>
    `${t.nombre} ${t.descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Total de Tratamientos</h3>
            <p className="text-3xl font-bold mt-2">{tratamientos.length}</p>
          </div>
          <Activity size={48} className="opacity-90" />
        </div>

        <button
          onClick={() => navigate("/agregar-tratamiento")}
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow flex items-center justify-between transition"
        >
          <div>
            <h3 className="text-lg font-semibold">Agregar Tratamiento</h3>
            <p className="text-sm opacity-80 mt-1">Registrar nuevo tratamiento</p>
          </div>
          <PlusCircle size={48} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-sky-700">💊 Lista de Tratamientos</h2>
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Buscar tratamiento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {tratamientosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-center py-12 text-lg">
          No se encontraron tratamientos que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gradient-to-r from-sky-600 to-indigo-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Descripción</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tratamientosFiltrados.map((t) => (
                <tr key={t.id} className="border-t hover:bg-sky-50 transition duration-150">
                  <td className="px-4 py-2">{t.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{t.nombre}</td>
                  <td className="px-4 py-2">{t.descripcion}</td>
                  <td className="px-4 py-2">S/ {t.precio ?? "0.00"}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/tratamiento/${t.id}`)}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md shadow transition flex items-center gap-1"
                      >
                        <Eye size={16} /> Ver
                      </button>
                      <button
                        onClick={() => navigate(`/editar-tratamiento/${t.id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow transition flex items-center gap-1"
                      >
                        <Edit3 size={16} /> Editar
                      </button>
                      <button
                        onClick={() => eliminarTratamiento(t.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow transition flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}













