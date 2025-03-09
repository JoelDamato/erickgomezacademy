import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Cursosonline from './pages/Cursosonline.jsx';
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
import Metricas  from './pages/Metricas.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/Cursosonline" element={<><Cursosonline/></>} />
        <Route path="/Login" element={<><Login /></>} />
        <Route path="/Dashboard" element={<><Dashboard /></>} />
        <Route path="/PanelControl" element={<><PanelControl /></>} />
        <Route path="/:cursoId" element={<><Cursos /></>} />
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
        <Route path="/Metricas" element={<><Metricas /></>} />


      </Routes>
    </Router>
  );
}

export default App;
