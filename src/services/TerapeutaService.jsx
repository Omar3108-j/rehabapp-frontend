import api from "./api";

class TerapeutaService {
  obtenerTodos() {
    return api.get("/terapeutas");
  }

  obtenerPorId(id) {
    return api.get(`/terapeutas/${id}`);
  }

  guardar(terapeuta) {
    return api.post("/terapeutas", terapeuta);
  }

  actualizar(id, terapeuta) {
    return api.put(`/terapeutas/${id}`, terapeuta);
  }

  eliminar(id) {
    return api.delete(`/terapeutas/${id}`);
  }
}

export default new TerapeutaService();




