"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BarberAcademy() {

  const comboCourses = [
    {
      name: "Master Fade",
      image: "https://i.ibb.co/cSNDmbZF/Tarjeta-Master-Fade.png",
      rating: { score: 4.8, count: 3882 },
    },
    {
      name: "Cutting Mastery",
      image: "https://i.ibb.co/8D8162hD/Tarjeta-Cutting-Mastery.png",
      rating: { score: 4.9, count: 3782 },
    },
  ]

  const growthCourse = {
    name: "Growth Barber",
    image: "https://i.ibb.co/CK6Qv1gr/Tarjeta-Growth-Barber-1.png",
    rating: { score: 4.8, count: 3560 },
  }

  const [currentComboIndex, setCurrentComboIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComboIndex((prevIndex) => (prevIndex + 1) % comboCourses.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        <div className="relative z-10 text-white">
          <header className="px-6 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
            <div className="mb-6">
              <img src="/erickgomez.png" alt="Erick Gomez Academy" className="w-[180px]" />
            </div>

            <div className="flex md:flex-row gap-8 z-10">
              <div className="md:w-2/3">
                <h1 className="relative text-3xl font-bold mb-2 z-10">Mis Formaciones</h1>
                <p className="relative text-lg text-gray-300 z-10">
                  Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tus redes con Erick, este año
                  tienes la oportunidad de hacerlo 100% online sin importar de donde seas.
                </p>
              </div>

              <img
                src="https://i.ibb.co/4g1JHSQ3/14b2d988-8d6c-43f4-8568-e8e9634c316b.png"
                className="absolute top-[80px] right-0 w-3/4 z-0 md:w-1/2"
                alt=""
              />
            </div>

            <div className="mt-8">
              <img
                src="https://i.ibb.co/L7xrzRz/Social-proof-banner.png"
                alt="Social proof banner"
                className="w-full h-auto object-cover md:w-1/2 mx-auto"
              />
            </div>

            <p className="text-center text-sm mt-6">
              Hoy puedes ser parte de la comunidad que educa día a día a más de 7000 barberos de distintas partes del
              mundo
            </p>

            <div className="border-b border-[#D4AF37] mt-5" />
          </header>

          <section className="px-4 py-8 flex flex-col items-center space-y-8">
            <h2 className="text-md font-bold text-center">COMO INSCRIBIRTE A LA ACADEMIA ONLINE:</h2>

            <img src="https://i.ibb.co/v6XQcg8g/Pasos.png" className="w-full md:w-1/2" alt="" />

            {/* Slider Card Combo */}
            <a
              href="https://bit.ly/MasterCutting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md block"
            >
              <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:scale-[1.01]">
                <motion.div
                  key={currentComboIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={comboCourses[currentComboIndex].image}
                    alt={comboCourses[currentComboIndex].name}
                    className="w-full rounded-lg shadow-lg"
                  />

                  <h3 className="text-xl font-bold text-center mt-4">
                    {comboCourses[currentComboIndex].name}
                  </h3>

                  <div className="flex items-center justify-center mt-2">
                    <span className="mr-2 font-bold">{comboCourses[currentComboIndex].rating.score}</span>
                    <div className="flex text-[#D4AF37]">★★★★★</div>
                    <span className="ml-2 text-sm font-bold">
                      {comboCourses[currentComboIndex].rating.count.toLocaleString()} calificaciones
                    </span>
                  </div>

                  <motion.div
                    className="text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                     Obtener entrenamiento vía WhatsApp
                  </motion.div>
                </motion.div>
              </div>
            </a>

            {/* Growth Barber */}
            <a
              href="https://bit.ly/growht90"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md block"
            >
              <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:scale-[1.01]">
                <img
                  src={growthCourse.image}
                  alt={growthCourse.name}
                  className="w-full rounded-lg shadow-lg"
                />

                <h3 className="text-xl font-bold text-center mt-4">{growthCourse.name}</h3>

                <div className="flex items-center justify-center mt-2">
                  <span className="mr-2 font-bold">{growthCourse.rating.score}</span>
                  <div className="flex text-[#D4AF37]">★★★★★</div>
                  <span className="ml-2 text-sm font-bold">
                    {growthCourse.rating.count.toLocaleString()} calificaciones
                  </span>
                </div>

                <motion.div
                  className="text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  Obtener entrenamiento vía WhatsApp
                </motion.div>
              </div>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
