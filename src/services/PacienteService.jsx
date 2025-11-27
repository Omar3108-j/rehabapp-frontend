import api from "./api";

class PacienteService {
  obtenerTodos() {
    return api.get("/pacientes");
  }

  crear(paciente) {
    return api.post("/pacientes", paciente);
  }

  eliminar(id) {
    return api.delete(`/pacientes/${id}`);
  }
}

export default new PacienteService();



