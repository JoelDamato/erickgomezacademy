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
  bg-gradient-to-b from-purple-800 via-purple-700 to-purple-600
  text-transparent bg-clip-text"
>LUISFER BARBER SHOP</h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex space-x-6">
      <li className="hover:text-purple-500 cursor-pointer"><a href="#servicios">Servicios</a></li>
      <li className="hover:text-purple-500 cursor-pointer"><a href="#resultados">Resultados</a></li>
      <li className="hover:text-purple-500 cursor-pointer"><a href="#location">Ubicación</a></li>
    </ul>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button
        className="text-purple-500 focus:outline-none"
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
  className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full h-screen mt-2  md:mt-10 px-4"
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)), 
                 url('https://i.ibb.co/q3dLJFcx/ee545694-7943-4c6d-a8b0-921f9eee65a5.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Text Section */}
<div className="backdrop-blur-sm bg-gradient-to-r from-black/70 to-black/10 p-5 w-full md:w-1/2 text-center flex flex-col justify-center items-center ">

<img
      src="https://i.ibb.co/tM57jVNH/7003df5a-3511-4119-b8d0-6d0e024ab44e.png"
      alt="Barber"
      className="w-[10rem] md:w-[25rem] md:hidden h-auto p-5"
    />

    <p
      className="text-white text-3xl md:text-5xl mt-4"
      style={{
        textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
        fontFamily: "'Impact', sans-serif",
      }}
    >
      Detalles que marcan la diferencia.
    </p>

    <p
      className="text-white mt-6 text-lg md:text-2xl"
      style={{
        textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
        fontFamily: "'Impact', sans-serif",
      }}
    >
      Bienvenido a la web oficial de LUISFER. Guarda un espacio para verte mejor que nunca.
    </p>

    <div className="flex items-center justify-center mt-8">
    <a href="https://wa.me/34680702836?text=Hola,%20quiero%20agendar%20un%20turno" target="_blank" rel="noopener noreferrer">

  <button className="flex items-center gap-2 
    text-white 
  px-6 py-3 font-semibold rounded-lg 
  transition-all duration-300 ease-in-out 
shadow-xl 
 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 
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
  </a>
</div>

  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center items-center mt-15 md:mb-0 md:mt-0">
    
  </div>
</section>
{/* MAIN */}




    {/* Products Section */}
<section id="servicios" className=" w-full max-w-6xl mt-15  py-16 px-4">
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
          src="https://i.pinimg.com/736x/66/96/ae/6696aef09abc4265e01dfe227fd0de4e.jpg"
          alt="Haircuts"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $15
        </p>
      </div>
      <p className="text-gray-400 mt-4">Cortes clásicos y modernos para cada estilo.</p>
      <ul className="mt-4 space-y-2 text-white">
        <li>- Corte Clásico</li>
        <li>- Corte Fade</li>
        <li>- Corte con tijera </li>
      </ul>
    </div>

     {/* Haircuts and Beard */}
     <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-purple-800 mb-4">
Harcut and Beard
</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/Gvd5SwCZ/DALL-E-2025-02-10-19-08-04-A-professional-barber-giving-a-stylish-haircut-and-beard-trim-to-a-client.webp"
          alt="Haircuts"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $20
        </p>
      </div>
      <p className="text-gray-400 mt-4">Cortes de pelo combinados con un arreglo profesional de barba.</p>
    </div> 

    {/* Beard Grooming */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-purple-800 mb-4">Beard & Brow Trim</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/wNNnQzzk/aeed7e19-9182-4c5a-bebc-5b826a5e02d5.webp"
          alt="Beard Grooming"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
          <p className="absolute bottom-2 right-2 bg-purple-800 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $23
        </p>
       
      </div>
      <p className="text-gray-400 mt-4">Recorte y estilizado profesional de barba.</p>
      <ul className="mt-4 space-y-2 text-white">
        <li>Perfilamos tu barba con precisión para un acabado limpio y estilizado, mientras que dejamos tus cejas prolijas y definidas, resaltando tu mirada y armonizando tu rostro. Un servicio ideal para quienes buscan un look pulcro y bien cuidado.
</li>
        

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
          src="https://i.ibb.co/hRvYxdPp/1144eb34-d2af-49e9-98d3-79edba2a401d.jpg"
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
          src="https://i.ibb.co/2Yd8gTyz/a02ecf1b-9c57-4d64-8711-ee285830a5cf.jpg"
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
          src="https://i.ibb.co/DDzh28Mz/0b2eea01-5a3c-4f43-adaf-3da43b3a4991.jpg"
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
      url('https://i.ibb.co/7xBsd0k6/59940680-e18b-48aa-bac8-ce1beb385f74.jpg')`,
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
    <div className="backdrop-blur-md w-full md:w-1/3 flex flex-col items-center bg-black/30 p-6 rounded-lg shadow-lg">
      <img
        src="https://i.ibb.co/tM57jVNH/7003df5a-3511-4119-b8d0-6d0e024ab44e.png"
        alt="Barbershop"
        className="w-[6rem] p-2  mb-4"
      />
      <h3 className="text-3xl font-semibold text-purple-800 mb-4">Horarios</h3>
      <ul className="text-gray-300 text-lg space-y-2">
        <li>Lunes a Viernes: 10:00 AM - 8:00 PM</li>
        <li>Sábado: 9:30 AM - 2:00 PM</li>
        <li>Domingo: Cerrado</li>
      </ul>
      <p className="text-gray-400 mt-6">
        ¡Ven y disfruta de una experiencia única con nuestros servicios
        personalizados!
      </p>
      <div className="flex items-center justify-center mt-8">
      <a href="https://wa.me/34680702836?text=Hola,%20quiero%20agendar%20un%20turno" target="_blank" rel="noopener noreferrer">
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

    Agenda tu turno
 

  </button>
  </a>
</div>

    </div>

    {/* Mapa */}

    <div className="w-full md:w-1/3 h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.297726194743!2d-16.560320289105668!3d28.07645997587274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a9e3584beca95%3A0x5674adbf580f02b1!2sAv.%20Santa%20Cruz%2C%20124%2C%2038611%20San%20Isidro%2C%20Santa%20Cruz%20de%20Tenerife%2C%20Espa%C3%B1a!5e0!3m2!1ses-419!2sar!4v1739716910478!5m2!1ses-419!2sar"        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>


    </div>
  );
};

export default LandingPage;