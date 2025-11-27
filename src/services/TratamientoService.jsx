import api from "./api";

class TratamientoService {
  obtenerTodos() {
    return api.get("/tratamientos");
  }

  obtenerPorId(id) {
    return api.get(`/tratamientos/${id}`);
  }

  guardar(tratamiento) {
    return api.post("/tratamientos", tratamiento);
  }

  actualizar(id, tratamiento) {
    return api.put(`/tratamientos/${id}`, tratamiento);
  }

  eliminar(id) {
    return api.delete(`/tratamientos/${id}`);
  }
}

export default new TratamientoService();


