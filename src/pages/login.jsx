import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api_base";
import Spinner from "../components/Spinner";

function Home() {
 
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [Remail, setRemail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

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

    const enviarCorreo = async () => {
    if (!Remail) return setMensaje("Ingresá un email válido.");
    setMensaje("");
    setLoading(true);
    try {
const res = await axios.post(`${API_BASE_URL}/api/send-reset-password`, { email: Remail });

      setMensaje(res.data.message || "Correo enviado.");
    } catch (err) {
      console.error(err);
      setMensaje("Hubo un error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

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
    <Spinner />
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
     
     {isLogin && (
  <p
    className="text-sm text-blue-400 underline text-center mt-3 cursor-pointer"
    onClick={() => setShowRecoveryModal(true)}
  >
    Olvide mi contraseña
  </p>
)}{showRecoveryModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
    <div className="bg-zinc-900 border border-gray-700 rounded-xl p-6 w-full max-w-md relative text-white shadow-2xl">
      {/* Botón de cerrar */}
      <button
        className="absolute top-2 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        onClick={() => setShowRecoveryModal(false)}
      >
        &times;
      </button>

      {/* Título */}
      <h2 className="text-2xl font-bold mb-4 text-center">Recuperar contraseña</h2>

      {/* Input de email */}
      <input
        type="email"
        placeholder="Tu email"
        value={Remail}
        onChange={(e) => setRemail(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-white"
      />

      {/* Botón de enviar */}
      <button
        onClick={enviarCorreo}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        {loading ? "Enviando..." : "Enviar link de recuperación"}
      </button>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <p
          className={`mt-4 text-sm text-center ${
            mensaje.toLowerCase().includes("error") ? "text-red-400" : "text-green-400"
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default Home;
