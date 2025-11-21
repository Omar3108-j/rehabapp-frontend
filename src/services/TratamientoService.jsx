import axios from "axios";

const API_URL = "http://localhost:8080/api/tratamientos";

class TratamientoService {
  obtenerTodos() {
    return axios.get(API_URL);
  }

  obtenerPorId(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  guardar(tratamiento) {
    return axios.post(API_URL, tratamiento);
  }

  actualizar(id, tratamiento) {
    return axios.put(`${API_URL}/${id}`, tratamiento);
  }

  eliminar(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new TratamientoService();
