import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Curses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const phoneNumber = "+59891640623"; 

  useEffect(() => {
    const head = document.head;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      "https://t.erickgomezacademy.com/v1/lst/universal-script?ph=fb1590df5598c8770c1c7fbfb13870b527b36e3e2b2ee95bbf0bd268b93a649c&tag=!clicked&ref_url=" +
      encodeURIComponent(window.location.href);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, []);

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cursos.onrender.com'
      : 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [API_BASE_URL]);

  return (
    <div className="bg-black/90 h-full w-screen flex flex-col items-center" style={{ backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')" }}>
      <div className="relative flex flex-col items-center">
        <img
          src="https://i.ibb.co/hy7tRTP/ERICK.webp"
          alt="Fondo"
          className="w-full max-w-md sm:max-w-lg rounded-lg"
        />
        <img src="/erickgomez.png" alt=""
          className="absolute top-20 text-shadow text-white font-bold text-center text-2xl sm:text-4xl px-4"/>
      </div>

      <div className="bg-gradient-to-r from-black/90 to-black/90 h-auto w-full sm:w-11/12 flex flex-col items-center p-8 shadow-lg">
        <p 
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          className="mt-20 text-shadow text-white font-bold text-center text-1xl sm:text-2xl px-4 mb-4">
          Bienvenidos a la academia online de barberos más grande de habla hispana
        </p>
        <p className="bg-white rounded-lg text-black font-bold text-center text-2xl sm:text-lg px-4 mb-2">
          Conoce todos mis cursos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">
          {courses.length > 0 ? (
            courses
              .filter(course => course.courseTitle !== "REGALO DE LANZAMIENTO")
              .map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between h-full"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.2 }} // Se activa cuando el 20% de la tarjeta entra en la vista
                >
                  <img
                    src={course.image}
                    alt={course.courseTitle}
                    className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
                  />
                  <h3 className="text-white text-2xl font-bold mb-4 text-center">
                    {course.courseTitle}
                  </h3>
                  <p className="text-white font-bold mb-4 text-center">{course.courseDescription}</p> 
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      "Hola, me interesa más información sobre el curso: " + course.courseTitle
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center gap-2 mt-auto"
                  >
                    Obtener ahora
                  </a>
                </motion.div>
              ))
          ) : (
            <p className="text-white text-xl">Cargando cursos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Curses;
