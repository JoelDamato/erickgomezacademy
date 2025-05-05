import React, { useState } from 'react';

function PagoMercadoPago() {
  const [title, setTitle] = useState("Master Fade 3.0");
  const [price, setPrice] = useState("1"); // en ARS
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cos-gim3.onrender.com'
      : 'http://localhost:5000';

  const generarLinkDePago = async () => {
    if (!nombre || !email) {
      setError("Por favor completá tu nombre y email.");
      return;
    }

    setLoading(true);
    setError('');

    // Guardar en localStorage para luego recuperar en /success
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          nombre,
          email
        })
      });

      const data = await response.json();
      console.log("🎯 Respuesta:", data);

      if (response.ok && data.link) {
        window.location.href = data.link; // Redirige al checkout de MercadoPago
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
    <div className="max-w-md mx-auto p-6 bg-zinc-900 text-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Comprar Master Fade 3.0</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Nombre completo</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <button
        onClick={generarLinkDePago}
        disabled={loading}
        className={`w-full py-2 rounded font-semibold ${
          loading ? "bg-gray-600" : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        {loading ? "Generando..." : "Ir a pagar"}
      </button>
    </div>
  );
}

export default PagoMercadoPago;
