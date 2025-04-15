"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

const API_BASE_URL = import.meta.env.PROD ? "https://back-cursos.onrender.com" : "http://localhost:5000"

export default function BarberAcademy() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0)

  const courseImages = [
    "https://i.ibb.co/cSNDmbZF/Tarjeta-Master-Fade.png",
    "https://i.ibb.co/8D8162hD/Tarjeta-Cutting-Mastery.png",
    "https://i.ibb.co/CK6Qv1gr/Tarjeta-Growth-Barber-1.png",
  ]

  const courseNames = [
   
    "Master Fade",
    "Cutting Mastery",
    "Growth Barber",
  ]

  const courseRatings = [
    { score: 4.8, count: 3882 },
    { score: 4.9, count: 3782 },
    { score: 4.8, count: 3560 },
  ]

  const phoneNumber = "+59891640623" // Reemplaza con tu número de WhatsApp

  const getWhatsAppLink = (index) => {
    const message = `Hola, estoy interesado en el curso "${courseNames[index]}". ¿Podrías darme más información?`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }
  const handleClick = async (index) => {
    try {
      await fetch(`${API_BASE_URL}/api/clicks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proyecto: "Youtube",
          curso: courseNames[index],
          fecha: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Error al registrar click:", error)
    }

    window.location.href = getWhatsAppLink(index)

  }

  const openModal = (index) => {
    setSelectedCourseIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        {/* Background Image */}
        <div className="absolute inset-0" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Header Section */}
          <header className="px-6 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
            <div className="mb-6">
              <img src="/erickgomez.png" alt="Erick Gomez Academy" className="w-[180px]" />
            </div>

            <div className="flex md:flex-row gap-8 z-10">
              <div className="md:w-2/3">
                <h1 className="relative text-3xl font-bold mb-2 z-10">Mis Formaciones</h1>
                <p className="relative text-lg text-gray-300 z-10">
                  Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tu tus redes con Erick, este
                  año tienes la oportunidad de hacerlo 100% online sin importar de donde seas.
                </p>
              </div>

              <img
                src="https://i.ibb.co/4g1JHSQ3/14b2d988-8d6c-43f4-8568-e8e9634c316b.png"
                className="absolute top-[80px] right-0 w-3/4 z-0 md:w-1/2"
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
              Hoy puedes ser parte de la comunidad que educa día a día a más de 7000 barberos de distintas partes del
              mundo <br />
            </p>

            <div className="border-b border-[#D4AF37] mt-5" />
          </header>

          {/* Courses Section */}
          <section className="px-1 py-1">
            <h2 className="text-md font-bold text-center mb-1">COMO INSCRIBIRTE A LA ACADEMIA ONLINE:</h2>

            <div className="flex justify-center items-center w-full">
              <img src="https://i.ibb.co/v6XQcg8g/Pasos.png" className="w-full md:w-1/2" alt="" />
            </div>

            {/* Vertical Course Cards */}
            <div className="px-4 py-6 flex flex-col items-center space-y-6">
              {courseImages.map((image, index) => (
                <div key={index} className="w-full max-w-md cursor-pointer" onClick={() => openModal(index)}>
                  <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Curso ${courseNames[index]}`}
                        className="w-full object-contain rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-center">{courseNames[index]}</h3>

                      <div className="flex items-center justify-center mt-2">
                        <span className="mr-2 font-bold">{courseRatings[index].score}</span>
                        <div className="flex text-[#D4AF37]">
                          <span>★★★★★</span>
                        </div>
                        <span className="ml-2 text-sm font-bold">
                          {courseRatings[index].count.toLocaleString()} calificaciones
                        </span>
                      </div>

                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation() // Prevent modal from opening
                          handleClick(index)
                        }}
                        className="w-full text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center"
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
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
                        Obtener vía WhatsApp
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black border-2 border-yellow-500 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-white mb-4">{courseNames[selectedCourseIndex]}</h2>

              <img
                src={courseImages[selectedCourseIndex] || "/placeholder.svg"}
                alt={courseNames[selectedCourseIndex]}
                className="w-full max-h-[60vh] object-contain mb-1"
              />

              <div className="flex items-center justify-center mb-4">
                <span className="mr-2 font-bold text-white">{courseRatings[selectedCourseIndex].score}</span>
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
                <span className="ml-2 text-md font-bold text-white">
                  {courseRatings[selectedCourseIndex].count.toLocaleString()} calificaciones
                </span>
              </div>

              <motion.button
                onClick={() => handleClick(selectedCourseIndex)}
                className="w-full text-center max-w-md bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center p-5"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                Obtener entrenamiento vía WhatsApp
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
