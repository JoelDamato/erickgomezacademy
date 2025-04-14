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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/Cursosonline" element={<><Cursosonline/></>} />
        <Route path="/Cursosonline2" element={<><CursosonlineRefactor/></>} />
        <Route path="/instagram" element={<><CursosonlineRefactor/></>} />
        <Route path="/biografia" element={<><CursosonlineRefactor/></>} />
        <Route path="/setter" element={<><CursosonlineRefactor/></>} />
        <Route path="/ads" element={<><CursosonlineRefactor/></>} />
        <Route path="/Login" element={<><Login /></>} />
        <Route path="/Dashboard" element={<><Dashboard /></>} />
        <Route path="/PanelControl" element={<><PanelControl /></>} />
        <Route path="/cursos/:cursoId" element={<><Cursos /></>} />
        <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<><Capitulos /></>} />
        <Route path="/Certificados" element={<><Certificados /></>} />
        <Route path="/Certificadoscuty" element={<><Certificadoscuty /></>} />
        <Route path="/Perfil" element={<><Perfil /></>} />
        <Route path="/Regalo" element={<><Regalo /></>} />
        <Route path="/Curses" element={<><Curses /></>} />
        <Route path="/landing" element={<><EjemploLanding /></>} />
        <Route path="/homee" element={<><HM /></>} />
        <Route path="/landingbarberos" element={<><Landingbarberos /></>} />
        <Route path="/luisferbarbershop" element={<><Luisfer /></>} />
        <Route path="/Stambarber" element={<><Stam /></>} />
        <Route path="/Sdstudio" element={<><Sdstudio /></>} />
        <Route path="/Celinbarber" element={<><Celin /></>} />
        <Route path="/Coco" element={<><Coco/></>} />
        <Route path="/Metricas" element={<><Metricas /></>} />
        <Route path="/colorimetria" element={<><Colorimetria/></>} />
        <Route path="/Politicarembolso" element={<><Politicaderembolso/></>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
