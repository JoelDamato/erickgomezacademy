import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api_base";

function Home() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validar confirmación de contraseña en registro
    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/create/register";
      const payload = isLogin
        ? { email: email.toLowerCase(), password }
        : { nombre, email: email.toLowerCase(), password, rol: "user" };

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (response.status === 201) {
        // Registro exitoso
        setSuccessMessage(
          "Cuenta creada exitosamente. ¡Ahora puedes iniciar sesión!"
        );
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLogin(true); // Cambia al formulario de inicio de sesión
      } else if (response.status === 200) {
        // Login exitoso
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email.toLowerCase());
        console.log("Respuesta completa del backend:", response.data);

        navigate("/Dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error en el proceso. Intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp en formato internacional
  const message = "Hola, tengo una consulta!."; // Mensaje predefinido opcional

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
<div className="w-screen flex flex-col min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black">

       <img src="/erickgomez.png" alt="Logo" className="w-[280px] sm:w-[150px]" />

{/* Frase destacada debajo del logo */}
<h1 className="text-white text-center font-bebas text-xl sm:text-3xl leading-snug px-4">
  Bienvenido a la plataforma donde los barberos
  <br />
  <span className="text-white tracking-wide">dejan de cortar por cortar…</span>
</h1>

<div className="text-center font-bebas text-2xl sm:text-3xl mt-1 leading-tight px-4">
  <p className="inline-block bg-gradient-to-r from-zinc-200 via-white to-zinc-500 text-transparent bg-clip-text whitespace-nowrap overflow-hidden border-r-2 border-white animate-typing-final">
    Y empiezan a construir su nombre.
  </p>
</div>



<p className="text-gray-400 text-sm sm:text-base text-center mt-3 mb-6 px-6 max-w-md font-open">
  Entrá, explorá y descubrí el nuevo sistema educativo de <strong className="text-white">Erick Gómez Academy</strong>.
</p>


    
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-full shadow z-50 flex items-center gap-2 font-bold text-sm">
          <img src="https://i.ibb.co/xKKJDBCS/d62368f7-f3e3-48ce-84cd-04a00024000e.png" alt="Soporte" className="w-6 h-6 rounded-lg" /> Soporte
        </a>

      {/* Formulario */}
      <div className="bg-black/60 border border-zinc-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-11/12 sm:w-1/2">

        <h1 className="text-white text-4xl mb-6 text-center font-bold">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Nombre: Solo en Registro */}
          {!isLogin && (
            <div>
              <label className="block text-white mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-white mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          {!isLogin && (
            <div>
              <label className="block text-white mb-1">
                Repetir Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {/* Botón con Loading */}
          <button
  type="submit"
  disabled={isLoading}
  className={`w-full text-white font-semibold py-3 px-6 rounded-md tracking-wide transition-all duration-200 ease-in-out ${
    isLoading
      ? "bg-gray-700 cursor-not-allowed opacity-50"
      : "bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 hover:ring-2 hover:ring-zinc-400"
  }`}
  style={{
    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.05em"
  }}
>
  {isLoading ? (
    <svg
      className="animate-spin h-5 w-5 mx-auto text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ) : isLogin ? (
    "Iniciar Sesión"
  ) : (
    "Registrarse"
  )}
</button>

        </form>

        <p className="text-white mt-4 text-center">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => {
              setError("");
              setSuccessMessage("");
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Crear Cuenta" : "Iniciar Sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
