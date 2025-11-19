import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Tratamientos from "./pages/Tratamientos.jsx";
import AgregarTratamiento from "./pages/AgregarTratamiento.jsx";
import EditarTratamiento from "./pages/EditarTratamiento.jsx";
import DetalleTratamiento from "./pages/DetalleTratamiento.jsx";

import Pacientes from "./pages/Pacientes.jsx";
import AgregarPaciente from "./pages/AgregarPaciente.jsx";
import EditarPaciente from "./pages/EditarPaciente.jsx";
import DetallePaciente from "./pages/DetallePaciente.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 text-gray-800">
        {/* 🔹 Barra de navegación */}
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
            </div>
          </div>
        </nav>

        {/* 🔹 Contenido principal */}
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            {/* 🏠 Inicio */}
            <Route path="/" element={<Inicio />} />

            {/* 👨‍⚕️ Pacientes */}
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/agregar-paciente" element={<AgregarPaciente />} />
            <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
            <Route path="/paciente/:id" element={<DetallePaciente />} />

            {/* 💊 Tratamientos */}
            <Route path="/tratamientos" element={<Tratamientos />} />
            <Route path="/agregar-tratamiento" element={<AgregarTratamiento />} />
            <Route path="/editar-tratamiento/:id" element={<EditarTratamiento />} />
            <Route path="/tratamiento/:id" element={<DetalleTratamiento />} />
          </Routes>
        </main>

        {/* 🔹 Pie de página */}
        <footer className="bg-gray-100 text-center py-4 text-gray-500 text-sm border-t mt-6">
          © {new Date().getFullYear()} Centro de Rehabilitación | Todos los derechos reservados.
        </footer>
      </div>
    </Router>
  );
}















