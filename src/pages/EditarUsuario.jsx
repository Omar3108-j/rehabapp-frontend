import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Edit3 } from "lucide-react";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    roles: [],
    enabled: true,
  });

  useEffect(() => {
    // cargar usuario
    api.get(`/usuarios/${id}`).then((res) => setForm(res.data));

    // cargar roles
    api.get("/roles").then((res) => setRoles(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRol = (rol) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(rol)
        ? prev.roles.filter((r) => r !== rol)
        : [...prev.roles, rol],
    }));
  };

  const guardar = (e) => {
    e.preventDefault();

    api
      .put(`/usuarios/${id}`, form)
      .then(() => {
        alert("Usuario actualizado");
        navigate("/usuarios");
      })
      .catch(() => alert("❌ Error al actualizar usuario"));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2 mb-6">
        <Edit3 size={32} /> Editar Usuario
      </h1>

      <form onSubmit={guardar} className="grid grid-cols-1 gap-6">
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            className="input"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Usuario</label>
          <input
            name="username"
            className="input"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* ROLES */}
        <div>
          <label className="font-semibold">Roles</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {roles.map((rol) => (
              <label
                key={rol.id}
                className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={form.roles.includes(rol.nombre)}
                  onChange={() => toggleRol(rol.nombre)}
                />
                {rol.nombre}
              </label>
            ))}
          </div>
        </div>

        <button className="btn-primary mt-4">Guardar Cambios</button>
      </form>
    </div>
  );
}

