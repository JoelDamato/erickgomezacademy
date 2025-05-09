import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

export default function UsuariosMasterFade() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/search/usuarios`) // ✅ nuevo endpoint correcto
      .then(res => {
        console.log("📦 Usuarios completos:", res.data);
        if (Array.isArray(res.data)) {
          setUsuarios(res.data);
        } else {
          console.error("La respuesta no es un array");
        }
      })
      .catch(err => console.error('Error cargando usuarios', err));
  }, []);

  const usuariosFiltrados = usuarios.filter(user => {
    const tieneCurso = user.cursos?.includes("Master Fade 3.0");
    if (!tieneCurso) return false;

    if (!busqueda) return true;

    const termino = busqueda.toLowerCase();
    return (
      user.nombre?.toLowerCase().includes(termino) ||
      user.email?.toLowerCase().includes(termino)
    );
  });

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        <span className="bg-white px-3 py-1 rounded text-black">Master Fade 3.0</span>
      </h2>

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
          usuariosFiltrados.map((user, index) => (
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
                <p className="text-xs text-gray-400">
                  📅 {new Date(user.fechaFormCompletado).toLocaleDateString()}
                </p>
              )}

              <details className="mt-2 w-full text-left text-xs">
                <summary className="cursor-pointer text-teal-400">Ver progreso</summary>
                {user.progresoCursos?.map((curso, i) => (
                  <div key={i} className="mt-1">
                    <p className="font-semibold">{curso.curso}</p>
                    <ul className="list-disc ml-4 text-gray-300">
                      {curso.capitulos.map((cap, j) => (
                        <li key={j}>
                          {cap.capituloId} – {cap.estado}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
