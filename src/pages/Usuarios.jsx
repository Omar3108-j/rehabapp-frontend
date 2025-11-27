import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Eye, Edit3, KeyRound, ToggleLeft, ToggleRight, Search } from "lucide-react";
import api from "../services/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // 🔵 Cargar lista de usuarios
  const cargarUsuarios = () => {
    api
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  };

  // 🔵 Cambiar estado (activar/desactivar)
  const cambiarEstado = (id) => {
    if (window.confirm("¿Deseas cambiar el estado del usuario?")) {
      api
        .patch(`/usuarios/${id}/estado`)
        .then(() => {
          alert("Estado actualizado correctamente");
          cargarUsuarios();
        })
        .catch(() => alert("❌ Error al cambiar estado"));
    }
  };

  // 🔵 Filtro dinámico
  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.username} ${u.email} ${u.roles?.join(" ")}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">👤 Gestión de Usuarios</h1>

      {/* TARJETAS SUPERIORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Total de Usuarios</h2>
          <p className="text-4xl font-bold mt-2">{usuarios.length}</p>
        </div>

        <Link
          to="/usuarios/agregar"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-xl shadow-md flex items-center justify-between transition"
        >
          <span className="text-xl font-semibold">Agregar Usuario</span>
          <UserPlus size={40} />
        </Link>
      </div>

      {/* BUSCADOR */}
      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gradient-to-r from-sky-700 to-sky-500 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Email</th>
              <th className="p-3">Roles</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.nombre}</td>
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.roles?.join(", ")}</td>

                <td className="p-3">
                  {u.enabled ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <ToggleRight size={20} /> Activo
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      <ToggleLeft size={20} /> Inactivo
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    {/* Ver Detalle */}
                    <Link
                      to={`/usuarios/editar/${u.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Edit3 size={18} /> Editar
                    </Link>

                    {/* Cambiar contraseña */}
                    <Link
                      to={`/usuarios/password/${u.id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <KeyRound size={18} /> Password
                    </Link>

                    {/* Activar / Desactivar */}
                    <button
                      onClick={() => cambiarEstado(u.id)}
                      className={`px-3 py-2 rounded-lg flex items-center gap-1 text-white ${
                        u.enabled
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {u.enabled ? (
                        <>
                          <ToggleLeft size={18} /> Desactivar
                        </>
                      ) : (
                        <>
                          <ToggleRight size={18} /> Activar
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

