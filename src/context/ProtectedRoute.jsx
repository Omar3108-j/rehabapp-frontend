import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { usuario, tieneRol } = useAuth();

  // 🔹 Si todavía no cargó el usuario (primer render)
  if (usuario === null) {
    return <div>Cargando...</div>;
  }

  // 🔹 Si NO está logueado
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // 🔹 Validar roles si corresponde
  if (roles && typeof tieneRol === "function") {
    if (!roles.some(r => tieneRol(r))) {
      return <Navigate to="/403" />;
    }
  }

  // 🔹 Si todo OK → mostrar contenido
  return children;
}

