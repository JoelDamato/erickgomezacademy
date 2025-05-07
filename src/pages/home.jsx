"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X, CircleUserRound } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function BarberAcademy() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard");
    }
  }, [navigate]);
  

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
      <div className="relative min-h-screen bg-gradient-to-r from-black/30 via-transparent to-white/10">
        {/* Background Image */}
        <div className="absolute inset-0 " />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Navigation Bar */}
       <Navbar/>

          {/* Header Section */}
          <header className="p-5 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
            <div className="mb-6 h-[180px]">
          
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
         

           
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
