import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("Procesando tu cuenta...");
  const [passwordGenerada, setPasswordGenerada] = useState("");
  const [loading, setLoading] = useState(true);

  const email = searchParams.get("email");
  const nombre = searchParams.get("nombre");

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cos-gim3.onrender.com'
      : 'http://localhost:5000';

  const generateRandomPassword = (length = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  useEffect(() => {
    const crearUsuario = async () => {
      if (!email || !nombre) {
        setMensaje("❌ Faltan datos en la URL");
        setLoading(false);
        return;
      }

      const password = generateRandomPassword();
      setPasswordGenerada(password);

      const delay = new Promise(resolve => setTimeout(resolve, 5000));

      try {
        const request = axios.post(`${API_BASE_URL}/api/create/register`, {
          nombre,
          email,
          password,
          cursos: ["Master Fade 3.0"],
          rol: "user"
        });

        const [response] = await Promise.all([request, delay]);

        if (response.status === 201) {
          setMensaje("✅ ¡Cuenta creada con éxito!");
        } else {
          setMensaje("⚠️ No se pudo crear la cuenta.");
        }

      } catch (error) {
        console.error("❌ Error al crear usuario:", error);

        if (error.response?.status === 409) {
          setMensaje("⚠️ El usuario ya existe. Podés iniciar sesión.");
        } else {
          setMensaje("❌ Error al crear la cuenta.");
        }
      } finally {
        setLoading(false);
      }
    };

    crearUsuario();
  }, [email, nombre]);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4 relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/6JRvGQ0M/Fondosinega2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-10 w-full flex justify-center">
        <img
          src="/erickgomez.png"
          alt="Erick Gomez Academy"
          className="w-[180px] drop-shadow-lg"
        />
      </div>

      <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl max-w-lg w-full text-center mt-28">
        <h1 className="text-2xl font-bold mb-4">{mensaje}</h1>

        {loading ? (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : mensaje.includes("éxito") ? (
          <div className="text-lg mt-4">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Contraseña:</strong> {passwordGenerada}</p>
            <p className="mt-2 text-yellow-400">Guardá estos datos para ingresar</p>
            <a href="/login" className="block mt-4 underline text-yellow-300">
              Iniciar sesión
            </a>
          </div>
        ) : (
          <div className="text-red-400 text-lg mt-4">
            <p>{mensaje}</p>
            <a href="/login" className="block mt-4 underline text-yellow-300">
              Ir al login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
