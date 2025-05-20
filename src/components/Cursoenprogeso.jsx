// components/ProgresoUsuario.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../api_base";


export default function ProgresoUsuario({ email }) {
  const [cursoEnProgreso, setCursoEnProgreso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      console.warn("⛔ No hay email, no se puede buscar el progreso");
      return;
    }
  
    const fetchProgreso = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/progresoget?email=${encodeURIComponent(email)}`);
        const progreso = await res.json();
        console.log("📦 Progreso recibido del backend:", progreso);
  
        if (!Array.isArray(progreso)) {
          console.error("❌ 'progreso' no es un array:", progreso);
          return;
        }
  
        const cursoMap = progreso.reduce((acc, p) => {
          if (p.estado === 'en_progreso') acc[p.cursoId] = true;
          return acc;
        }, {});
  
        const cursoId = Object.keys(cursoMap)[0];
  
        if (cursoId) {
          const cursosRes = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
          const cursos = await cursosRes.json();
          const curso = cursos.find(c => cursoId === c.courseTitle.toLowerCase().replace(/\s+/g, '-'));
          if (curso) setCursoEnProgreso(curso);
        }
      } catch (err) {
        console.error('❌ Error al traer progreso del usuario:', err);
      }
    };
  
    fetchProgreso();
  }, [email]);
  
  

  if (!cursoEnProgreso) return null;

  return (
    <div className="w-full px-4 mt-10">
        <h1 className=" text-3xl md:mb-10 font-bold text-center text-transparent bg-gradient-to-b from-gray-600 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide">
            Continuar viendo
          </h1>
      <div className="bg-black/80 rounded-lg shadow-md p-4 flex items-center gap-4 max-w-2xl">
        <img src={cursoEnProgreso.image} alt="Curso" className="w-28 h-28 object-cover rounded-md" />
        <div>
          <h3 className="text-white font-bold text-lg">{cursoEnProgreso.courseTitle}</h3>
          <p className="text-gray-300 text-sm mb-2">{cursoEnProgreso.courseDescription}</p>
          <button
            onClick={() => navigate(`/cursos/${cursoEnProgreso.courseTitle.toLowerCase().replace(/\s+/g, '-')}`)}
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
