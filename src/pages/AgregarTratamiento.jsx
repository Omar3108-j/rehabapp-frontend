import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarTratamiento() {
  const navigate = useNavigate();

  const [tratamiento, setTratamiento] = useState({
    nombre: "",
    descripcion: "",
    duracion: "",
    precio: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTratamiento({ ...tratamiento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tratamiento.nombre || !tratamiento.precio) {
      setMensaje("⚠️ El nombre y el precio son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/tratamientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tratamiento,
          precio: parseFloat(tratamiento.precio),
        }),
      });

      if (res.ok) {
        setMensaje("✅ Tratamiento registrado correctamente.");
        setTimeout(() => navigate("/tratamientos"), 1500);
      } else {
        setMensaje("❌ Error al registrar tratamiento.");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      setMensaje("❌ No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ➕ Agregar Nuevo Tratamiento
      </h2>

      {mensaje && (
        <div
          className={`mb-4 text-center font-medium ${
            mensaje.includes("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={tratamiento.nombre}
            onChange={handleChange}
            className="w-full mt-1 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo: Terapia Física"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Descripción</label>
          <textarea
            name="descripcion"
            value={tratamiento.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Breve descripción del tratamiento..."
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Duración</label>
          <input
            type="text"
            name="duracion"
            value={tratamiento.duracion}
            onChange={handleChange}
            className="w-full mt-1 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo: 30 minutos"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Precio (S/.) *</label>
          <input
            type="number"
            name="precio"
            value={tratamiento.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full mt-1 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo: 120.00"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => navigate("/tratamientos")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}







