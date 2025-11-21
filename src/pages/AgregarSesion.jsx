import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SesionService from "../services/SesionService";
import TerapeutaService from "../services/TerapeutaService";
import TratamientoService from "../services/TratamientoService";

export default function AgregarSesion() {
  const { id: pacienteId } = useParams();
  const navigate = useNavigate();

  const [terapeutas, setTerapeutas] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);

  const [sesion, setSesion] = useState({
    fecha: "",
    hora: "",
    estado: "Realizada",
    notas: "",
    paciente: { id: pacienteId },
    terapeuta: { id: "" },
    tratamiento: { id: "" },
  });

  useEffect(() => {
    TerapeutaService.obtenerTodos().then((res) => setTerapeutas(res.data));
    TratamientoService.obtenerTodos().then((res) => setTratamientos(res.data));
  }, []);

  const manejarChange = (e) => {
    const { name, value } = e.target;

    if (name === "terapeuta") {
      setSesion({ ...sesion, terapeuta: { id: Number(value) } });
    } else if (name === "tratamiento") {
      setSesion({ ...sesion, tratamiento: { id: Number(value) } });
    } else {
      setSesion({ ...sesion, [name]: value });
    }
  };

  const guardarSesion = async (e) => {
    e.preventDefault();

    const payload = {
      paciente: { id: Number(pacienteId) },
      terapeuta: { id: sesion.terapeuta.id },
      tratamiento: { id: sesion.tratamiento.id },
      fecha: sesion.fecha,
      hora: sesion.hora,
      notas: sesion.notas,
      estado: sesion.estado,
    };

    console.log("Payload ENVIADO:", payload);

    try {
      await SesionService.crearSesion(payload);
      alert("Sesión registrada correctamente ✔");
      navigate(`/paciente/${pacienteId}`);
    } catch (error) {
      console.error("Error al guardar sesión:", error);
      alert("Ocurrió un error al guardar la sesión.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Registrar Nueva Sesión</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={guardarSesion}>
        
        <div>
          <label className="font-semibold">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={sesion.fecha}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Hora</label>
          <input
            type="time"
            name="hora"
            value={sesion.hora}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Terapeuta</label>
          <select
            name="terapeuta"
            value={sesion.terapeuta.id}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          >
            <option value="">Seleccione</option>
            {terapeutas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Tratamiento</label>
          <select
            name="tratamiento"
            value={sesion.tratamiento.id}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          >
            <option value="">Seleccione</option>
            {tratamientos.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tr.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Estado</label>
          <select
            name="estado"
            value={sesion.estado}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          >
            <option value="Realizada">Realizada</option>
            <option value="Reprogramada">Reprogramada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Notas</label>
          <textarea
            name="notas"
            rows="4"
            value={sesion.notas}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
          ></textarea>
        </div>

        <div className="flex justify-between mt-6 md:col-span-2">
          <button
            type="button"
            onClick={() => navigate(`/paciente/${pacienteId}`)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            ⬅ Volver
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            ✔ Guardar Sesión
          </button>
        </div>

      </form>
    </div>
  );
}




