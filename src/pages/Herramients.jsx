import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from '../components/Navbar';

const Herramientas = () => {


  const phoneNumber = "+59891640623";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, tengo una consulta!.")}`;

  return (
    <>
      <Navbar
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
        <h1 className="text-4xl md:text-6xl -mt-20 font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-lg tracking-widest uppercase">
  Coming soon...
</h1>

        </div>
      </div>
      
    </>
  );
};

export default Herramientas;
