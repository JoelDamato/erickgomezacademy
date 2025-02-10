import React, { useState } from "react";

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center  text-white">

  {/* Navbar */}
<nav className="w-full fixed top-0 bg-black bg-opacity-80 backdrop-blur-md z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
    {/* Logo */}
    <h1 className="text-xl font-bold text-yellow-300">STAM Barber </h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex space-x-6">
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#servicios">Servicios</a></li>
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#resultados">Resultados</a></li>
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#location">Ubicación</a></li>
    </ul>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button
        className="text-yellow-300 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/3000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-black bg-opacity-90 text-center`}>
    <ul className="space-y-4 py-4">
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#resultados" onClick={() => setMenuOpen(false)}>Resultados</a></li>
      <li className="hover:text-yellow-300 cursor-pointer"><a href="#location" onClick={() => setMenuOpen(false)}>Ubicación</a></li>
    </ul>
  </div>
</nav>
{/* Navbar */}



    {/* MAIN */}
<section
  id="home"
  className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full h-screen mt-2 md:mt-10 px-4"
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1)), 
                 url('https://i.ibb.co/3QXPSkk/DALL-E-2025-01-28-17-03-12-A-New-York-style-barbershop-interior-designed-for-a-wallpaper-with-a-blue.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Text Section */}
<div className="backdrop-blur-sm bg-gradient-to-r from-black/50 to-black/10 p-5 w-full md:w-1/2 text-center flex flex-col justify-center items-center ">
    <h2
      className="text-5xl md:text-7xl font-bold text-yellow-300 inline-block px-4 py-2 
                shadow-lg tracking-wide uppercase"
      style={{
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
        fontFamily: "'Impact', sans-serif",
      }}
    >
      STAM BARBER
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
      Bienvenido a la web oficial de Stam Barber. Guardate un turno para tener el mejor look.
    </p>

    <div className="flex items-center justify-center mt-8">
    <a href="https://wa.me/14245378292?text=Hola,%20quiero%20agendar%20un%20turno" target="_blank" rel="noopener noreferrer">
  <button className="flex items-center gap-2 bg-yellow-300 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-lg">
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

  {/* LOGO Section */}
  <div className="w-full md:w-1/2 flex justify-center items-center  md:mb-0 md:mt-0">
    <img
      src="https://i.ibb.co/qYsZJ6G1/77-D39-D3-B-FDA8-4-AD5-B53-D-DE6-CAB95-C649-removebg-preview.png"
      alt="Barber"
      className="w-[15rem] md:w-[20rem] h-auto"
    />
  </div>
</section>
{/* MAIN */}




    {/* Products Section */}
<section id="servicios" className=" w-full max-w-6xl mt-[5rem]  py-16 px-4">
<div className="relative mb-12">
  <h2
    className="bg-yellow-300 text-5xl font-bold text-center text-white rounded-sm inline-block px-4 py-2"
    style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }}
  >
    Servicios
  </h2>
  {/* Línea amarilla debajo del texto */}
  <div className="absolute left-0 right-0 top-full h-2 bg-yellow-300 mt-2"></div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Haircuts */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-yellow-300 mb-4">Haircuts</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/66/96/ae/6696aef09abc4265e01dfe227fd0de4e.jpg"
          alt="Haircuts"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $45
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
      <h3 className="text-4xl text-center font-semibold text-yellow-300 mb-4">
Harcut and Beard
</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/Gvd5SwCZ/DALL-E-2025-02-10-19-08-04-A-professional-barber-giving-a-stylish-haircut-and-beard-trim-to-a-client.webp"
          alt="Haircuts"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $65
        </p>
      </div>
      <p className="text-gray-400 mt-4">Cortes de pelo combinados con un arreglo profesional de barba.</p>
    </div> 

    {/* Beard Grooming */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <h3 className="text-4xl text-center font-semibold text-yellow-300 mb-4">Beard Trim</h3>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.pinimg.com/736x/f7/db/3e/f7db3e32869dc4210e1f147bc4ba9865.jpg"
          alt="Beard Grooming"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          $20
        </p>
      </div>
      <p className="text-gray-400 mt-4">Recorte y estilizado profesional de barba.</p>
      <ul className="mt-4 space-y-2 text-white">
        <li>- Recorte de Barba</li>
        <li>- Afeitado con Toalla Caliente</li>
      </ul>
    </div>
  </div>
</section>


{/* Results Section */}
<section id="resultados" className="w-full max-w-6xl mx-auto py-16 px-4">
<div className="relative mb-12">
  <h2
    className="bg-yellow-300 text-5xl font-bold text-center text-white rounded-sm inline-block px-4 py-2"
    style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }}
  >
    Resultados
  </h2>
  {/* Línea amarilla debajo del texto */}
  <div className="absolute left-0 right-0 top-full h-2 bg-yellow-300 mt-2"></div>
</div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Resultado 1 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/0yqCT1Pr/IMG-9733.jpg"
          alt="Resultado 1"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #1
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Moderno y elegante para destacar.</p>
    </div>

    {/* Resultado 2 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/PZ42swL6/IMG-9728.jpg"
          alt="Resultado 2"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #2
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Clásico con un toque contemporáneo.</p>


    </div>

    {/* Resultado 3 */}
    <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="https://i.ibb.co/20Z8spGV/IMG-9729.jpg"
          alt="Resultado 3"
          className="transition-transform duration-300 transform hover:scale-105 rounded-lg"
        />
        <p className="absolute bottom-2 right-2 bg-yellow-300 text-black px-4 py-1 font-bold text-lg rounded-md shadow-md">
          Corte #3
        </p>
      </div>
      <p className="text-gray-400 mt-4 text-center">Perfecto para un estilo profesional.</p>
    </div>
  </div>
</section>





  {/* Location Section */}


  <section
  id="location"
  className="w-full py-16 text-center mx-auto px-4"
  style={{
    background: `
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 300%), 
      url('https://i.pinimg.com/736x/6a/bf/51/6abf516a29ecf450657d31b77fdc0da2.jpg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

  <h2 className="text-5xl font-bold text-yellow-300 mb-12"     style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 4px 4px 6px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Impact', sans-serif",
    }} >Ubicación</h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-y-8 md:gap-x-10">
    {/* Horarios de atención */}
    <div className="backdrop-blur-sm w-full md:w-1/3 flex flex-col items-center bg-black/30 p-6 rounded-lg shadow-lg">
      <img
  src="https://i.ibb.co/qYsZJ6G1/77-D39-D3-B-FDA8-4-AD5-B53-D-DE6-CAB95-C649-removebg-preview.png"
        alt="Barbershop"
        className="w-32 h-32 rounded-full  mb-4"
      />
      <h3 className="text-3xl font-semibold text-yellow-300 mb-4">Horarios</h3>
      <ul className="text-gray-300 text-lg space-y-2">
        <li>Lunes: 8:00 AM - 6:30 PM</li>
        <li className="text-red-600">Martes cerrado</li>
        <li className="text-red-600">Miercoles cerrado</li>
        <li>Jueves: 8:00 AM - 6:30 PM</li>
        <li>Viernes: 8:00 AM - 6:30 PM</li>
        <li>Sábado: 7:00 AM - 3:00 PM</li>
        <li>Domingo: 9:00 AM - 2:00 PM </li>
      </ul>
      <p className="text-gray-400 mt-6">
      Solo trabajo con cita previa
      </p>
      <div className="flex items-center justify-center mt-8">
      <a href="https://wa.me/14245378292?text=Hola,%20quiero%20agendar%20un%20turno" target="_blank" rel="noopener noreferrer">
  <button className="flex items-center gap-2 bg-yellow-300 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-lg">
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.542901423852!2d-118.37037582445494!3d33.9528828731946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b6e05c89bb11%3A0xc80ea66fcf30b3d3!2s681%20W%20Arbor%20Vitae%20St%2C%20Inglewood%2C%20CA%2090301%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1739223695362!5m2!1ses-419!2sar"        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>


    </div>
  );
};

export default LandingPage;