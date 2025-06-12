import Carrusel from "./components/Carrusel";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const phoneNumber = "+59891640623"; // Tu número de WhatsApp

const getWhatsAppLink = () => {
  const message = "Hola, ya completé el formulario, me interesa lo que vi del nuevo sistema eduactivo. ¿Cómo hago para empezar antes de que se cierren las inscripciones?";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function MasterFadeFAQ() {
  return (
    <>
      <div className="w-full max-w-5xl mt-8">
        <div className="relative">
          <div className="bg-gradient-to-b from-[#051a2e] to-[#1d8dce] py-1 rounded-sm">
            <h2 className="text-center text-white text-xl md:text-2xl font-bebas">
              SI DUDAS EN INSCRIBIRTE, LEE ESTO...
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <Carrusel />
        </div>

        <div className="max-w-3xl w-full mt-20 md:px-0">
          <div className="relative flex flex-col items-center">
            <div className="w-full">
              <img
                src="https://i.ibb.co/W4Z23qNw/barra-completa-s9.webp"
                alt="7 días de garantía"
                className="w-full h-auto"
              />
            </div>

            <div className="h-16"></div>

            <h2 className="text-xl font-bold mb-1 text-center">¿TIENES ALGUNA DUDA?</h2>

<motion.a
  href={getWhatsAppLink()}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
    if (typeof fbq !== "undefined") {
      fbq("trackCustom", "[CTA] [Dudas] [Wspp] [MF3.0]");
    }
  }}
  className="block w-full max-w-lg px-4 mb-12 mx-auto"
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
>
  <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-950 via-blue-500 to-blue-950 text-white text-center py-4 px-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-125">
    <FaWhatsapp className="text-2xl md:text-3xl text-white" />
    <p className="font-bebas uppercase text-lg md:text-2xl leading-tight text-shadow-bebas">
      ¡Hablá con alguien de mi equipo!
    </p>
  </div>
</motion.a>


          </div>
        </div>
      </div>
    </>
  );
}
