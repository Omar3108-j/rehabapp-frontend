import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditarPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({
    nombre: "",
    dni: "",
    direccion: "",
    telefono: "",
    edad: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/pacientes/${id}`)
      .then((res) => res.json())
      .then((data) => setPaciente(data))
      .catch(() => toast.error("❌ Error al cargar datos del paciente"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paciente.nombre || !paciente.dni) {
      toast.error("⚠️ Los campos Nombre y DNI son obligatorios");
      return;
    }

    fetch(`http://localhost:8080/api/pacientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        toast.success("✅ Paciente actualizado correctamente");
        navigate("/pacientes", { state: { actualizado: true } });
      })
      .catch(() => toast.error("❌ Error al actualizar paciente"));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Editar Paciente
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["nombre", "dni", "direccion", "telefono", "edad"].map((field) => (
          <div key={field}>
            <label
              className="block font-medium text-gray-600 capitalize"
              htmlFor={field}
            >
              {field}
            </label>
            <input
              id={field}
              name={field}
              type={field === "edad" ? "number" : "text"}
              value={paciente[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder={`Ingrese ${field}`}
            />
          </div>
        ))}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/pacientes")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}




