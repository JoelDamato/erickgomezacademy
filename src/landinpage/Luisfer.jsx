import React, { useState } from "react";

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center  text-white">

  {/* Navbar */}
<nav className="w-full fixed top-0 bg-black bg-opacity-80 backdrop-blur-md z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
    {/* Logo */}
    <h1 className="text-xl font-bold font-bold tracking-wide uppercase
  bg-gradient-to-b from-purple-600 via-purple-400 to-purple-100
  text-transparent bg-clip-text"
  style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.7)' }}>LUISFER</h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex space-x-6">
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#servicios">Servicios</a></li>
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#resultados">Resultados</a></li>
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#location">Ubicación</a></li>
    </ul>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button
        className="text-yellow-500 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-black bg-opacity-90 text-center`}>
    <ul className="space-y-4 py-4">
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#resultados" onClick={() => setMenuOpen(false)}>Resultados</a></li>
      <li className="hover:text-yellow-500 cursor-pointer"><a href="#location" onClick={() => setMenuOpen(false)}>Ubicación</a></li>
    </ul>
  </div>
</nav>
{/* Navbar */}



    {/* MAIN */}
<section
  id="home"
  className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full h-screen mt-2 md:mt-10 px-4"
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)), 
                 url('https://i.ibb.co/DP9kpmfX/707f1b54-e4f3-45e2-a418-06bdc00a4ddc.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Text Section */}
<div className="backdrop-blur-sm bg-gradient-to-r from-black/70 to-black/10 p-5 w-full md:w-1/2 text-center flex flex-col justify-center items-center ">
<h2
  className="text-5xl md:text-7xl font-bold tracking-wide uppercase
  text-purple-800
  text-transparent bg-clip-text"
  style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.7)' }}
>
  THE BARBER'S SHOP
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
      Bienvenido a la web oficial de THE BARBER'S SHOP. Guardate un turno para tener el mejor look.
    </p>

    <div className="flex items-center justify-center mt-8">
  <button className="flex items-center gap-2 
  bg-gradient-to-r from-black via-purple-800 to-black text-white 
  px-6 py-3 font-semibold rounded-lg 
  transition-all duration-300 ease-in-out 
  shadow-md hover:shadow-xl 
  hover:bg-gradient-to-r hover:from-purple-700 hover:via-purple-500 hover:to-purple-700 
  hover:scale-105">
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
  <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mb-0 md:mt-0">
    <img
      src="https://i.ibb.co/8DYffsyN/556571cf-fbc0-4e6f-92d4-f3c01f054e26.jpg"
      alt="Barber"
      className="w-[15rem] md:w-[20rem] h-auto"
    />
  </div>
</section>
{/* MAIN */}




    {/* Products Section */}
<section id="servicios" className=" w-full max-w-6xl  py-16 px-4">
<div className="relative mb-12">
  <h2
    className="bg-purple-800 text-5xl font-bold text-center text-white rounded-sm inline-block px-4 py-2"
    style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }}
  >
    Servicios
  </h2>
  {/* Línea amarilla debajo del texto */}
  <div className="absolute left-0 right-0 top-full h-2 bg-purple-800 mt-2"></div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Haircuts */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-purple-800 mb-4">Haircuts</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/f7/db/3e/f7db3e32869dc4210e1f147bc4ba9865.jpg"
          alt="Haircuts"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $30
        </p>
      </div>
      <p className="text-gray-400 mt-4">Classic and modern haircuts for every style.</p>
      <ul className="mt-4 space-y-2 text-white">
        <li>- Classic Cut</li>
        <li>- Fade Cut</li>
        <li>- Scissor Cut</li>
      </ul>
    </div>

    {/* Beard Grooming */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-purple-800 mb-4">Beard Grooming</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/66/96/ae/6696aef09abc4265e01dfe227fd0de4e.jpg"
          alt="Beard Grooming"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $20
        </p>
      </div>
      <p className="text-gray-400 mt-4">Professional beard trimming and styling.</p>
      <ul className="mt-4 space-y-2 text-white">
        <li>- Beard Trim</li>
        <li>- Hot Towel Shave</li>
        <li>- Beard Styling</li>
      </ul>
    </div>
  </div>
</section>


{/* Results Section */}
<section id="resultados" className="w-full max-w-6xl mx-auto py-16 px-4">
<div className="relative mb-12">
  <h2
    className="bg-purple-800 text-5xl font-bold text-center text-white rounded-sm inline-block px-4 py-2"
    style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }}
  >
    Resultados
  </h2>
  {/* Línea amarilla debajo del texto */}
  <div className="absolute left-0 right-0 top-full h-2 bg-purple-800 mt-2"></div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Resultado 1 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/e0/6e/6a/e06e6a09b9c8f1df6e2567e2f56c9f5c.jpg"
          alt="Resultado 1"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #1
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Moderno y elegante para destacar.</p>
    </div>

    {/* Resultado 2 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/dd/19/68/dd1968a0365947ea669bf4f7a8a86145.jpg"
          alt="Resultado 2"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #2
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Perfecto para un estilo profesional.</p>
    </div>

    {/* Resultado 3 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/73/b0/52/73b0528e014c9b3264c72b49a66200fa.jpg"
          alt="Resultado 3"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #3
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Clásico con un toque contemporáneo.</p>
    </div>
  </div>
</section>





  {/* Location Section */}


  <section
  id="location"
  className="w-full py-16 text-center mx-auto px-4"
  style={{
    background: `
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 100%), 
      url('https://i.pinimg.com/736x/6a/bf/51/6abf516a29ecf450657d31b77fdc0da2.jpg')`,
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  }}
>

  <h2 className="text-5xl font-bold text-purple-800 mb-12"     style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }} >Ubicación</h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-y-8 md:gap-x-10">
    {/* Horarios de atención */}
    <div className="backdrop-blur-sm w-full md:w-1/3 flex flex-col items-center bg-black/30 p-6 rounded-lg shadow-lg">
      <img
        src="https://i.ibb.co/8DYffsyN/556571cf-fbc0-4e6f-92d4-f3c01f054e26.jpg"
        alt="Barbershop"
        className="w-32 h-32 rounded-full shadow-lg mb-4 bg-cover"
      />
      <h3 className="text-3xl font-semibold text-purple-800 mb-4">Horarios</h3>
      <ul className="text-gray-300 text-lg space-y-2">
        <li>Lunes a Viernes: 9:00 AM - 8:00 PM</li>
        <li>Sábado: 10:00 AM - 6:00 PM</li>
        <li>Domingo: Cerrado</li>
      </ul>
      <p className="text-gray-400 mt-6">
        ¡Ven y disfruta de una experiencia única con nuestros servicios
        personalizados!
      </p>
      <div className="flex items-center justify-center mt-8">
  <button className="flex items-center gap-2 bg-purple-800 text-black px-6 py-3 font-semibold rounded-lg hover:bg-purple-600 transition shadow-lg">
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
    <a href="680702836">
    Agenda tu turno
    </a>

  </button>
</div>

    </div>

    {/* Mapa */}
    <div className="w-full md:w-1/3 h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093744!2d144.95373631531668!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f6f06691%3A0x9f045e7a9ec546e8!2sBarber%20Shop!5e0!3m2!1sen!2sus!4v1638394296555!5m2!1sen!2sus"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>


    </div>
  );
};

export default LandingPage;