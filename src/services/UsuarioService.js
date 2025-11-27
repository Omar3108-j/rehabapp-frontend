import api from "./api";

class UsuarioService {
  obtenerUsuarios() {
    return api.get("/usuarios");
  }

  obtenerUsuario(id) {
    return api.get(`/usuarios/${id}`);
  }

  crearUsuario(data) {
    return api.post("/usuarios", data);
  }

  actualizarUsuario(id, data) {
    return api.put(`/usuarios/${id}`, data);
  }

  cambiarPassword(id, password) {
    return api.put(`/usuarios/${id}/password`, { password });
  }

  toggleEstado(id) {
    return api.patch(`/usuarios/${id}/estado`);
  }
}

export default new UsuarioService();



