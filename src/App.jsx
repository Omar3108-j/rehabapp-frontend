import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Inicio from "./pages/Inicio.jsx";

/* Tratamientos */
import Tratamientos from "./pages/Tratamientos.jsx";
import AgregarTratamiento from "./pages/AgregarTratamiento.jsx";
import EditarTratamiento from "./pages/EditarTratamiento.jsx";
import DetalleTratamiento from "./pages/DetalleTratamiento.jsx";

/* Pacientes */
import Pacientes from "./pages/Pacientes.jsx";
import AgregarPaciente from "./pages/AgregarPaciente.jsx";
import EditarPaciente from "./pages/EditarPaciente.jsx";
import DetallePaciente from "./pages/DetallePaciente.jsx";

/* Terapeutas */
import Terapeutas from "./pages/Terapeutas.jsx";
import AgregarTerapeuta from "./pages/AgregarTerapeuta.jsx";
import EditarTerapeuta from "./pages/EditarTerapeuta.jsx";
import DetalleTerapeuta from "./pages/DetalleTerapeuta.jsx";

/* Sesiones */
import AgregarSesion from "./pages/AgregarSesion.jsx";
import EditarSesion from "./pages/EditarSesion.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 text-gray-800">

        {/* 🔹 NAVBAR */}
        <nav className="bg-gradient-to-r from-sky-700 to-green-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">
              🏥 Centro de Rehabilitación
            </h1>

            <div className="space-x-6 text-lg font-medium">
              <Link to="/" className="hover:text-gray-200 transition">
                Inicio
              </Link>

              <Link to="/pacientes" className="hover:text-gray-200 transition">
                Pacientes
              </Link>

              <Link to="/tratamientos" className="hover:text-gray-200 transition">
                Tratamientos
              </Link>

              <Link to="/terapeutas" className="hover:text-gray-200 transition">
                Terapeutas
              </Link>
            </div>
          </div>
        </nav>

        {/* 🔹 CONTENIDO PRINCIPAL */}
        <main className="max-w-6xl mx-auto p-6">
          <Routes>

            {/* 🏠 Inicio */}
            <Route path="/" element={<Inicio />} />

            {/* 👤 Pacientes */}
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/agregar-paciente" element={<AgregarPaciente />} />
            <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
            <Route path="/paciente/:id" element={<DetallePaciente />} />

            {/* 🩺 Sesiones dentro del paciente */}
            <Route path="/paciente/:id/agregar-sesion" element={<AgregarSesion />} />
            <Route path="/paciente/:idPaciente/editar-sesion/:idSesion" element={<EditarSesion />} />

            {/* 💊 Tratamientos */}
            <Route path="/tratamientos" element={<Tratamientos />} />
            <Route path="/agregar-tratamiento" element={<AgregarTratamiento />} />
            <Route path="/editar-tratamiento/:id" element={<EditarTratamiento />} />
            <Route path="/tratamiento/:id" element={<DetalleTratamiento />} />

            {/* 🧑‍⚕️ Terapeutas */}
            <Route path="/terapeutas" element={<Terapeutas />} />
            <Route path="/terapeutas/agregar" element={<AgregarTerapeuta />} />
            <Route path="/terapeutas/editar/:id" element={<EditarTerapeuta />} />
            <Route path="/terapeutas/detalle/:id" element={<DetalleTerapeuta />} />

          </Routes>
        </main>

        {/* 🔹 FOOTER */}
        <footer className="bg-gray-100 text-center py-4 text-gray-500 text-sm border-t mt-6">
          © {new Date().getFullYear()} Centro de Rehabilitación | Todos los derechos reservados.
        </footer>
      </div>
    </Router>
  );
}















