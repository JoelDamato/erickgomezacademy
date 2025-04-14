import { motion } from "framer-motion";
import React from "react";

interface ButtonWppProps {
  inx: number;
  width?: string;
}

export default function ButtonWpp3({ inx, width = "80%" }: ButtonWppProps) {
  const phoneNumber = "+59891640623";

  const courseNames = [
    "Growth Barber",
    "Master Fade",
    "Cutting Mastery",
    "Colorimetría",
    "Barber Cash",
    "Agendas Ilimitadas",
    "Focus",
  ];

  // 🔁 URL del backend según entorno
  const API_BASE_URL = import.meta.env.PROD
  ? "https://back-cursos.onrender.com"
  : "http://localhost:5000";


  const getWhatsAppLink = (inx: number) => {
    const message = `Hola, estoy interesado en el curso "${courseNames[inx]}". ¿Podrías darme más información?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleClick = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/clicks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proyecto: "instagram",
          curso: courseNames[inx],
          fecha: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error al registrar click:", error);
    }

    window.open(getWhatsAppLink(inx), "_blank");
  };

  return (
    <div className="flex justify-center w-full">
      <div className={`w-[${width}]`}>
        <motion.button
          onClick={handleClick}
          className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex items-center justify-center gap-2">
            <img src="/phone.svg" className="h-8 w-8" alt="WhatsApp icon" />
            <p>Obtener entrenamiento vía WhatsApp</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
