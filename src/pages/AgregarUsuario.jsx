import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { UserPlus } from "lucide-react";

export default function AgregarUsuario() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    roles: []
  });

  useEffect(() => {
    api
      .get("/roles")
      .then((res) => setRoles(res.data))
      .catch(() => console.error("Error cargando roles"));
  }, []);

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
      .post("/usuarios", form)
      .then(() => {
        alert("Usuario creado correctamente");
        navigate("/usuarios");
      })
      .catch(() => alert("❌ Error al crear usuario"));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-sky-700 flex items-center gap-2 mb-6">
        <UserPlus size={32} /> Agregar Usuario
      </h1>

      <form onSubmit={guardar} className="grid grid-cols-1 gap-6">
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            className="input"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Usuario</label>
          <input
            name="username"
            className="input"
            value={form.username}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            className="input"
            value={form.password}
            onChange={handleChange}
            required
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

        <button className="btn-primary mt-4">Guardar Usuario</button>
      </form>
    </div>
  );
}

