"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X, CircleUserRound } from "lucide-react";

export default function BarberAcademy() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);


  const courseImages = [
    "https://i.ibb.co/CK6Qv1gr/Tarjeta-Growth-Barber-1.png",
  ];
  const courseNames = ["Master Fade", "Cutting Mastery", "Growth Barber"];

  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp

  const getWhatsAppLink = (index) => {
    const message = `Hola, quiero ser parte de la academia. ¿Podrías darme más información?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const nextCourse = () => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === courseImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCourse = () => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === 0 ? courseImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        {/* Background Image */}
        <div className="absolute inset-0 " />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Navigation Bar */}
          <nav className="p-4 bg-black flex justify-between items-center">
            {/* Botón de menú hamburguesa */}
            <button className="text-white" >
            <a
                  href="/login"
                  className="w-full text-center py-3 hover:bg-[#8B6914]/50 transition"
                >
               <CircleUserRound size={24} />
               </a>
            </button>

      
          </nav>

          {/* Header Section */}
          <header className="px-6 pt-4 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
            <div className="mb-6">
              <img
                src="/erickgomez.png"
                alt="Erick Gomez Academy"
                className="w-[180px]"
              />
            </div>

            <div className="flex  md:flex-row gap-8 z-10">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2 z-10">
                  Mis Formaciones
                </h1>
                <p className="relative text-lg text-gray-300 z-10">
                  Si estás buscando perfeccionar tus técnicas de cortes y fade o
                  escalar tu tus redes con Erick, este año tienes la oportunidad
                  de hacerlo 100% online sin importar de donde seas.
                </p>
              </div>

              <img
                src="https://i.ibb.co/mVH7LDYv/Erick-fondo.png"
                className="absolute top-[140px] left-[150px] z-0 md:left-[800px]"
                alt=""
              />
              <div className="md:w-1/3 flex justify-center md:justify-end"></div>
            </div>

            {/* Banner Section */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://i.ibb.co/L7xrzRz/Social-proof-banner.png"
                  alt="Social proof banner"
                  className="w-full h-auto object-cover md:w-1/2"
                />
              </div>
            </div>

            <p className="text-center text-sm mt-6">
              Hemos formado a más de 100,000 <br />
              Profesionales a nivel mundial
            </p>

            <div className="border-b border-[#D4AF37] my-4" />
          </header>

          {/* Courses Section */}
          <section className="px-4 py-4">
   

            {/* Course Card */}
            <div className="rounded-xl flex flex-col items-center md:justify-center mt-5 ">
         

           
              <button>
                <a
                  href={getWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 text-white py-3 rounded-md font-bold flex items-center justify-center p-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Quiero ser parte
                </a>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
