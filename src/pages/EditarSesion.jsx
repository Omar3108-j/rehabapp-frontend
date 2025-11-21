import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SesionService from "../services/SesionService";
import TerapeutaService from "../services/TerapeutaService";
import TratamientoService from "../services/TratamientoService";

export default function EditarSesion() {
  const { idPaciente, idSesion } = useParams(); // ← capturamos ambos IDs
  const navigate = useNavigate();

  const [terapeutas, setTerapeutas] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [sesion, setSesion] = useState({
    paciente_id: idPaciente,
    terapeuta_id: "",
    tratamiento_id: "",
    fecha: "",
    hora: "",
    notas: "",
    estado: "Realizada",
  });

  // 🔹 Cargar datos iniciales
  useEffect(() => {
    Promise.all([
      TerapeutaService.obtenerTodos(),
      TratamientoService.obtenerTodos(),
      SesionService.obtenerPorId(idSesion)
    ])
      .then(([resTerapeutas, resTratamientos, resSesion]) => {
        setTerapeutas(resTerapeutas.data);
        setTratamientos(resTratamientos.data);

        // Convertimos fecha y hora al formato correcto
        const ses = resSesion.data;
        ses.fecha = ses.fecha;
        ses.hora = ses.hora ? ses.hora.slice(0, 5) : "";

        setSesion(ses);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
        alert("No se pudieron cargar los datos de la sesión");
        setCargando(false);
      });
  }, [idSesion]);

  const manejarChange = (e) => {
    setSesion({
      ...sesion,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarSesion = async (e) => {
    e.preventDefault();

    try {
      await SesionService.actualizarSesion(idSesion, sesion);
      alert("Sesión actualizada correctamente ✔");
      navigate(`/paciente/${idPaciente}`);
    } catch (err) {
      alert("Error actualizando sesión");
      console.error(err);
    }
  };

  if (cargando) {
    return <p className="text-center text-gray-500 py-10">Cargando datos...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Editar Sesión</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={actualizarSesion}>

        {/* Fecha */}
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

        {/* Hora */}
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

        {/* Terapeuta */}
        <div>
          <label className="font-semibold">Terapeuta</label>
          <select
            name="terapeuta_id"
            value={sesion.terapeuta_id}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            required
          >
            <option value="">Seleccione</option>
            {terapeutas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Tratamiento */}
        <div>
          <label className="font-semibold">Tratamiento</label>
          <select
            name="tratamiento_id"
            value={sesion.tratamiento_id}
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

        {/* Estado */}
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

        {/* Notas */}
        <div className="md:col-span-2">
          <label className="font-semibold">Notas</label>
          <textarea
            name="notas"
            rows="4"
            value={sesion.notas}
            onChange={manejarChange}
            className="w-full border p-3 rounded-lg shadow-sm"
            placeholder="Notas del terapeuta"
          ></textarea>
        </div>

      </form>

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate(`/paciente/${idPaciente}`)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          ⬅ Volver
        </button>

        <button
          onClick={actualizarSesion}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
        >
          ✔ Guardar Cambios
        </button>
      </div>
    </div>
  );
}
