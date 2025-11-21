import axios from "axios";

const API_URL = "http://localhost:8080/api/terapeutas";

class TerapeutaService {
  obtenerTodos() {
    return axios.get(API_URL);
  }

  obtenerPorId(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  guardar(terapeuta) {
    return axios.post(API_URL, terapeuta);
  }

  actualizar(id, terapeuta) {
    return axios.put(`${API_URL}/${id}`, terapeuta);
  }

  eliminar(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new TerapeutaService();

