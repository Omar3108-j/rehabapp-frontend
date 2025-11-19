import { useEffect, useState } from "react";
import { getPacientes, deletePaciente } from "../services/PacienteService";

function PacientesList() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const response = await getPacientes();
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este paciente?")) {
      await deletePaciente(id);
      cargarPacientes();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Pacientes</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.dni}</td>
                <td>{p.direccion}</td>
                <td>{p.telefono}</td>
                <td>
                  <button onClick={() => eliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay pacientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesList;
