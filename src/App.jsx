import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Certificados from './pages/Certificados.jsx';
import Certificadoscuty from './pages/Certificadoscuty.jsx';
import Perfil from './pages/Perfil.jsx';
import Regalo from './pages/Regalo.jsx';
import VerificarIPs from './components/VerificarIP'; 
import Curses from './pages/Curses.jsx';
import EjemploLanding from './landinpage/landingejemplo.jsx';
import Landingbarberos from './landinpage/landingbarberos.jsx';
import HM from './landinpage/homeejemplo.jsx';
import Luisfer from './landinpage/Luisfer.jsx';
import Stam from './landinpage/Stam.jsx';
import Sdstudio from './landinpage/Sdstudio.jsx';
import Celin from './landinpage/Celinbarber.jsx';
import Metricas from './pages/Metricas.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><VerificarIPs /><Home /></>} />
        <Route path="/Dashboard" element={<><VerificarIPs /><Dashboard /></>} />
        <Route path="/PanelControl" element={<><VerificarIPs /><PanelControl /></>} />
        <Route path="/:cursoId" element={<><VerificarIPs /><Cursos /></>} />
        <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<><VerificarIPs /><Capitulos /></>} />
        <Route path="/Certificados" element={<><VerificarIPs /><Certificados /></>} />
        <Route path="/Certificadoscuty" element={<><VerificarIPs /><Certificadoscuty /></>} />
        <Route path="/Perfil" element={<><VerificarIPs /><Perfil /></>} />
        <Route path="/Regalo" element={<><VerificarIPs /><Regalo /></>} />
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
