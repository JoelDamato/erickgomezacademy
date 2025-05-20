import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api_base";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("Procesando tu cuenta...");
  const [mensajeDelServidor, setMensajeDelServidor] = useState("");
  const [passwordGenerada, setPasswordGenerada] = useState("");
  const [mostrarCredenciales, setMostrarCredenciales] = useState(false);
  const [mostrarMensajeServidor, setMostrarMensajeServidor] = useState(false);
  const [loading, setLoading] = useState(true);

  const email = searchParams.get("email");
  const nombre = searchParams.get("nombre");


  const generateReadablePassword = () => {
    const palabras = ["barber", "fade", "corte", "peine", "tijera", "clipper"];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    const numero = Math.floor(100 + Math.random() * 900);
    return `${palabra}${numero}`;
  };

  useEffect(() => {
    const crearUsuario = async () => {
      if (!email || !nombre) {
        setMensaje("❌ Faltan datos en la URL");
        return;
      }

      const password = generateReadablePassword();
      const normalizedEmail = email.toLowerCase();

      try {
        const response = await axios.post(`${API_BASE_URL}/api/create/registerauto`, {
          nombre,
          email: normalizedEmail,
          password,
          cursos: ["Master Fade 3.0"],
          rol: "user",
        });

        const serverMsg = response.data?.message || "Proceso completado";
        setMensaje("✅ ¡Listo!");
        setMensajeDelServidor(serverMsg);

        if (serverMsg.includes("Usuario creado") || serverMsg.includes("creado exitosamente")) {
          setPasswordGenerada(password);
          setMostrarCredenciales(true);
          setMostrarMensajeServidor(false);
        } else {
          setMostrarCredenciales(false);
          setMostrarMensajeServidor(true);
        }

      } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        const errorMsg =
          error.response?.data?.message || "❌ Error desconocido al crear la cuenta.";

        setMensaje("⚠️ No se pudo crear la cuenta.");
        setMensajeDelServidor(errorMsg);
        setMostrarCredenciales(false);
        setMostrarMensajeServidor(true);
      }
    };

    crearUsuario();
  }, [email, nombre]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4 relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/6JRvGQ0M/Fondosinega2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 w-full flex justify-center">
        <img
          src="/erickgomez.png"
          alt="Erick Gomez Academy"
          className="w-[180px] drop-shadow-lg mt-4"
        />
      </div>

      <div className="bg-black/70 flex flex-col items-center backdrop-blur-sm p-8 rounded-xl max-w-lg w-full text-center mt-32">
        <h2 className="text-xl">
          🎉 ¡Felicitaciones! Ya tenés acceso al curso <strong>Master Fade 3.0</strong>.
        </h2>
        {mostrarCredenciales && (
          <p className="text-sm text-sm mt-2 text-red-400">
            Importante: Sacale captura de pantalla y guarda tu contraseña que luego no va a estar disponible
          </p>
        )}
        <img src="https://i.ibb.co/bR6KXLbb/Master-Fade-3-0.png" className="w-40 h-40 my-3" alt="" />
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-yellow-300">⏳ Estamos configurando tu cuenta, por favor esperá un momento...</p>
          </div>
        ) : (
          <div className="text-lg mt-4">
            <p className="my-2">
              <strong>Email:</strong> {email}
            </p>

            {mostrarCredenciales && (
              <>
                <p>
                  <strong>Contraseña:</strong> {passwordGenerada}
                </p>
                <p className="mt-2 text-yellow-400">
                  Importante: guardá estos datos para ingresar
                </p>
              </>
            )}

            {mostrarMensajeServidor && mensajeDelServidor && (
              <p className="text-yellow-400 mb-2">{mensajeDelServidor}</p>
            )}

            <a
              href="/login"
              className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-md"
            >
              Iniciar sesión
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
