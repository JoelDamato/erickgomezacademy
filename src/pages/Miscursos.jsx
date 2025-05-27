import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import API_BASE_URL from "../api_base";


function MisCursos() {
  const [user, setUser] = useState(null); // 🔄 ahora usamos estado local
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const phoneNumber = '+59891640623';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hola, tengo una consulta sobre mis cursos.'
  )}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!token || !email) {
          setHasError(true);
          setIsLoading(false);
          return;
        }

        const [userRes, coursesRes] = await Promise.all([
          axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/courses/getcourses`)
        ]);

        setUser(userRes.data);
        setCourses(coursesRes.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error al cargar usuario o cursos', err);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sanitizeCourseTitle = (title) =>
    title.replace(/\s+/g, '-').toLowerCase();

  const hasCourse = (courseTitle) =>
    user?.cursos?.includes(courseTitle);

  const cursosAsignados = courses.filter((c) => hasCourse(c.courseTitle));

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        Cargando cursos...
      </div>
    );
  }

  if (hasError || !user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
        <p className="text-lg mb-4">No se pudo cargar tu cuenta o los cursos.</p>
        <p className="text-sm text-gray-400">Verificá tu conexión o volvé a iniciar sesión.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white relative">
      <Navbar />
      <div className="relative w-full md:h-[30vh] h-[50vh] overflow-hidden">
  <img
    src="https://i.ibb.co/nKtSnvH/Fondo-plataforma-sin-logo.png"
    alt="Fondo Barbería"
    className="absolute top-0 left-0 w-full h-full object-cover"
  />

  {/* Degradado oscuro desde abajo */}
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />

  {/* Contenido centrado sobre la imagen */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

    <h1 className="text-4xl md:text-5xl font-bold -mt-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-100 drop-shadow-lg tracking-wide">
      Mis Entrenamientos
    </h1>
  </div>
</div>

      {user.cursos.length > 0 && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-black/90 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2 font-bold text-sm hover:scale-105 transition"
        >
          <img
            src="https://i.ibb.co/xKKJDBCS/d62368f7-f3e3-48ce-84cd-04a00024000e.png"
            alt="Soporte"
            className="w-6 h-6 rounded-md"
          />
          Soporte
        </a>
      )}

      <div className="max-w-6xl mx-auto px-4 py-14">


        {cursosAsignados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cursosAsignados.map((course, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02]"
              >
                <img
                  src={course.image}
                  alt={course.courseTitle}
                  className="w-full h-48 object-contain rounded-md bg-zinc-800 p-2"
                />
                <h3 className="text-lg font-bold mt-4 text-gray-100 text-center">
                  {course.courseTitle}
                </h3>
                <button
                  onClick={() =>
                    navigate(
                      course.courseTitle === 'Colorimetria'
                        ? '/colorimetria'
                        : `/cursos/${sanitizeCourseTitle(course.courseTitle)}`
                    )
                  }
                  className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-full transition"
                >
                  Ver entrenamiento
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-300">
              Aún no tenés un entrenamiento asignados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MisCursos;
