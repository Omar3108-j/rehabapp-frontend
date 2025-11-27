import api from "./api";

class SesionService {
  obtenerTodas() {
    return api.get("/sesiones");
  }

  obtenerPorId(id) {
    return api.get(`/sesiones/${id}`);
  }

  obtenerPorPaciente(idPaciente) {
    return api.get(`/sesiones/paciente/${idPaciente}`);
  }

  crearSesion(sesion) {
    return api.post("/sesiones", sesion);
  }

  actualizarSesion(id, sesion) {
    return api.put(`/sesiones/${id}`, sesion);
  }

  eliminarSesion(id) {
    return api.delete(`/sesiones/${id}`);
  }
}

export default new SesionService();

