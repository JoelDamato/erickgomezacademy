import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Cursosonline from './pages/Cursosonline.jsx';
import CursosonlineRefactor from './pages/CursosonlineRefactor.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Certificados from './pages/Certificados.jsx';
import Certificadoscuty from './pages/Certificadoscuty.jsx';
import Perfil from './pages/Perfil.jsx';
import Regalo from './pages/Regalo.jsx'; 
import Curses from './pages/Curses.jsx';
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

function App() {

  return (
    <Router>
      <Routes>
         {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/Cursosonline" element={<Cursosonline />} />
        <Route path="/Cursosonline2" element={<CursosonlineRefactor />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/instagram" element={<><CursosonlineRefactor/></>} />
        <Route path="/biografia" element={<><CursosonlineRefactor/></>} />
        <Route path="/setter" element={<><CursosonlineRefactor/></>} />
        <Route path="/ads" element={<><CursosonlineRefactor/></>} />

        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/PanelControl" element={<PrivateRoute><PanelControl /></PrivateRoute>} />
        <Route path="/cursos/:cursoId" element={<PrivateRoute><Cursos /></PrivateRoute>} />
        <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<PrivateRoute><Capitulos /></PrivateRoute>} />
        <Route path="/Certificados" element={<PrivateRoute><Certificados /></PrivateRoute>} />
        <Route path="/Certificadoscuty" element={<PrivateRoute><Certificadoscuty /></PrivateRoute>} />
        <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/Regalo" element={<PrivateRoute><Regalo /></PrivateRoute>} />
        <Route path="/Curses" element={<PrivateRoute><Curses /></PrivateRoute>} />
        <Route path="/landing" element={<PrivateRoute><EjemploLanding /></PrivateRoute>} />
        <Route path="/homee" element={<PrivateRoute><HM /></PrivateRoute>} />
        <Route path="/landingbarberos" element={<PrivateRoute><Landingbarberos /></PrivateRoute>} />
        <Route path="/luisferbarbershop" element={<PrivateRoute><Luisfer /></PrivateRoute>} />
        <Route path="/Stambarber" element={<PrivateRoute><Stam /></PrivateRoute>} />
        <Route path="/Sdstudio" element={<PrivateRoute><Sdstudio /></PrivateRoute>} />
        <Route path="/Celinbarber" element={<PrivateRoute><Celin /></PrivateRoute>} />
        <Route path="/Coco" element={<PrivateRoute><Coco /></PrivateRoute>} />
        <Route path="/Metricas" element={<PrivateRoute><Metricas /></PrivateRoute>} />
        <Route path="/colorimetria" element={<PrivateRoute><Colorimetria /></PrivateRoute>} />
        <Route path="/Politicarembolso" element={<PrivateRoute><Politicaderembolso /></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
