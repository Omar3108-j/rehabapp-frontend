import axios from "axios";

const API_URL = "http://localhost:8080/api/pacientes";

export const getPacientes = async () => {
  return await axios.get(API_URL);
};

export const createPaciente = async (paciente) => {
  return await axios.post(API_URL, paciente);
};

export const deletePaciente = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
