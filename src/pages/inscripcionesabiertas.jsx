import React, { useState } from 'react';

function InscripcionesAbiertas() {
  const [progress] = useState(92);

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-start px-4 bg-[url('https://i.ibb.co/6JRvGQ0M/Fondosinega2.png')] bg-cover bg-center text-white">
      {/* Barra de progreso */}
      <div className="w-full max-w-md mb-6">
        <div className="relative h-5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-600 shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-red-600 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-sm text-white font-bold">
            {progress}% LUGARES LLENOS
          </span>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl max-w-md w-full shadow-lg text-center">
        <img
          src="https://i.ibb.co/bR6KXLbb/Master-Fade-3-0.png"
          alt="Master Fade Logo"
          className="w-40 h-40 mx-auto mb-4"
        />

        <h1 className="text-lg font-bold mb-4 text-transparent bg-gradient-to-b from-white/60 to-yellow-500 bg-clip-text leading-tight">
          INSCRIBITE CON UNO DE NUESTROS REPRESENTANTES VIA WHATSAPP:
        </h1>

        <a
          href="https://wa.me/59891640623?text=Hola,%20quiero%20inscribirme%20al%20Master%20Fade%203.0%20y%20asegurar%20mi%20lugar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold p-1 rounded-xl text-sm transition duration-300 w-full"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
          RESERVAR MI LUGAR AHORA
        </a>

        <p className="text-xs text-gray-400 mt-3">
          💬 Al presionar el botón serás redirigido a WhatsApp para hablar con un representante oficial de Erick Gómez Academy.
        </p>
      </div>
    </div>
  );
}

export default InscripcionesAbiertas;
