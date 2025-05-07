import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from '../components/Navbar';

const PreguntasFrecuentes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [abiertas, setAbiertas] = useState({});

  const secciones = [
    {
      titulo: "📚 Cursos y Plataforma",
      preguntas: [
        { pregunta: "¿En qué plataforma está el curso?", respuesta: "Actualmente, todos los cursos están en la plataforma oficial de Erick Gómez Academy. Se accede con el email brindado al momento de la compra." },
        { pregunta: "¿La clase en vivo se hace por Zoom?", respuesta: "Por el momento no se hacen clases en vivo. Estamos preparando un nuevo servicio con clases en vivo y seguimiento personalizado." },
        { pregunta: "¿Cuántas clases incluye el curso Growth? ¿Y Focus?", respuesta: "Growth tiene 12 clases. Focus tiene 17 y pronto evolucionará a un servicio de transformación empresarial." },
        { pregunta: "¿El acceso es permanente o tiene vencimiento?", respuesta: "El acceso a todos los cursos es de por vida. Si un curso deja de estar visible, podés solicitar reactivación." },
        { pregunta: "¿Cómo se obtiene el certificado del curso?", respuesta: "Completando el curso y presentando resultados comprobables mediante un formulario." }
      ]
    },
    {
      titulo: "📲 Redes Sociales y Promoción",
      preguntas: [
        { pregunta: "¿Qué recomendaciones tienen para el contenido en redes?", respuesta: "Usá buena luz, encuadre limpio, música en tendencia y constancia. Mostrá antes y después." },
        { pregunta: "¿Qué apps recomiendan para editar videos?", respuesta: "CapCut, VN Editor, InShot y Mojo son ideales para contenido rápido y profesional." },
        { pregunta: "¿Qué horarios recomiendan para publicar en redes?", respuesta: "Entre 11-14 hs y 19-21 hs. TikTok premia la frecuencia: 1 reel diario ideal, mínimo 4 por semana." }
      ]
    },
    {
      titulo: "✂ Herramientas y Técnicas",
      preguntas: [
        { pregunta: "¿Qué máquina de fade recomiendan?", respuesta: "Babyliss Pro Gold FX, Wahl Senior o JRL 2020C por su precisión y durabilidad." },
        { pregunta: "¿Cómo borro la línea 0 en un fade?", respuesta: "Abrí la máquina al siguiente punto, usá movimientos en C y no repitas mucho en la misma zona." }
      ]
    },
    {
      titulo: "⚠ Soporte y Accesos",
      preguntas: [
        { pregunta: "¿Qué hacer si no puedo ver los videos?", respuesta: "Verificá tu conexión y escribí a soporte si el problema persiste." },
        { pregunta: "¿Cómo recupero mi acceso si lo perdí?", respuesta: "Podés solicitar reenvío desde la página de inicio o escribiendo a soporte." }
      ]
    }
  ];

  const togglePregunta = (id) => {
    setAbiertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  

  const toggleProfile = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const phoneNumber = "+59891640623";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, tengo una consulta!.")}`;

  return (
    <>
      <Navbar
        toggleProfile={toggleProfile}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      
 <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-full shadow z-50 flex items-center gap-2 font-bold text-sm">
          <img src="https://i.ibb.co/xKKJDBCS/d62368f7-f3e3-48ce-84cd-04a00024000e.png" alt="Soporte" className="w-6 h-6 rounded-lg" /> Soporte
        </a>
      {/* Imagen con degradado y encabezado */}
      <div className="relative w-full md:h-[30vh] h-[50vh]">
        <img
          src="https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg"
          alt="Fondo Barbería"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
     
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <img src="https://i.ibb.co/TqkLrN2p/soporte2.png" className="md:h-[300px] md:mt-[2%]" alt="" />
          <h1 className="text-4xl md:text-5xl -mt-20  font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-200 drop-shadow-lg tracking-wide">
            Preguntas Frecuentes
          </h1>
        </div>
      </div>

      {/* Preguntas */}
      <div className="min-h-screen bg-black text-white md:pt-10 px-6 md:px-16">
        {secciones.map((seccion, i) => (
          <div key={i} className="mb-10">
            <h2 className="p-5 text-3xl md:text-3xl font-bold text-center mb-6 text-transparent bg-gradient-to-b from-gray-400 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide">
              {seccion.titulo}
            </h2>

            <div className="space-y-3">
              {seccion.preguntas.map((q, idx) => {
                const id = `${i}-${idx}`;
                const abierta = abiertas[id];

                return (
                  <div key={id} className="border border-zinc-700 rounded-xl p-4 bg-zinc-800">
                    <button
                      className="w-full flex items-center justify-between text-left font-bold text-transparent bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide"
                      onClick={() => togglePregunta(id)}
                    >
                      {q.pregunta}
                      <motion.div
                        animate={{ rotate: abierta ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-white" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {abierta && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 text-zinc-300 text-sm leading-relaxed overflow-hidden"
                        >
                          {q.respuesta}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreguntasFrecuentes;
