"use client"

import { useState } from "react"

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const name = "Legends Barber Shop"
  const logo = "https://i.ibb.co/SXbs5bQL/PNG.png"
  const fileId = "1S5PKdH2lAdgEWF_y0h8RrQ1_hqhE9by4"
  const fileUrl = `https://drive.google.com/file/d/${fileId}/preview`

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-black bg-opacity-80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
          {/* Logo */}
          <h1 className="text-xl font-bold text-yellow-500">{name}</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#servicios">Servicios</a>
            </li>
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#resultados">Resultados</a>
            </li>
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#location">Ubicación</a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-yellow-500 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-black bg-opacity-90 text-center`}>
          <ul className="space-y-4 py-4">
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#servicios" onClick={() => setMenuOpen(false)}>
                Servicios
              </a>
            </li>
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#resultados" onClick={() => setMenuOpen(false)}>
                Resultados
              </a>
            </li>
            <li className="hover:text-yellow-500 transition-colors cursor-pointer">
              <a href="#location" onClick={() => setMenuOpen(false)}>
                Ubicación
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* MAIN/HERO Section */}
      <section
        id="home"
        className="w-full h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 relative"
      >
        {/* Full-width background image */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('https://i.ibb.co/mCZ0mbgy/d583717c-8025-43ae-b960-feda45d2bb1d.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
        </div>

        {/* Text Section */}
        <div className="z-10 backdrop-blur-sm bg-gradient-to-r from-black/70 to-black/30 p-8 rounded-lg w-full md:w-1/2 text-center flex flex-col justify-center items-center">
          <h2
            className="text-5xl md:text-7xl font-bold text-yellow-500 inline-block px-4 py-2 
                shadow-lg tracking-wide uppercase"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            {name}
          </h2>

          <p
            className="text-white text-3xl md:text-5xl mt-4"
            style={{
              textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            Descubrí tu mejor versión.
          </p>

          <p
            className="text-white mt-6 text-lg md:text-2xl"
            style={{
              textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            Bienvenido a la web oficial de {name}. Guardate un turno para tener el mejor look.
          </p>

          <div className="flex items-center justify-center mt-8">
            <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              Agenda tu turno
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="z-10 w-full md:w-1/2 flex justify-center items-center mt-5 md:mb-0 md:mt-0">
          <img
            src={logo || "/placeholder.svg"}
            alt="Barber Logo"
            className="w-[15rem] md:w-[20rem] h-auto drop-shadow-2xl"
          />
        </div>
      </section>

      <div className="w-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/3Z6iaXyzYDQ"
          className="w-full h-full border rounded-lg"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      {/* Products Section */}
      <section id="servicios" className="w-full max-w-6xl mx-auto py-20 px-4">
        <div className="relative mb-16 text-center">
          <h2
            className="bg-yellow-500 text-5xl font-bold text-center text-white rounded-sm inline-block px-6 py-2"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            Servicios
          </h2>
          {/* Línea amarilla debajo del texto */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-2 bg-yellow-500 mt-2 w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Haircuts */}
          <div className="backdrop-blur-sm bg-black/40 p-8 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-yellow-500/20">
            <h3 className="text-4xl text-center font-semibold text-yellow-500 mb-6">Corte de Pelo</h3>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://i.pinimg.com/736x/f7/db/3e/f7db3e32869dc4210e1f147bc4ba9865.jpg"
                alt="Haircuts"
                className="transition-transform duration-500 transform hover:scale-105 rounded-lg w-full h-64 object-cover"
              />
              <p className="absolute bottom-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                $20
              </p>
            </div>
            <p className="text-gray-300 mt-6 text-lg"></p>
            <ul className="mt-4 space-y-2 text-white">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Corte Clasico
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Cortes con Fade
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span>+ Barba $15
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span>+ Cejas $5
              </li>
            </ul>
          </div>

          {/* Beard Grooming */}
          <div className="backdrop-blur-sm bg-black/40 p-8 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-yellow-500/20">
            <h3 className="text-4xl text-center font-semibold text-yellow-500 mb-6">Barba</h3>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://i.ibb.co/ymKCq0r0/unnamed-1.jpg"
                alt="Beard Grooming"
                className="transition-transform duration-500 transform hover:scale-105 rounded-lg w-full h-64 object-cover"
              />
              <p className="absolute bottom-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                $15
              </p>
            </div>
            <p className="text-gray-300 mt-6 text-lg">Corte de Barba profesional</p>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span>Barba con toalla caliente $20
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span>Corte y barba con toalla caliente $40
            </li>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="w-full max-w-6xl mx-auto py-20 px-4">
        <div className="relative mb-16 text-center">
          <h2
            className="bg-yellow-500 text-5xl font-bold text-center text-white rounded-sm inline-block px-6 py-2"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            Resultados
          </h2>
          {/* Línea amarilla debajo del texto */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-2 bg-yellow-500 mt-2 w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video 1 */}
          <div className="backdrop-blur-sm bg-black/40 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-yellow-500/20">
            <div className="relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/fk_IO2hFnQM"
                title="YouTube Shorts - Corte 1"
                className="w-full aspect-[9/16] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="absolute top-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                Corte #1
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="backdrop-blur-sm bg-black/40 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-yellow-500/20">
            <div className="relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/qnwwSUnQtk8"
                title="YouTube Shorts - Corte 2"
                className="w-full aspect-[9/16] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="absolute top-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                Corte #2
              </p>
            </div>
          </div>

          {/* Video 3 */}
          <div className="backdrop-blur-sm bg-black/40 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-yellow-500/20">
            <div className="relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/rtdgc_Kfsco"
                title="YouTube Shorts - Corte 3"
                className="w-full aspect-[9/16] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="absolute top-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                Corte #3
              </p>
            </div>
          </div>
        </div>

        {/* Segunda fila de videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Video 4 */}
          <div className="backdrop-blur-sm bg-black/40 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-yellow-500/20">
            <div className="relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/9slNt92Ehwk"
                title="YouTube Shorts - Corte 4"
                className="w-full aspect-[9/16] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="absolute top-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                Corte #4
              </p>
            </div>
          </div>

          {/* Video 5 */}
          <div className="backdrop-blur-sm bg-black/40 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-yellow-500/20">
            <div className="relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/pmxl-wGgnYg"
                title="YouTube Shorts - Corte 5"
                className="w-full aspect-[9/16] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="absolute top-3 right-3 bg-yellow-500 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
                Corte #5
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="w-full py-20 text-center relative">
        {/* Full-width background with no repeat */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/6a/bf/51/6abf516a29ecf450657d31b77fdc0da2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black"></div>
        </div>

        <div className="relative z-10 px-4 max-w-7xl mx-auto">
          <h2
            className="text-5xl font-bold text-yellow-500 mb-16"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            Ubicación
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-y-10 md:gap-x-16">
            {/* Horarios de atención */}
            <div className="backdrop-blur-md w-full md:w-1/3 flex flex-col items-center bg-black/50 p-8 rounded-lg shadow-2xl border border-yellow-500/20">
              <img src={logo || "/placeholder.svg"} alt="Barbershop" className="w-32 h-32 mb-6 drop-shadow-lg" />
              <h3 className="text-3xl font-semibold text-yellow-500 mb-6">Horarios</h3>
              <ul className="text-gray-200 text-lg space-y-4 w-full">
                <li className="border-b border-yellow-500/20 pb-2">
                  <span className="font-medium">Lunes a Viernes:</span>
                  <br />
                  9:30 - 14:00 / 16:00 - 20:00
                </li>
                <li className="border-b border-yellow-500/20 pb-2">
                  <span className="font-medium">Sábados:</span>
                  <br />
                  9:30 - 14:00 / 15:30 - 18:00
                </li>
                <li>
                  <span className="font-medium">Domingo:</span> Cerrado
                </li>
              </ul>
              <p className="text-gray-300 mt-8 italic">
                ¡Ven y disfruta de una experiencia única con nuestros servicios personalizados!
              </p>
              <div className="flex items-center justify-center mt-8">
                <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  Agenda tu turno
                </button>
              </div>
            </div>

            {/* Mapa */}
            <div className="w-full md:w-1/2 h-[450px] rounded-lg overflow-hidden shadow-2xl border border-yellow-500/20">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.864646859431!2d-1.9880634138140343!3d43.31709279665522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a556aabf443d%3A0x38dd412547824208!2zQy8gZGUgU2FuIE1hcnTDrW4sIDM2LCAyMDAwNSBTYW4gU2ViYXN0acOhbiwgR3VpcMO6emNvYSwgRXNwYcOxYQ!5e0!3m2!1ses-419!2sar!4v1740692606783!5m2!1ses-419!2sar"
                loading="lazy"
                title="Ubicación de la barbería"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black py-8 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src={logo || "/placeholder.svg"} alt="Legends Barber Shop Logo" className="w-20 h-20 mx-auto mb-4" />
          <p className="text-gray-400">
            © {new Date().getFullYear()} {name}. Todos los derechos reservados.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
       
            <a href="https://instagram.com/Salvador_dosantos" className="text-gray-400 hover:text-yellow-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm6.538-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
           
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

