import axios from "axios";

const API_URL = "http://localhost:8080/api/sesiones";

class SesionService {
  
  obtenerTodas() {
    return axios.get(API_URL);
  }

  obtenerPorId(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  obtenerPorPaciente(pacienteId) {
    return axios.get(`${API_URL}/paciente/${pacienteId}`);
  }

  crearSesion(sesion) {
    return axios.post(API_URL, sesion);
  }

  actualizarSesion(id, sesion) {
    return axios.put(`${API_URL}/${id}`, sesion);
  }

  eliminarSesion(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new SesionService();
