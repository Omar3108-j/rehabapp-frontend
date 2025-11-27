import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(null); 
  // usuario = { username, roles: ["ADMIN"] }

  // 🔵 Normalizar roles: convierte "ROLE_ADMIN" → "ADMIN"
  const normalizarRoles = (roles) => {
    if (!roles) return [];
    return roles.map(r => r.replace("ROLE_", ""));
  };

  // ================================
  //     CARGAR TOKEN AL INICIAR
  // ================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUsuario({
          username: decoded.sub,
          roles: normalizarRoles(decoded.roles)
        });

      } catch (e) {
        console.error("❌ Token inválido");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ================================
  //             LOGIN
  // ================================
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setUsuario({
      username: decoded.sub,
      roles: normalizarRoles(decoded.roles)
    });
  };

  // ================================
  //             LOGOUT
  // ================================
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  // ================================
  //     VERIFICAR ROL (ADMIN, USER)
  // ================================
  const tieneRol = (rolBuscado) => {
    if (!usuario) return false;
    return usuario.roles.includes(rolBuscado);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, tieneRol }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


