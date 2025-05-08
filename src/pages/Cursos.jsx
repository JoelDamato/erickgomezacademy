import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

function Cursos() {
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const { cursoId } = useParams();

  const [course, setCourse] = useState(null);
  const [progreso, setProgreso] = useState({});
  const [openModules, setOpenModules] = useState({});

  const sanitizeTitle = (title) =>
    title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\.\-]/g, '');

  const groupChaptersByModule = (chapters) => {
    return chapters.reduce((acc, chapter) => {
      const { module } = chapter;
      if (!acc[module]) acc[module] = [];
      acc[module].push(chapter);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(
          (course) => sanitizeTitle(course.courseTitle) === cursoId
        );
        if (selectedCourse) {
          const modules = groupChaptersByModule(selectedCourse.chapters);
          setCourse({ ...selectedCourse, modules });
        }
      } catch (error) {
        console.error('Error al obtener el curso:', error);
      }
    };

    const fetchProgreso = async () => {
      const email = localStorage.getItem('email');
      try {
        const res = await fetch(`${API_BASE_URL}/api/progresoget?email=${email}`);
        const data = await res.json();

        const progresoMap = {};
        data
          .filter(p => p.email === email)
          .forEach(p => {
            progresoMap[p.capituloId] = p.estado;
          });
        setProgreso(progresoMap);
      } catch (err) {
        console.error('Error al traer progreso:', err);
      }
    };

    if (cursoId) {
      fetchCourseData();
      fetchProgreso();
    }
  }, [cursoId]);

  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData();
    navigate('/');
  };

  const handleVerCapitulo = async (cursoTitle, moduleName, chapterIndex) => {
    const chapter = course.modules[moduleName][chapterIndex];
    const capituloId = `${moduleName}-${chapterIndex + 1}`;
  
    const body = {
      email: localStorage.getItem('email'),
      cursoId: sanitizeTitle(cursoTitle),
      capituloId,
      accion: "inicio"
    };
  
    console.log("📤 Enviando progreso:", body); // <-- Agregado
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/progreso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        setProgreso((prev) => ({ ...prev, [capituloId]: 'en_progreso' }));
        navigate(`/cursos/${sanitizeTitle(cursoTitle)}/${moduleName}/${chapterIndex + 1}`);
      } else {
        console.error('❌ Error al registrar progreso:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Error al registrar progreso:', error);
    }
  };
  

  const toggleModule = (moduleName) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  if (!course) {
    return <div className="text-white p-10">Cargando curso...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black">
      <Navbar
        toggleProfile={() => setShowProfile(!showProfile)}
        handleLogout={handleLogout}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      <img
        src="https://i.ibb.co/6JRvGQ0M/Fondosinega2.png"
        className="h-[100%] md:h-[30vh] w-full"
        alt=""
      />

      <div className="-mt-[100px] max-w-6xl mx-auto text-white">
        <div className="flex flex-col items-center mb-10">
          {course.image ? (
            <img
              src={course.image}
              alt={course.courseTitle}
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-700 flex items-center justify-center rounded-lg mb-4">
              <span className="text-sm text-white">Sin imagen</span>
            </div>
          )}
          <h1 className="text-4xl md:mb-10 font-bold text-center text-transparent bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide">
            {course.courseTitle}
          </h1>
        </div>

        {Object.entries(course.modules).map(([moduleName, chapters], moduleIndex) => (
          <div key={moduleIndex} className="mb-8 border border-white rounded-lg bg-black/60">
            <button
              onClick={() => toggleModule(moduleName)}
              className="w-full text-left text-xl px-4 py-3 font-bold flex justify-between items-center"
            >
              <span className="text-2xl font-bold text-center text-transparent bg-gradient-to-b from-gray-700 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide">
                {moduleName}
              </span>
              <span>{openModules[moduleName] ? '▼' : '▶'}</span>
            </button>

            {openModules[moduleName] && (
              <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {chapters.map((chapter, chapterIndex) => {
                  const capituloId = `${moduleName}-${chapterIndex + 1}`;
                  const capituloPrevioId = `${moduleName}-${chapterIndex}`;
                  const estaDesbloqueado = chapterIndex === 0 || progreso[capituloPrevioId] === "completado";

                  const estado = progreso[capituloId];
                  const isDone = estado === "completado";
                  const inProgress = estado === "en_progreso";

                  const bordeColor = isDone
                    ? "border-green-500"
                    : inProgress
                    ? "border-yellow-400"
                    : "border-zinc-700";

                  return (
                    <div
                      key={chapterIndex}
                      className={`flex flex-col justify-between h-full bg-zinc-900 rounded-xl border p-4 shadow ${bordeColor}`}
                    >
                      <div className="min-h-[4.5rem] mb-3 flex flex-col items-center justify-center text-center relative">
                        <h3 className="text-lg font-semibold leading-snug max-w-[90%]">{chapter.title}</h3>
                        {isDone && (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                          </svg>
                        )}
                        {inProgress && (
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5" />
                          </svg>
                        )}
                      </div>

                      <div className="aspect-video rounded-lg flex items-center justify-center bg-zinc-800 overflow-hidden mb-3">
                        {chapter.image ? (
                          <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-white text-6xl font-extrabold animate-pulse drop-shadow-2xl">
                            {chapterIndex + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-center mt-auto">
                        <button
                          disabled={!estaDesbloqueado}
                          onClick={() => handleVerCapitulo(course.courseTitle, moduleName, chapterIndex)}
                          className={`py-2 px-6 mt-2 rounded-lg font-semibold transition ${
                            estaDesbloqueado
                              ? "bg-white text-black hover:bg-gray-200"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {estaDesbloqueado ? "Ver Capítulo" : "Bloqueado"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center my-12">
          <Link to="/Dashboard">
            <button className="bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-200 font-semibold">
              Volver al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
