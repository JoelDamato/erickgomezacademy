import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

export default function UsuariosMasterFade() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tab, setTab] = useState('form');
  const [disparos, setDisparos] = useState({});


  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/search/usuarios`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setUsuarios(res.data);
        } else {
          console.error("La respuesta no es un array");
        }
      })
      .catch(err => console.error('Error cargando usuarios', err));
  }, []);

  const getProgreso = (user) => {
    return user.progresoCursos?.find(p => p.curso === "Master Fade 3.0")?.capitulos || [];
  }

  const getCompletados = (user) => {
    return getProgreso(user).filter(c => c.estado === "completado").map(c => c.capituloId);
  }

  const calcularEtiquetaTiempo = (fecha) => {
    if (!fecha) return null;
    const ahora = new Date();
    const diferenciaHoras = (ahora - new Date(fecha)) / (1000 * 60 * 60);

    if (diferenciaHoras > 168) return '🕒 +1 semana';
    if (diferenciaHoras > 24) return '⏰ +24hs';
    if (diferenciaHoras > 12) return '⏰ +12hs';
    if (diferenciaHoras > 2) return '⏰ +2hs';
    return null;
  }

  const getConteoPorTab = (tabId) => {
    return usuarios.filter(user => {
      const tieneCurso = user.cursos?.includes("Master Fade 3.0");
      if (!tieneCurso) return false;

      const completados = getCompletados(user);

      switch (tabId) {
        case 'form':
          return !user.completoForm;
        case 'bienvenida':
          return user.completoForm && !completados.includes("Master Fade 3.0-1");
        case 'clases':
          return user.completoForm && completados.includes("Master Fade 3.0-1") && (!completados.includes("Master Fade 3.0-2") || !completados.includes("Master Fade 3.0-3"));
        case 'mkt':
          return user.completoForm && completados.includes("Master Fade 3.0-3") && !completados.includes("Master Fade 3.0-4");
        case 'prueba':
          return user.completoForm && completados.includes("Master Fade 3.0-4") && !completados.includes("Master Fade 3.0-5");
        default:
          return false;
      }
    }).length;
  }

  useEffect(() => {
    const cargarDisparos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/disparos`);
        const disparosDesdeDB = res.data;
  
        const estructura = {};
        disparosDesdeDB.forEach(item => {
          estructura[item.userEmail] = {
            etapa: item.etapa,
            disparo2h: item.disparo2h || false,
            disparo12h: item.disparo12h || false,
            disparo24h: item.disparo24h || false,
            disparo1semana: item.disparo1semana || false,
          };
        });
  
        setDisparos(estructura);
      } catch (err) {
        console.error("❌ Error al obtener disparos:", err);
      }
    };
  
    cargarDisparos();
  }, []);
  

  const filtrarUsuarios = () => {
    return usuarios.filter(user => {
      const tieneCurso = user.cursos?.includes("Master Fade 3.0");
      if (!tieneCurso) return false;

      const termino = busqueda.toLowerCase();
      const coincideBusqueda =
        !busqueda || user.nombre?.toLowerCase().includes(termino) || user.email?.toLowerCase().includes(termino);

      const completados = getCompletados(user);

      switch (tab) {
        case 'form':
          return coincideBusqueda && !user.completoForm;
        case 'bienvenida':
          return coincideBusqueda && user.completoForm && !completados.includes("Master Fade 3.0-1");
        case 'clases':
          return coincideBusqueda && user.completoForm && completados.includes("Master Fade 3.0-1") && (!completados.includes("Master Fade 3.0-2") || !completados.includes("Master Fade 3.0-3"));
        case 'mkt':
          return coincideBusqueda && user.completoForm && completados.includes("Master Fade 3.0-3") && !completados.includes("Master Fade 3.0-4");
        case 'prueba':
          return coincideBusqueda && user.completoForm && completados.includes("Master Fade 3.0-4") && !completados.includes("Master Fade 3.0-5");
        default:
          return false;
      }
    });
  };

  useEffect(() => {
    const nuevosDisparos = {};
    usuarios.forEach(user => {
      if (!user.cursos?.includes("Master Fade 3.0")) return;
  
      const prev = disparos[user.email];
  
      // Si ya tiene disparos guardados Y es para la misma etapa actual, se mantienen
      if (prev && prev.etapa === tab) {
        nuevosDisparos[user.email] = prev;
      } else {
        // Si no hay o es otra etapa, se resetea
        nuevosDisparos[user.email] = {
          etapa: tab,
          disparo2h: false,
          disparo12h: false,
          disparo24h: false,
          disparo1semana: false,
        };
      }
    });
  
    setDisparos(nuevosDisparos);
  }, [tab, usuarios]);
  

  const usuariosFiltrados = filtrarUsuarios();

  const tabs = [
    { id: 'form', label: 'Pendiente de Formulario' },
    { id: 'bienvenida', label: 'Pendiente de Bienvenida' },
    { id: 'clases', label: 'Pendiente de Clases' },
    { id: 'mkt', label: 'Pendiente de MKT' },
    { id: 'prueba', label: 'Pendiente de Prueba' }
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        <span className="bg-white px-3 py-1 rounded text-black">Master Fade 3.0</span>
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1 rounded ${tab === t.id ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-700 text-white'}`}
          >
            {t.label} ({getConteoPorTab(t.id)})
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 px-4 py-2 w-full max-w-md bg-zinc-800 border border-gray-600 rounded text-sm text-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuariosFiltrados.length === 0 ? (
          <p className="text-gray-400 col-span-full">No se encontraron usuarios.</p>
        ) : (
          usuariosFiltrados.map((user, index) => {
            const etiqueta = tab === 'form' ? calcularEtiquetaTiempo(user.fechaAsignacionMasterFade30) : null;
            return (
              <div key={index} className="bg-zinc-800 p-3 rounded-lg shadow flex flex-col items-center text-center text-sm">
                <img
                  src={user.imagenPerfil}
                  alt={`Foto de ${user.nombre}`}
                  className="w-16 h-16 rounded-full object-cover mb-2 border border-gray-500"
                />
                <h3 className="font-semibold">{user.nombre}</h3>
                <p className="text-gray-400">{user.email}</p>
                <p>📞 {user.telefono || 'Sin teléfono'}</p>
                <p>🎓 Nivel: {user.nivel}</p>
                <p>📝 Formulario: {user.completoForm ? '✅' : '❌'}</p>
                {user.fechaFormCompletado && (
                  <p className="text-xs text-gray-400">📅 Formulario: {new Date(user.fechaFormCompletado).toLocaleString()}</p>
                )}
                {user.fechaAsignacionMasterFade30 && (
                  <p className="text-xs text-gray-400">💸 Fecha de compra: {new Date(user.fechaAsignacionMasterFade30).toLocaleString()}</p>
                )}
                {etiqueta && (
                  <p className="text-xs text-yellow-300 font-semibold">{etiqueta}</p>
                )}
                <details className="mt-2 w-full text-left text-xs">
                  <summary className="cursor-pointer text-teal-400">Ver progreso</summary>
                  <div className="mt-1">
                    <p className="font-semibold">Master Fade 3.0</p>
                    <ul className="list-disc ml-4 text-gray-300">
                      {getProgreso(user).map((cap, j) => (
                        <li key={j}>
                          {cap.capituloId} – {cap.estado} {cap.fechaInicio && `📆 ${new Date(cap.fechaInicio).toLocaleString()}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </details>

                <div className="mt-2 text-left text-xs w-full">
  <p className="font-semibold text-yellow-400">Disparos</p>
  {["disparo2h", "disparo12h", "disparo24h", "disparo1semana"].map(key => (
    <label key={key} className="flex items-center gap-2 mt-1">
      <input
        type="checkbox"
        checked={disparos[user.email]?.[key] || false}
        onChange={async () => {
          const nuevoValor = !disparos[user.email]?.[key];
      
          // Actualiza frontend
          setDisparos(prev => ({
            ...prev,
            [user.email]: {
              ...prev[user.email],
              [key]: nuevoValor
            }
          }));
      
          // Guarda en backend
          try {
            await axios.post(`${API_BASE_URL}/api/disparos`, {
              userEmail: user.email,
              etapa: tab,
              key,
              value: nuevoValor,
            });
          } catch (err) {
            console.error("❌ Error al guardar disparo:", err);
          }
        }}
      />
      {key.replace('disparo', 'Disparo ').replace('1semana', '1 semana').replace('h', ' hs')}
    </label>
  ))}
</div>

              </div>
            )
          })
        )}
      </div>
    </div>
  );
}
