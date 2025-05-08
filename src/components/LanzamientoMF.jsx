import React, { useState } from 'react';

const LanzamientoMasterFade = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensajeFinal, setMensajeFinal] = useState('');
  const [errores, setErrores] = useState({ email: false, nombre: false });

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const generarLink = () => {
    const erroresDetectados = {
      email: !validarEmail(email),
      nombre: !nombre.trim(),
    };

    setErrores(erroresDetectados);

    if (erroresDetectados.email || erroresDetectados.nombre) return;

    const link = `https://www.erickgomezacademy.com/success?email=${encodeURIComponent(email)}&nombre=${encodeURIComponent(nombre)}`;

    const mensaje = `🎉 Felicitaciones, ya sos parte de la nueva generación de barberos que van por más 🎉\n\n` +
      `Acá tenes tu acceso al Master Fade 3.0:\n👉🏼 ${link}\n` +
      `(💡 Ese link ya tiene cargado tu email y contraseña. Solo hacé clic, iniciás sesión y ya estás dentro.)\n\n` +
      `📝 Erick esta semana va a estar recibiendo y corrigiendo personalmente las pruebas finales para entregar los primeros diplomas certificados, por eso te recomiendo empezar YA… así llegás entre los primeros que logren graduarse y tener la posibilidad de calificar al siguiente nivel.\n\n` +
      `⚠ Nuestra prioridad es que no solo mires las clases, sino que llegues a la meta, por eso vamos a estar en contacto para acompañarte, ayudarte y asegurarnos que aproveches al máximo este entrenamiento.`;

    setMensajeFinal(mensaje);
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setMensajeFinal('');
    setErrores({ email: false, nombre: false });
  };

  const copiarAlPortapapeles = async () => {
    try {
      await navigator.clipboard.writeText(mensajeFinal);
      alert('📋 Copiado al portapapeles');
    } catch (err) {
      alert('❌ No se pudo copiar');
    }
  };

  return (
    <div className="max-w-xl mb-10 mt-16 p-8 bg-gradient-to-br from-black via-zinc-900 to-black rounded-2xl shadow-2xl text-white">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-tight">
        🚀  Master Fade 3.0
      </h1>

      {!mensajeFinal ? (
        <>
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full p-3 rounded-lg bg-zinc-800 border ${errores.nombre ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition`}
              placeholder="Tu nombre"
            />
            {errores.nombre && <p className="text-red-400 text-sm mt-2">El nombre es obligatorio</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg bg-zinc-800 border ${errores.email ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition`}
              placeholder="email@ejemplo.com"
            />
            {errores.email && <p className="text-red-400 text-sm mt-2">Ingresá un email válido</p>}
          </div>

          <button
            onClick={generarLink}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition"
          >
            Generar mensaje de acceso
          </button>
        </>
      ) : (
        <>
          <textarea
            readOnly
            value={mensajeFinal}
            className="w-full p-4 mb-4 rounded-lg bg-zinc-800 border border-zinc-600 text-sm resize-none h-60"
          />
          <button
            onClick={copiarAlPortapapeles}
            className="w-full py-3 mb-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition"
          >
            Copiar todo
          </button>
          <button
            onClick={resetForm}
            className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-xl transition"
          >
            Generar otro
          </button>
        </>
      )}
    </div>
  );
};

export default LanzamientoMasterFade;
