import React from 'react';

export default function VideoBarberos() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 ">
      {/* Imagen superior con degradado y logo encima */}
      <div className="w-full h-[250px] relative">
        <img
          src="https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg"
          alt="Fondo Barbería"
          className="w-full h-full object-cover"
        />
        {/* Degradado negro hacia abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        {/* Logo encima de la imagen */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/erickgomez.png"
            alt="Erick Gómez Logo"
            className="w-[160px] sm:w-[200px]"
          />
        </div>
      </div>

      {/* Headline */}
      <h1 className="-mt-10 text-2xl text-center mb-6 md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-700 to-white drop-shadow-lg tracking-wide">
        ¿Estás listo para convertirte en un barbero de nivel elite?
      </h1>

      {/* Subheadline */}
      <p className="text-gray-300 text-center text-lg max-w-2xl mb-5">
        💬 Dale play al mensaje privado de Erick y descubrí por qué este <strong>9 de mayo</strong> puede ser el comienzo de tu mejor versión.
      </p>

      {/* Video */}
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-yellow-600">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src="https://player-vz-7cd4a4ef-9e2.tv.pandavideo.com/embed/?v=6c178e6b-0000-4c6f-a65d-64d62d95341a"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Barberos"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Nota final */}
      <p className="text-sm text-gray-400 max-w-xl text-center pb-10">
        👉🏼 <span className="text-white font-medium">Solo los miembros del grupo VIP van a recibir esta oportunidad exclusiva.</span><br />
        Escucha esto antes de que sea tarde.
      </p>
    </div>
  );
}
