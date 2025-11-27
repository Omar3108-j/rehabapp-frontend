import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import EditarPassword from "./pages/EditarPassword.jsx";

/* Páginas generales */
import Inicio from "./pages/Inicio.jsx";
import Login from "./pages/Login.jsx";
import AccesoDenegado from "./pages/AccesoDenegado.jsx";

/* Pacientes */
import Pacientes from "./pages/Pacientes.jsx";
import AgregarPaciente from "./pages/AgregarPaciente.jsx";
import EditarPaciente from "./pages/EditarPaciente.jsx";
import DetallePaciente from "./pages/DetallePaciente.jsx";

/* Sesiones */
import AgregarSesion from "./pages/AgregarSesion.jsx";
import EditarSesion from "./pages/EditarSesion.jsx";

/* Tratamientos */
import Tratamientos from "./pages/Tratamientos.jsx";
import AgregarTratamiento from "./pages/AgregarTratamiento.jsx";
import EditarTratamiento from "./pages/EditarTratamiento.jsx";
import DetalleTratamiento from "./pages/DetalleTratamiento.jsx";

/* Terapeutas */
import Terapeutas from "./pages/Terapeutas.jsx";
import AgregarTerapeuta from "./pages/AgregarTerapeuta.jsx";
import EditarTerapeuta from "./pages/EditarTerapeuta.jsx";
import DetalleTerapeuta from "./pages/DetalleTerapeuta.jsx";

/* Usuarios (nuevo módulo ADMIN) */
import Usuarios from "./pages/Usuarios.jsx";
import AgregarUsuario from "./pages/AgregarUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";

export default function App() {
  const { usuario, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 text-gray-800">

        {/* NAVBAR SOLO SI ESTÁ LOGUEADO */}
        {usuario && (
          <nav className="bg-gradient-to-r from-sky-700 to-green-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
              
              <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">
                🏥 Centro de Rehabilitación
              </h1>

              {/* 🔹 Opciones del Menú */}
              <div className="space-x-6 text-lg font-medium">

                <Link to="/" className="hover:text-gray-200 transition">Inicio</Link>
                <Link to="/pacientes" className="hover:text-gray-200 transition">Pacientes</Link>
                <Link to="/tratamientos" className="hover:text-gray-200 transition">Tratamientos</Link>

                {/* Solo ADMIN accede a Terapeutas */}
                {usuario.roles?.includes("ADMIN") && (
                  <>
                    <Link to="/terapeutas" className="hover:text-gray-200 transition">Terapeutas</Link>
                    <Link to="/usuarios" className="hover:text-gray-200 transition">Usuarios</Link>
                  </>
                )}

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md shadow ml-4"
                >
                  Salir
                </button>

              </div>
            </div>
          </nav>
        )}

        {/* CONTENIDO */}
        <main className="max-w-6xl mx-auto p-6">

          <Routes>

            {/* LOGIN SIEMPRE DISPONIBLE */}
            <Route path="/login" element={<Login />} />

            {/* 403 */}
            <Route path="/403" element={<AccesoDenegado />} />

            {/* Si NO hay usuario → redirigir a login */}
            {!usuario ? (
              <Route path="/*" element={<Navigate to="/login" />} />
            ) : (
              <>
                {/* Inicio */}
                <Route path="/" element={<Inicio />} />

                {/* Pacientes */}
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/agregar-paciente" element={<AgregarPaciente />} />
                <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
                <Route path="/paciente/:id" element={<DetallePaciente />} />

                {/* Sesiones */}
                <Route path="/paciente/:id/agregar-sesion" element={<AgregarSesion />} />
                <Route path="/paciente/:idPaciente/editar-sesion/:idSesion" element={<EditarSesion />} />

                {/* Tratamientos */}
                <Route path="/tratamientos" element={<Tratamientos />} />
                <Route path="/agregar-tratamiento" element={<AgregarTratamiento />} />
                <Route path="/editar-tratamiento/:id" element={<EditarTratamiento />} />
                <Route path="/tratamiento/:id" element={<DetalleTratamiento />} />

                {/* Terapeutas (solo ADMIN) */}
                <Route 
                  path="/terapeutas"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <Terapeutas />
                    </ProtectedRoute>
                  }
                />
                {/* Gestión de Usuarios (solo ADMIN) */}
                <Route 
                  path="/usuarios"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <Usuarios />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/usuarios/agregar"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AgregarUsuario />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/usuarios/editar/:id"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <EditarUsuario />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/usuarios/password/:id"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <EditarPassword />
                    </ProtectedRoute>
                  }
                />


                <Route 
                  path="/terapeutas/agregar"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AgregarTerapeuta />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/terapeutas/editar/:id"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <EditarTerapeuta />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/terapeutas/detalle/:id"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <DetalleTerapeuta />
                    </ProtectedRoute>
                  }
                />

                {/* Gestión de Usuarios (solo ADMIN) */}
                <Route 
                  path="/usuarios"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <Usuarios />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/usuarios/agregar"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AgregarUsuario />
                    </ProtectedRoute>
                  }
                />

                <Route 
                  path="/usuarios/editar/:id"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <EditarUsuario />
                    </ProtectedRoute>
                  }
                />

              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
























