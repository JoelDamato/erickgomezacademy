import React, { useState } from 'react';

function PagoMercadoPago() {
  const [title] = useState("Master Fade 3.0");
  const [price] = useState("47000"); // ARS
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cursos.onrender.com'
      : 'http://localhost:5000';

  const generarLinkDePago = async () => {
    if (!nombre || !email) {
      setError("Por favor completá tu nombre y email.");
      return;
    }

    setLoading(true);
    setError('');

    // Guardar en localStorage para /success
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price: parseFloat(price), nombre, email })
      });

      const data = await response.json();
      console.log("🎯 Respuesta:", data);

      if (response.ok && data.link) {
        window.location.href = data.link;
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (err) {
      console.error("❌ Error al generar el link de pago:", err);
      setError("Hubo un problema generando el link de pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4 relative bg-[url('https://i.ibb.co/6JRvGQ0M/Fondosinega2.png')] bg-cover bg-center">
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl max-w-lg w-full shadow-lg">
      <div className='flex justify-center'>      <img src="https://i.ibb.co/bR6KXLbb/Master-Fade-3-0.png" className="w-40 h-40 my-3" alt="" /></div>


        <h2 className="text-3xl font-bold text-center mb-6"> Master Fade 3.0</h2>

        <p className="text-yellow-400 mb-4 text-sm text-center">
          <strong>IMPORTANTE:</strong> Este email será tu acceso al curso ingresalo correctamente.
        </p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Nombre completo</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}

        <button
          onClick={generarLinkDePago}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md ${
            loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {loading ? "Generando link de pago..." : "Ir a pagar"}
        </button>

        <p className="text-xs text-center mt-5 text-zinc-300">
  Al hacer clic en <u>“Ir a pagar”</u>, vas a ser dirigido a Mercado Pago.
  <br />
  <strong className="text-red-400 underline">IMPORTANTE:</strong> una vez confirmado el pago,
   te redirigiremos automáticamente a la página con tu acceso al curso.
  <br />
  <u>Solo tenés que esperar 5 segundos</u> luego de pagar dentro de Mercado Pago.
</p>

      </div>
    </div>
  );
}

export default PagoMercadoPago;
