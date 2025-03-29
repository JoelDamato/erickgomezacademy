"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/cursosonline/Header";
import Carrusel from "../components/cursosonline/Carrusel";
import Steps from "../components/cursosonline/Steps";

export default function BarberAcademy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        <div className="absolute inset-0" />
        <div className="absolute inset-0" />
        <div className="relative z-10 text-white">
          <Header />
          <Steps />
        
          <Carrusel />
        </div>
      </div>
    </div>
  );
}
