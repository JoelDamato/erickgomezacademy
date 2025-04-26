"use client"

import { useState, useEffect } from "react"

function Carrusel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Datos del carrusel con URLs corregidas
  const faqItems = [
    {
      id: 1,
      image: "https://i.ibb.co/5WDMSQb3/1-FAQ.png",
      alt: "¿Por que vale la pena invertir en este entrenamiento?",
    },
    {
      id: 2,
      image: "https://i.ibb.co/CKz3DwCR/2-FAQ.png",
      alt: "¿Que contiene el entrenamiento Master Fade 3.0?",
    },
    {
      id: 3,
      image: "https://i.ibb.co/rX08qpk/3-FAQ.png",
      alt: "¿Puedo inscribirme desde cualquier país?",
    },
    {
      id: 4,
      image: "https://i.ibb.co/Dfm1Tnxy/4-FAQ.png",
      alt: "¿El entrenamiento incluye acompañamiento?",
    },
    {
      id: 5,
      image: "https://i.ibb.co/q2Zm1F5/5-FAQ.png",
      alt: "¿El entrenamiento está disponible en otros idiomas además del español?",
    },
  ]

  // Funciones de navegación mejoradas con manejo de transición
  const scrollPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev === 0 ? faqItems.length - 1 : prev - 1))
  }

  const scrollNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev === faqItems.length - 1 ? 0 : prev + 1))
  }

  // Resetear el estado de transición después de que termine
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Debe coincidir con la duración de la transición CSS

    return () => clearTimeout(timer)
  }, [current])

  // Iconos de flechas (inline SVG)
  const ChevronLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )

  const ChevronRight = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )

  // Calcular qué índices deben mostrarse
  const getPrevIndex = () => (current === 0 ? faqItems.length - 1 : current - 1)
  const getNextIndex = () => (current === faqItems.length - 1 ? 0 : current + 1)

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="relative w-full">
        <div className="overflow-hidden w-full">
          <div className="flex justify-center items-center relative h-full py-5">
            {/* Slide anterior (izquierda) */}
            <div
              className={`absolute left-0 w-[60%] px-2 transition-all duration-300 ease-in-out opacity-50 scale-90 z-10 ${
                isTransitioning ? "transition-opacity transition-transform" : ""
              }`}
            >
              <img
                src={faqItems[getPrevIndex()].image || "/placeholder.svg"}
                alt={faqItems[getPrevIndex()].alt}
                className="w-full h-auto rounded-xl block"
              />
            </div>

            {/* Slide actual (centro) */}
            <div
              className={`w-[60%] px-2 transition-all duration-300 ease-in-out opacity-100 scale-100 z-20 ${
                isTransitioning ? "transition-opacity transition-transform" : ""
              }`}
            >
              <img
                src={faqItems[current].image || "/placeholder.svg"}
                alt={faqItems[current].alt}
                className="w-full h-auto rounded-xl block"
              />
            </div>

            {/* Slide siguiente (derecha) */}
            <div
              className={`absolute right-0 w-[60%] px-2 transition-all duration-300 ease-in-out opacity-50 scale-90 z-10 ${
                isTransitioning ? "transition-opacity transition-transform" : ""
              }`}
            >
              <img
                src={faqItems[getNextIndex()].image || "/placeholder.svg"}
                alt={faqItems[getNextIndex()].alt}
                className="w-full h-auto rounded-xl block"
              />
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 border-none rounded-full p-2 cursor-pointer transition-colors flex items-center justify-center text-white w-10 h-10"
          aria-label="Anterior"
          disabled={isTransitioning}
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 border-none rounded-full p-2 cursor-pointer transition-colors flex items-center justify-center text-white w-10 h-10"
          aria-label="Siguiente"
          disabled={isTransitioning}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Carrusel
