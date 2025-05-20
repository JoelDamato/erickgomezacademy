import { Menu, X, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MisCursos from "../pages/Miscursos";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const Dashboard = location.pathname === "/Dashboard";
  const PanelControl = location.pathname === "/PanelControl";
  const Preguntas = location.pathname === "/Preguntas";
  const Miscursos = location.pathname === "/miscursos";

  const [user, setUser] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://back-cursos.onrender.com"
      : "http://localhost:5000";

  useEffect(() => {
    if (token && email) {
      axios.post(
        `${API_BASE_URL}/api/search/users`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("rol", response.data.rol);
      })
      .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [navigate, API_BASE_URL]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 0.9);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="w-full text-white flex items-center justify-between px-2 py-2 mb-4 fixed top-0 z-50 transition-colors duration-200"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      <div className="flex items-center gap-2">
        <img
          src="/erickgomez.png"
          alt="Logo Erick Gomez Academy"
          style={{ width: "5rem", height: "4rem" }}
          className="h-auto"
        />
      </div>

      <div className="hidden sm:flex gap-4 items-center">
        {token ? (
          <>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
            {user?.imagenPerfil ? (
              <img
                src={user.imagenPerfil}
                alt="Foto"
                className="w-8 h-8 rounded-full object-cover border border-white cursor-pointer"
                onClick={() => handleNavigation("/Perfil")}
              />
            ) : (
              <CircleUserRound className="w-6 h-6 text-white" onClick={() => handleNavigation("/Perfil")} />
            )}
          </>
        ) : (
          <CircleUserRound className="w-6 h-6 text-white" onClick={() => navigate('/login')} />
        )}
      </div>

      <div className="sm:hidden flex items-center gap-2">
        {token && (
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <Menu className="w-8 h-8" />
          </button>
        )}
        {token ? (
          user?.imagenPerfil ? (
            <img
              src={user.imagenPerfil}
              alt="Foto"
              className="w-8 h-8 rounded-full object-cover border border-white cursor-pointer"
              onClick={() => handleNavigation("/Perfil")}
            />
          ) : (
            <CircleUserRound className="w-8 h-8 text-white" onClick={() => handleNavigation("/Perfil")} />
          )
        ) : (
          <CircleUserRound className="w-8 h-8 text-white" onClick={() => navigate('/login')} />
        )}
      </div>

      {isMenuOpen && token && (
        <div className="fixed top-0 right-0 w-2/3 h-full bg-black bg-opacity-95 z-40 flex flex-col items-start p-6">
          <button onClick={toggleMenu} className="self-end mb-4 text-white focus:outline-none">
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col w-full gap-4">
            {!Dashboard && (
              <button onClick={() => handleNavigation("/Dashboard")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Dashboard
              </button>
            )}
         {!Miscursos && (
              <button onClick={() => handleNavigation("/misentrenamientos")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Mis Entrenamientos
              </button>
            )}

            {!Preguntas && (
              <button onClick={() => handleNavigation("/Preguntas")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Preguntas Frecuentes
              </button>
            )}
              <button onClick={() => handleNavigation("/kitbarberia")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                  Kit Barber IA
              </button>
       
            
            {user?.rol === "admin" && !PanelControl && (
              <button onClick={() => handleNavigation("/PanelControl")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Panel de Control
              </button>
            )}
              {user?.rol === "admin" && (
              <button onClick={() => handleNavigation("/metricas")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Metricas
              </button>
            )}
            {user?.rol === "admin" && (
              <button onClick={() => handleNavigation("/Csm")} className="text-white text-lg hover:bg-white/30 flex items-center gap-2 border-b border-white pb-4">
                Csm
              </button>
            )}
            <button onClick={handleLogout} className="text-white text-lg hover:bg-red-800/20 flex items-center gap-2 border-b border-white pb-4">
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
