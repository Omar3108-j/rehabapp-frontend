import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TerapeutaService from "../services/TerapeutaService";
import { ArrowLeft, Save } from "lucide-react";

export default function AgregarTerapeuta() {
  const navigate = useNavigate();

  const [terapeuta, setTerapeuta] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    especialidad: "",
    telefono: "",
    correo: "",
    turno: "",
  });

  const manejarChange = (e) => {
    setTerapeuta({ ...terapeuta, [e.target.name]: e.target.value });
  };

  const guardarTerapeuta = async (e) => {
    e.preventDefault();

    // Validaciones rápidas
    if (!terapeuta.nombre || !terapeuta.apellido) {
      alert("Nombre y apellido son obligatorios.");
      return;
    }

    await TerapeutaService.guardar(terapeuta);
    alert("Terapeuta registrado correctamente ✔");
    navigate("/terapeutas");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      {/* Botón regresar */}
      <button
        onClick={() => navigate("/terapeutas")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={20} /> Regresar
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Agregar Terapeuta
      </h1>

      <form onSubmit={guardarTerapeuta} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Nombre */}
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={terapeuta.nombre}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block font-semibold mb-1">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={terapeuta.apellido}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        {/* DNI */}
        <div>
          <label className="block font-semibold mb-1">DNI</label>
          <input
            type="text"
            name="dni"
            value={terapeuta.dni}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block font-semibold mb-1">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={terapeuta.telefono}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block font-semibold mb-1">Correo</label>
          <input
            type="email"
            name="correo"
            value={terapeuta.correo}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          />
        </div>

        {/* Especialidad */}
        <div>
          <label className="block font-semibold mb-1">Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={terapeuta.especialidad}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          />
        </div>

        {/* Turno */}
        <div>
          <label className="block font-semibold mb-1">Turno</label>
          <select
            name="turno"
            value={terapeuta.turno}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          >
            <option value="">Seleccione</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>

      </form>

      {/* Botón Guardar */}
      <div className="mt-6 text-right">
        <button
          onClick={guardarTerapeuta}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 ml-auto"
        >
          <Save size={20} /> Guardar Terapeuta
        </button>
      </div>
    </div>
  );
}
