"use client"

import { useEffect, useState } from "react"

export default function StickyBottomBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    const handleScroll = () => {
      const triggerPoint = document.getElementById("hide-section")
      const triggerOffset = triggerPoint ? triggerPoint.offsetTop : Number.POSITIVE_INFINITY

      if (isMobile) {
        setIsVisible(window.scrollY > 250)
      } else {
        setIsVisible(window.scrollY > window.innerHeight && window.scrollY < triggerOffset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const phoneNumber = "+59891640623"
  const getWhatsAppLink = () => {
    const message = "Hola, quiero inscribirme al entrenamiento Nivel 1 Master Fade 3.0, me puedes ayudar?"
    return `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`
  }

  const handleClick = () => {
    // 👉 Evento para el pixel de Meta
    if (typeof fbq !== "undefined") {
      fbq("trackCustom", "ClickStickyWhatsapp")
    }

    // Abrir WhatsApp en nueva pestaña
    window.open(getWhatsAppLink(), "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="z-[99999] pointer-events-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white  shadow-lg w-full max-w-md text-center">
      <p className="text-lg pb-1">Inscribite vía Whatsapp Ahora</p>
      <button
        onClick={handleClick}
        className="flex justify-center items-center gap-2 bg-gradient-to-r from-black via-[#013557] to-black text-white text-md md:text-2xl font-medium py-4 px-8 rounded-lg w-full transition-all duration-300 hover:scale-105"
      >
        Quiero inscribirme al entrenamiento
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </button>
      <p className="text-sm mt-1">
        Serás atendido por mi equipo y te ayudarán a inscribirte sin importar de qué país seas
      </p>
    </div>
  )
}
