"use client"
import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function BarberAcademy() {
  const comboCourses = [
    {
      name: "Master Fade",
      image: "/Tarjeta-Master-Fade.webp",
      rating: { score: 4.8, count: 3882 },
    },
    {
      name: "Cutting Mastery",
      image: "/Tarjeta-Cutting-Mastery.webp",
      rating: { score: 4.9, count: 3782 },
    },
  ]

  const growthCourse = {
    name: "Growth Barber",
    image: "/Tarjeta-Growth-Barber-1.png",
    rating: { score: 4.8, count: 3560 },
  }

  const [currentComboIndex, setCurrentComboIndex] = useState(0)

  useEffect(() => {
    AOS.init({ duration: 700 })
    const interval = setInterval(() => {
      setCurrentComboIndex((prev) => (prev + 1) % comboCourses.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div data-aos="fade-in" className="min-h-screen bg-black text-white relative">
      {/* HEADER */}
      <header
className="bg-cover bg-center bg-no-repeat min-h-[200px] md:min-h-[350px] relative"
style={{ backgroundImage: "url('https://i.ibb.co/jk0MLcD8/fondo.png')" }}
      >
        <div className="px-6 pb-8 backdrop-brightness-50">
          <img src="/erickgomez.png" alt="Erick Gomez Academy" className="w-[180px] mb-6" loading="lazy" />

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="md:w-2/3" data-aos="fade-up">
              <h1 className="text-3xl font-bold mb-2">Mis Formaciones</h1>
              <p className="text-lg text-gray-300">
                Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tus redes con Erick, este año
                tenés la oportunidad de hacerlo 100% online sin importar de dónde seas.
              </p>
            </div>

            <img
  src="https://i.ibb.co/4g1JHSQ3/14b2d988-8d6c-43f4-8568-e8e9634c316b.png"
  className="absolute top-[-100px] right-[-20px] w-[200px] md:w-1/2 opacity-40 md:opacity-100 pointer-events-none"
  alt=""
  loading="lazy"
/>

          </div>

          <div className="mt-8">
            <img
              src="https://i.ibb.co/L7xrzRz/Social-proof-banner.png"
              alt="Social proof"
              className="w-full h-[180px] object-cover md:w-1/2 mx-auto rounded-lg shadow"
              loading="lazy"
            />
          </div>

          <p className="text-center text-sm mt-6">
            Hoy podés ser parte de la comunidad que educa día a día a más de 7000 barberos de todo el mundo.
          </p>

          <div className="border-b border-[#D4AF37] mt-5" />
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-8 flex flex-col items-center space-y-8">
        <h2 className="text-md font-bold text-center">CÓMO INSCRIBIRTE A LA ACADEMIA ONLINE:</h2>

        <img
          src="https://i.ibb.co/v6XQcg8g/Pasos.png"
          className="w-full md:w-1/2 rounded shadow"
          alt="Pasos"
          loading="lazy"
          data-aos="zoom-in"
        />

        {/* COMBO COURSE SLIDER */}
        <a
          href="https://wa.me/59891640623?text=Hola,%20quiero%20obtener%20la%20promo%20de%20hoy%20del%20combo,%20me%20env%C3%ADas%20los%20valores%20y%20info%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-md block"
        >
          <div
            className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-transform hover:scale-[1.01]"
            data-aos="fade-up"
          >
            <img
              src={comboCourses[currentComboIndex].image}
              alt={comboCourses[currentComboIndex].name}
              className="w-full object-contain rounded-lg shadow-lg"
              loading="lazy"
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

            <div className="text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold">
              Obtener entrenamiento vía WhatsApp
            </div>
          </div>
        </a>

        {/* GROWTH COURSE */}
        <a
          href="https://wa.me/59891640623?text=Hola,%20me%20env%C3%ADas%20m%C3%A1s%20info%3F%20quiero%20aprender%20a%20atraer%20m%C3%A1s%20clientes%20y%20crecer%20mis%20redes"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-md block"
        >
          <div
            className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-500 transition-transform hover:scale-[1.01]"
            data-aos="fade-up"
          >
            <img
              src={growthCourse.image}
              alt={growthCourse.name}
              className="w-full object-contain rounded-lg shadow-lg"
              loading="lazy"
            />

            <h3 className="text-xl font-bold text-center mt-4">{growthCourse.name}</h3>

            <div className="flex items-center justify-center mt-2">
              <span className="mr-2 font-bold">{growthCourse.rating.score}</span>
              <div className="flex text-[#D4AF37]">★★★★★</div>
              <span className="ml-2 text-sm font-bold">
                {growthCourse.rating.count.toLocaleString()} calificaciones
              </span>
            </div>

            <div className="text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold">
              Obtener entrenamiento vía WhatsApp
            </div>
          </div>
        </a>
      </main>

    
    
    </div>
  )
}
