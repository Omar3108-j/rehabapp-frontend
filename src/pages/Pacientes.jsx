import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, PlusCircle, Trash2, Edit3, Eye, Search } from "lucide-react";
import api from "../services/api";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  

useEffect(() => {
  cargarPacientes();
}, []);

const cargarPacientes = () => {
  api.get("/pacientes")
    .then(res => setPacientes(res.data))
    .catch(err => console.error("Error al cargar pacientes:", err));
};

const eliminarPaciente = (id) => {
  if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
    api.delete(`/pacientes/${id}`)
      .then(() => {
        alert("🗑️ Paciente eliminado correctamente");
        cargarPacientes();
      })
      .catch(err => {
        console.error(err);
        alert("❌ Error al eliminar paciente");
      });
  }
};


  const pacientesFiltrados = pacientes.filter((p) =>
    `${p.nombre} ${p.dni} ${p.telefono}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Total de Pacientes</h3>
            <p className="text-3xl font-bold mt-2">{pacientes.length}</p>
          </div>
          <Users size={48} className="opacity-90" />
        </div>

        <button
          onClick={() => navigate("/agregar-paciente")}
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow flex items-center justify-between transition"
        >
          <div>
            <h3 className="text-lg font-semibold">Agregar Paciente</h3>
            <p className="text-sm opacity-80 mt-1">Registrar nuevo paciente</p>
          </div>
          <PlusCircle size={48} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-sky-700">👨‍⚕️ Lista de Pacientes</h2>
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {pacientesFiltrados.length === 0 ? (
        <p className="text-gray-500 text-center py-12 text-lg">
          No se encontraron pacientes que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gradient-to-r from-sky-600 to-indigo-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">DNI</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">Dirección</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map((p) => (
                <tr key={p.id} className="border-t hover:bg-sky-50 transition duration-150">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{p.nombre}</td>
                  <td className="px-4 py-2">{p.dni}</td>
                  <td className="px-4 py-2">{p.telefono}</td>
                  <td className="px-4 py-2">{p.direccion}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/paciente/${p.id}`)}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md shadow transition flex items-center gap-1"
                      >
                        <Eye size={16} /> Ver
                      </button>
                      <button
                        onClick={() => navigate(`/editar-paciente/${p.id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow transition flex items-center gap-1"
                      >
                        <Edit3 size={16} /> Editar
                      </button>
                      <button
                        onClick={() => eliminarPaciente(p.id)}
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












