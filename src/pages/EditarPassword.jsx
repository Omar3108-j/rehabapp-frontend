import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { KeyRound } from "lucide-react";

export default function EditarPassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const actualizarPassword = (e) => {
    e.preventDefault();

    api
      .put(`/usuarios/${id}/password`, { password })
      .then(() => {
        alert("Contraseña actualizada correctamente");
        navigate("/usuarios");
      })
      .catch(() => alert("❌ Error al actualizar contraseña"));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
      <h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-2 mb-6">
        <KeyRound size={32} /> Cambiar Contraseña
      </h1>

      <form onSubmit={actualizarPassword} className="grid grid-cols-1 gap-6">
        <div>
          <label>Nueva contraseña</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn-primary mt-4">Actualizar Contraseña</button>
      </form>
    </div>
  );
}
