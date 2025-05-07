import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/users"; // Importar el store de Zustand
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';


function Capitulos() {
  const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://back-cursos.onrender.com"
    : "http://localhost:5000";

  const { cursoId, moduleName, chapterId } = useParams();
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);
  const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("nombre") || "Anónimo");
  const [showComments, setShowComments] = useState(true);
  const [course, setCourse] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");
  const [videoFinalizado, setVideoFinalizado] = useState(false);


  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;
  
      const { event: pandaEvent } = event.data;
  
      if (pandaEvent === "video-ended") {
        console.log("🎬 Video finalizado");
        setVideoFinalizado(true); // 🔓 desbloquea el botón
      }
    };
  
    window.addEventListener("message", handleMessage);
  
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chapterId) {
      localStorage.setItem("lastChapter", chapterId);
    }
  }, [chapterId]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(
          (course) =>
            course.courseTitle.toLowerCase().replace(/\s+/g, "-") === cursoId
        );
        if (selectedCourse) {
          setCourse(selectedCourse);
        }
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };

    if (cursoId) {
      fetchCourseData();
    }
  }, [cursoId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${cursoId}/${moduleName}/${chapterId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: cursoId,
          moduleName, // Incluye moduleName en la solicitud
          chapterId: parseInt(chapterId, 10),
          userEmail: userName,
          content: newComment,
        }),
      });
      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error("Error al borrar comentario:", error);
    }
  };

  useEffect(() => {
    if (cursoId && moduleName && chapterId) {
      fetchComments();
    }
  }, [cursoId, moduleName, chapterId]);

  useEffect(() => {
    if (showComments) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, showComments]);

  const goToNextChapter = async () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    const nextIndex = currentIndex + 1;
  
    const email = localStorage.getItem("email");
    const capituloActual = `${moduleName}-${parseInt(chapterId, 10)}`;
    const capituloSiguiente = `${moduleName}-${nextIndex + 1}`;
  
    try {
      // 1. Marcar capítulo actual como finalizado
      await fetch(`${API_BASE_URL}/api/progreso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cursoId,
          capituloId: capituloActual,
          accion: "finalizado",
        }),
      });
  
      // 2. Marcar capítulo siguiente como iniciado
      await fetch(`${API_BASE_URL}/api/progreso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cursoId,
          capituloId: capituloSiguiente,
          accion: "inicio",
        }),
      });
  
      // 3. Navegar al siguiente capítulo
      navigate(`/cursos/${cursoId}/${moduleName}/${nextIndex + 1}`);
    } catch (error) {
      console.error("Error al actualizar progreso:", error);
    }
  };
  

  const goToPreviousChapter = () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    if (currentIndex > 0) {
      navigate(`/cursos/${cursoId}/${moduleName}/${currentIndex}`);
    } else {
      navigate(`/${cursoId}`);
    }
  };

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  const currentModuleChapters = course.chapters.filter(
    (chapter) => chapter.module === moduleName
  );

  if (currentModuleChapters.length === 0) {
    return <div className="text-white">Módulo no encontrado</div>;
  }

  const currentChapter =
    currentModuleChapters[parseInt(chapterId, 10) - 1];

  if (!currentChapter) {
    return <div className="text-white">Capítulo no encontrado</div>;
  }

  return (
<>
      <Navbar />
      <div className="py-2 mt-5 min-h-screen w-screen overflow-y-auto bg-gradient-to-r from-black/80 to-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-center mt-10">
        {currentChapter.title}
      </h1>
      <p className="text-white mb-4 text-center">{currentChapter.description}</p>

      <div className="bg-gradient-to-b from-black/80 to-black w-full sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
      {currentChapter.video ? (
 
<div className="w-full h-[180px] md:h-[580px]">
    <iframe
      src={currentChapter.video}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>

) : (
  <p className="text-white">No hay video disponible para este capítulo.</p>
)}
<div className="w-full flex items-center justify-center">
  {currentChapter && currentChapter.weib? (
    <a
      href={currentChapter.weib}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2 transition duration-300"
    >
      {/* Ícono SVG de carrito de compras */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0h2v2H17v-2z"
        />
      </svg>
      <span>Adquirir weibook</span>
    </a>
  ) : (""
  )}
{currentChapter.link ? (
  <a
  href={currentChapter.link}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2 transition duration-300"
>
  {/* Ícono SVG de carrito de compras */}
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round"         className="h-6 w-6" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>

  <span>Material adicional</span>
</a>

) : ""}


</div>


        <button
          onClick={() => setShowComments(!showComments)}
          className="bg-gradient-to-r from-black to-black border-b-4  text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {showComments && (
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Comentarios</h2>
            <div className="space-y-4 mb-6 overflow-y-auto" style={{ maxHeight: "300px" }}>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-black border-1 border-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-lg text-white">{comment.userEmail}</p>
                    <p className="text-white text-sm">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  {comment.userEmail === userName || rol === "admin" ? (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-600 text-white py-1 px-1 rounded"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                    </button>
                  ) : null}
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2 bg-white/60 text-white"
            />
            <button
              onClick={handleAddComment}
              className="bg-gradient-to-r from-black to-white/20 text-white py-2 px-4 rounded-lg w-full"
            >
              Agregar Comentario
            </button>
          </div>
        )}

        <div className="flex justify-between w-full mt-6">
          <button
            onClick={goToPreviousChapter}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Anterior
          </button>
          <button
            onClick={() => navigate(`/cursos/${cursoId}`)}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Regresar
          </button>
          {parseInt(chapterId, 10) < currentModuleChapters.length && (
        <button
        onClick={goToNextChapter}
        className={`py-2 px-4 rounded-lg ${
          videoFinalizado
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-600 text-white cursor-not-allowed"
        }`}
        disabled={!videoFinalizado}
      >
        Siguiente
      </button>
      
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Capitulos;
