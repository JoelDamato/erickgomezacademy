import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import CursosonlineRefactor from './pages/CursosonlineRefactor.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Perfil from './pages/Perfil.jsx';
import Regalo from './pages/Regalo.jsx'; 
import EjemploLanding from './landinpage/landingejemplo.jsx';
import Landingbarberos from './landinpage/landingbarberos.jsx';
import HM from './landinpage/homeejemplo.jsx';
import Luisfer from './landinpage/Luisfer.jsx';
import Stam from './landinpage/Stam.jsx';
import Sdstudio from './landinpage/Sdstudio.jsx';
import Celin from './landinpage/Celinbarber.jsx';
import Coco  from './landinpage/Coco.jsx';
import Metricas  from './pages/Metricas.jsx';
import Colorimetria  from './components/Colorimetria.jsx';
import Politicaderembolso from './pages/Politicasrembolso.jsx'
import Error404 from './pages/Error404.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import PoliticasPrivacidad from './pages/PoliticasdePrivacidad.jsx';
import MasterFadePage from './pages/MasterFade.jsx';
import VentaMP from "./pages/VentaMP.jsx"
import Success from './pages/Succes.jsx';
import Preguntas from'./pages/Preguntas.jsx';
import Pdf from'./components/2pdf.jsx';
import Herramientas from './pages/Herramients.jsx';
import VideoBarberos from './pages/Ultimomomento.jsx';
import Csm from './pages/Csm.jsx';
import InscripcionesAbiertas from './pages/inscripcionesabiertas.jsx';
import MisCursos from './pages/Miscursos.jsx';
import EditarPassword from './pages/Editpassword.jsx';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./store/userSlice";
import axios from "axios";
import API_BASE_URL from "./api_base";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      axios
        .post(`${API_BASE_URL}/api/search/users`, { email }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          dispatch(setUserData(res.data));
        })
        .catch(() => {
          // Si falla, podrías limpiar el usuario
          dispatch(setUserData(null));
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cursosonline2" element={<CursosonlineRefactor />} />
        <Route path="/instagram" element={<><CursosonlineRefactor/></>} />
        <Route path="/biografia" element={<><CursosonlineRefactor/></>} />
        <Route path="/setter" element={<><CursosonlineRefactor/></>} />
        <Route path="/ads" element={<><CursosonlineRefactor/></>} />
        <Route path="/fade1" element={<><MasterFadePage/></>} />
        <Route path="/Politicarembolso" element={<Politicaderembolso />} />
        <Route path="/PoliticaPrivacidad" element={<PoliticasPrivacidad />} />
        <Route path="/landingbarberos" element={<Landingbarberos />} />
        <Route path="/luisferbarbershop" element={<Luisfer />} />
        <Route path="/Stambarber" element={<Stam />} />
        <Route path="/Sdstudio" element={<Sdstudio />} />
        <Route path="/Celinbarber" element={<Celin />} />
        <Route path="/Coco" element={<Coco />} />
        <Route path="/pasarelamp" element={<VentaMP />} />
        <Route path="/success" element={<Success />} />
        <Route path="/preguntas" element={<Preguntas/>} />
        <Route path="/pdf2" element={<Pdf/>} />
        <Route path="/ultimomomento" element={<VideoBarberos />} />
        <Route path="/inscripcionesabiertas" element={<InscripcionesAbiertas />} />
        <Route path="/editar-password" element={<EditarPassword />} />



        {/* PRIVADAS */}
        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/PanelControl" element={<PrivateRoute><PanelControl /></PrivateRoute>} />
        <Route path="/cursos/:cursoId" element={<PrivateRoute><Cursos /></PrivateRoute>} />
        <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<PrivateRoute><Capitulos /></PrivateRoute>} />
        <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/Regalo" element={<PrivateRoute><Regalo /></PrivateRoute>} />
        <Route path="/landing" element={<PrivateRoute><EjemploLanding /></PrivateRoute>} />
        <Route path="/homee" element={<PrivateRoute><HM /></PrivateRoute>} />
        <Route path="/Metricas" element={<PrivateRoute><Metricas /></PrivateRoute>} />
        <Route path="/csm" element={<PrivateRoute><Csm/></PrivateRoute>} />
        <Route path="/colorimetria" element={<PrivateRoute><Colorimetria /></PrivateRoute>} />
        <Route path="/kitbarberia" element={<PrivateRoute><Herramientas/></PrivateRoute>} />
        <Route path="/misentrenamientos" element={<PrivateRoute><MisCursos/></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
