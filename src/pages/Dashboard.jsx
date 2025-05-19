import '../App.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';
import FormOnboarding from '../components/FormOnboarding';


function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const scrollRef = useRef();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cursos.onrender.com'
      : 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      setIsLoading(false);
    } else if (email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUserData(res.data);
          if (res.data.nombre) localStorage.setItem('nombre', res.data.nombre);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [navigate, API_BASE_URL, setUserData]);

  useEffect(() => setShowProfile(false), [setShowProfile]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/courses/getcourses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error('Error fetching courses:', err));
  }, [API_BASE_URL]);



  const sanitizeCourseTitle = (title) => title.replace(/\s+/g, '-').toLowerCase();

  const hasCourse = (courseTitle) => user?.cursos?.includes(courseTitle);

  const phoneNumber = "+59891640623";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, tengo una consulta!.")}`;

  const coursesWithBanner = courses.filter(c => c.banner);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || coursesWithBanner.length === 0) return;
      const nextIndex = (activeIndex + 1) % bannersToShow.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, coursesWithBanner]);

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      setActiveIndex(index);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center" >
        <div className="bg-black/80 p-8 rounded-lg text-white text-xl">Cargando...</div>
      </div>
    );
  }
  const bienvenidaBanner = {
    banner: "https://i.ibb.co/XkJcr8JJ/Bienvenida.webp",
    courseTitle: "¡Bienvenido a la Academia!",
    courseDescription: "Bienvenido/a. Este no es solo un curso: es el inicio de tu transformación como barbero. Desde hoy sos parte de una comunidad de +10,000 barberos que crecen y se apoyan. No solo aprenderás técnica, sino a dejar tu marca en la industria. Este es tu momento. Este es tu lugar. Dale play… y empecemos.",
  };
  
// Reordeno: primero bienvenida, luego Master Fade si existe, luego el resto
const masterFade = coursesWithBanner.find(c => c.courseTitle?.toLowerCase().includes("master fade"));
const otherCourses = coursesWithBanner.filter(c => c !== masterFade);

const bannersToShow = [bienvenidaBanner];
if (masterFade) bannersToShow.push(masterFade);
bannersToShow.push(...otherCourses);



  return (
    <>
      <div className="relative h-full w-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black  bg-center" >
        <Navbar />
 
      < FormOnboarding/> 
  
       {user?.cursos?.length > 0 && (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-full shadow z-50 flex items-center gap-2 font-bold text-sm"
  >
    <img
      src="https://i.ibb.co/xKKJDBCS/d62368f7-f3e3-48ce-84cd-04a00024000e.png"
      alt="Soporte"
      className="w-6 h-6 rounded-lg"
    />
    Soporte
  </a>
)}


        {/* Carrusel solo si hay cursos con banner */}
        {coursesWithBanner.length > 0 && (
          <div className="w-full max-w-6xl mx-auto px-0 md:px-4 pt-0 md:pt-8">
            <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar w-full">
            {bannersToShow.map((curso, index) => (

                <div key={index} className="w-full flex-shrink-0 snap-center px-0 md:px-2" style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div
  className={`relative text-white ${index === activeIndex ? 'opacity-100' : 'opacity-90'} h-[100%] md:h-3/4 md:mt-10 transition-opacity duration-500 md:border border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row`}
>
  {/* Imagen del banner */}
  <img
  src={curso.banner}
  alt={curso.courseTitle}
  className="w-full h-[660px] md:w-1/2 md:h-full object-cover"
/>


  {/* Contenido para PC */}
  <div className="hidden md:flex flex-col justify-start w-full md:w-1/2 px-8 pt-32 relative">
  <div className="mb-4">
    {curso.nivel && (
      <img
        src={curso.nivel}
        alt="Nivel"
        className="w-24 md:w-28"
      />
    )}
  </div>
  <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-700 to-gray-200 drop-shadow-lg tracking-wide">
    {curso.courseTitle}
  </h3>
  <p className="mt-6 text-base text-gray-300">
    {curso.courseDescription}
  </p>
</div>



  {/* Contenido superpuesto para mobile */}
  {/* Contenido superpuesto para mobile */}
<div className="md:hidden absolute inset-0 flex flex-col items-center justify-end px-4 pb-6 text-center">
  {/* Contenedor de altura fija para imagen de nivel */}
  <div className="h-[80px] flex items-end justify-center mb-2">
    {curso.nivel && (
      <img
        src={curso.nivel}
        alt="Nivel"
        className="w-20 h-16 object-contain"
      />
    )}
  </div>
  <p className="text-sm text-gray-200">{curso.courseDescription}</p>
</div>

</div>


                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-1 md:-mt-20">
            {bannersToShow.map((_, i) => (

                <button key={i} onClick={() => scrollTo(i)} className={`w-3 h-3 rounded-full transition ${activeIndex === i ? "bg-white" : "bg-gray-500"}`} />
              ))}
            </div>
          </div>
        )}

        {/* Tarjetas estilo Max */}
        <div className="w-full px-4 mt-10 ">
        {user?.cursos?.length > 0 ? (
  <h1 className="text-4xl mb-8 text-center p-2 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-700 to-gray-200 drop-shadow-lg tracking-wide">
    Mis Cursos
  </h1>
) : (
  <div className="text-center mt-10">
    <h1 className="text-3xl mb-6 font-bold text-white">Aún no tienes ningún entrenamiento desbloqueado!
    </h1>
    <button
      onClick={() =>
        window.open(
          `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, quiero empezar mi entrenamiento.")}`,
          '_blank'
        )
      }
      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow transition-all"
    >
      Quiero inscribirme a la Academia
    </button>
  </div>
)}


          <div className="flex justify-center">
            <div className="flex overflow-x-auto gap-4 no-scrollbar">
              {courses.filter(c => hasCourse(c.courseTitle)).map((course, index) => (
                <div key={index} className="min-w-[160px] max-w-[160px] flex-shrink-0 rounded-md shadow-md p-2">
                  <a
                    onClick={() => navigate(course.courseTitle === "Colorimetria" ? "/colorimetria" : `/cursos/${sanitizeCourseTitle(course.courseTitle)}`)}
                    className="text-white text-sm font-bold w-full text-center mt-2 cursor-pointer"
                  >
                    <img src={course.image} alt={course.courseTitle} className="w-full h-40 object-cover rounded-md mb-2" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;