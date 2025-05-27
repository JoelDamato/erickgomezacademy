import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/users"; // Importar el store de Zustand
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import API_BASE_URL from "../api_base";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";

function Capitulos() {
  const { cursoId, moduleName, chapterId } = useParams();
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);
  const workerUrl =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("nombre") || "Anónimo"
  );
  const [showComments, setShowComments] = useState(true);
  const [course, setCourse] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");
  const [tiempoReproducido, setTiempoReproducido] = useState(0);
  const [duracionEstimativa, setDuracionEstimativa] = useState(0);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const [capituloYaCompletado, setCapituloYaCompletado] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const email = localStorage.getItem("email");
  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const playerRef = useRef(null);

  useEffect(() => {
    const verificarProgreso = async () => {
      try {
        const email = localStorage.getItem("email");
        const res = await fetch(
          `${API_BASE_URL}/api/progresoget?email=${email}`
        );
        const data = await res.json();

        const capituloActualId = `${moduleName}-${parseInt(chapterId, 10)}`;
        const progresoActual = data.find(
          (p) => p.capituloId === capituloActualId && p.estado === "completado"
        );

        console.log("📊 Progreso desde el backend:", data);
        console.log(
          "🧠 Capítulo actual ID:",
          `${moduleName}-${parseInt(chapterId, 10)}`
        );
        console.log("✅ ¿Está completado?:", !!progresoActual);

        if (progresoActual) {
          setCapituloYaCompletado(true);
        }
      } catch (err) {
        console.error("Error al verificar progreso:", err);
      }
    };

    if (cursoId && moduleName && chapterId) {
      verificarProgreso();
    }
  }, [cursoId, moduleName, chapterId]);

  const currentModuleChapters =
    course?.chapters?.filter((chapter) => chapter.module === moduleName) || [];

  const currentChapter = currentModuleChapters[parseInt(chapterId, 10) - 1];

  // SIEMPRE FUERA DE CONDICIONALES
  useEffect(() => {
    if (currentChapter?.duration) {
      setDuracionEstimativa(currentChapter.duration);
    }
  }, [currentChapter]);

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
    const handleMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;

      const { message, playerData, currentTime } = event.data;

      if (message === "panda_allData") {
        if (playerData?.duration) {
          setDuracionEstimativa(playerData.duration);
        }
      }

      if (message === "panda_timeupdate" && typeof currentTime === "number") {
        setTiempoReproducido(currentTime);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (
      duracionEstimativa > 0 &&
      tiempoReproducido >= duracionEstimativa * 0.8
    ) {
      setVideoFinalizado(true);
    }
  }, [tiempoReproducido, duracionEstimativa]);

  function formatSecondsToMinutes(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(
          (course) =>
            course.courseTitle.toLowerCase().replace(/\s+/g, "-") === cursoId
        );
        console.log(comments.imagenPerfil);
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
      const response = await fetch(
        `${API_BASE_URL}/api/comments/${cursoId}/${moduleName}/${chapterId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    console.log(user?.imagenPerfil);

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
          userEmail: email,
          userName: userName,
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
      const response = await fetch(
        `${API_BASE_URL}/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
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
      // Marcar capítulo actual como finalizado
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

      // Marcar siguiente como iniciado
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

      // 🧹 Limpiar claves relacionadas al video
      localStorage.removeItem("lastChapter");
      // Agregá más si guardás por ejemplo `video_tiempo` o `progreso_video_capituloX`

      // Navegar
      window.location.href = `/cursos/${cursoId}/${moduleName}/${
        nextIndex + 1
      }`;
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

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  if (currentModuleChapters.length === 0) {
    return <div className="text-white">Módulo no encontrado</div>;
  }

  // Después viene:
  if (!currentChapter) {
    return <div className="text-white">Capítulo no encontrado</div>;
  }

  console.log(comments);

  return (
    <>
      <Navbar />
      <div className="py-2 mt-5 min-h-screen w-screen overflow-y-auto bg-gradient-to-r from-black/80 to-black flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mb-6 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-700 to-gray-200 drop-shadow-lg tracking-wide">
          {currentChapter.title}
        </h1>
        <p className="text-white mb-4 text-center">
          {currentChapter.description}
        </p>

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
            <p className="text-white">
              No hay video disponible para este capítulo.
            </p>
          )}
          <div className="w-full flex items-center justify-center">
            {currentChapter && currentChapter.weib ? (
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
            ) : (
              ""
            )}
            {currentChapter.link ? (
              <a
                href={currentChapter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2 transition duration-300"
              >
                {/* Ícono SVG de carrito de compras */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    className="h-6 w-6"
                    stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>

                <span>Material adicional</span>
              </a>
            ) : (
              ""
            )}

            {currentChapter.wp && (
              <motion.a
                href={currentChapter.wp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-black via-blue-700 to-black text-white px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-xl shadow-lg font-semibold flex items-center justify-center space-x-2 m-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>🎓 INGRESA AL GRUPO VIP DE ALUMNOS</span>
              </motion.a>
            )}
          </div>

          <button
            onClick={() => setShowComments(!showComments)}
            className="bg-white/40 border-5  text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
          </button>

          {showComments && (
            <div className="w-full mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">
                Comentarios
              </h2>
              <div
                className="space-y-4 mb-6 overflow-y-auto"
                style={{ maxHeight: "300px" }}
              >
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-black border-1 border-white p-4 rounded-lg shadow flex items-start gap-4"
                  >
                    {/* Imagen de perfil */}
                    {comment.imagenPerfil ? (
                      <img
                        src={comment.imagenPerfil}
                        alt="Foto de perfil"
                        className="w-12 h-12 rounded-full object-cover border border-white"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 rounded-full border border-white bg-gray-700 p-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14c-3.333 0-6 1.333-6 4v2h12v-2c0-2.667-2.667-4-6-4zm0-2a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                    )}
                    {/* Contenido del comentario */}
                    <div className="flex-1">
                      <p className="font-bold text-lg text-white">
                        {capitalizeFirstLetter(
                          comment.userName || comment.userEmail
                        )}
                      </p>
                      <p className="text-white text-sm">{comment.content}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    {comment.userEmail === userName || rol === "admin" ? (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="bg-red-600 text-white py-1 px-1 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                ))}

                <div ref={commentsEndRef} />
              </div>
              <div className="relative w-full mb-2">
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={selectedEmoji + newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded bg-white/40 text-black placeholder-white pr-10" // pr-10 para espacio a la derecha
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-2  text-2xl"
                  tabIndex={-1}
                >
                  😊
                </button>
                {showEmojiPicker && (
                  <div className="absolute right-0 z-50 top-full mt-2">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setSelectedEmoji(emojiData.emoji);
                        setShowEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full items-center">
                <button
                  onClick={handleAddComment}
                  className="bg-gradient-to-r from-black to-white/20 text-white py-2 px-4 rounded-lg w-4/5 sm:w-1/4"
                >
                  Enviar comentario
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between w-full mt-6">
            {parseInt(chapterId, 10) === 1 ? (
              <button
                onClick={() => navigate(`/cursos/${cursoId}`)}
                className="bg-black text-white py-2 px-4 rounded-lg"
              >
                Volver
              </button>
            ) : (
              <button
                onClick={goToPreviousChapter}
                className="bg-black text-white py-2 px-4 rounded-lg"
              >
                Anterior
              </button>
            )}

            {parseInt(chapterId, 10) === currentModuleChapters.length && (
              <button
                onClick={async () => {
                  const email = localStorage.getItem("email");
                  const capituloActual = `${moduleName}-${parseInt(
                    chapterId,
                    10
                  )}`;
                  try {
                    console.log("📤 Enviando progreso: completado", {
                      email,
                      cursoId,
                      capituloId: capituloActual,
                      accion: "finalizado",
                    });

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
                  } catch (error) {
                    console.error("Error al marcar como completado:", error);
                  }

                  navigate(`/cursos/${cursoId}`);
                }}
                disabled={!(videoFinalizado || capituloYaCompletado)}
                className={`py-2 px-4 border-2 border-white rounded-lg transition-all ${
                  videoFinalizado || capituloYaCompletado
                    ? "bg-green-500 text-white hover:bg-green-700"
                    : "bg-black text-white cursor-not-allowed opacity-60"
                }`}
              >
                Finalizar
                {!(videoFinalizado || capituloYaCompletado) && (
                  <div className="text-white mt-4 text-sm">
                    ⏱ Reproducido: {formatSecondsToMinutes(tiempoReproducido)} /{" "}
                    {formatSecondsToMinutes(duracionEstimativa)}
                  </div>
                )}
              </button>
            )}

            {parseInt(chapterId, 10) === currentModuleChapters.length && (
              <button
                onClick={async () => {
                  const email = localStorage.getItem("email");
                  const capituloActual = `${moduleName}-${parseInt(
                    chapterId,
                    10
                  )}`;
                  try {
                    console.log("📤 Enviando progreso: completado", {
                      email,
                      cursoId,
                      capituloId: capituloActual,
                      accion: "finalizado",
                    });

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
                  } catch (error) {
                    console.error("Error al marcar como completado:", error);
                  }

                  navigate(`/cursos/${cursoId}`);
                }}
                disabled={!(videoFinalizado || capituloYaCompletado)}
                className={`py-2 px-4  rounded-lg transition-all ${
                  videoFinalizado || capituloYaCompletado
                    ? "bg-green-500 text-white hover:bg-green-700"
                    : "bg-black text-white cursor-not-allowed "
                }`}
              >
                {parseInt(chapterId, 10) === currentModuleChapters.length &&
                cursoId === "master-fade-3.0" ? (
                  <a
                    href="https://wa.me/59891640623?text=Hola,%20quiero%20realizar%20la%20prueba%20para%20graduarme%20en%20el%20Master%20Fade%203.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition duration-300"
                  >
                    Realizar Evaluación
                  </a>
                ) : null}
              </button>
            )}

            {parseInt(chapterId, 10) < currentModuleChapters.length &&
              (() => {
                const puedeAvanzar = videoFinalizado || capituloYaCompletado;

                console.log("🎥 videoFinalizado:", videoFinalizado);
                console.log("🟢 capituloYaCompletado:", capituloYaCompletado);
                console.log("🚦 puedeAvanzar:", puedeAvanzar);

                return (
                  <button
                    onClick={goToNextChapter}
                    disabled={!puedeAvanzar}
                    className={`py-2 px-4 border-2 border-white rounded-lg transition-all ${
                      puedeAvanzar
                        ? "bg-green-500 text-white hover:bg-green-700"
                        : "bg-black text-white cursor-not-allowed opacity-60"
                    }`}
                  >
                    Siguiente
                    {!puedeAvanzar && (
                      <div className="text-white mt-4 text-sm">
                        ⏱ Reproducido:{" "}
                        {formatSecondsToMinutes(tiempoReproducido)} /{" "}
                        {formatSecondsToMinutes(duracionEstimativa)}
                      </div>
                    )}
                  </button>
                );
              })()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Capitulos;
