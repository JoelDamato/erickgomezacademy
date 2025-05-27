import "../App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api_base";
import { loginUser, registerUser, clearLoginMessages } from "../store/loginSlice";
import axios from "axios";

function Home() {
  const [nombre, setNombre] = useState("");
  const [Remail, setRemail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loadingRecovery, setLoadingRecovery] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux login state
  const { loading, error, successMessage, isAuthenticated, token } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuthenticated && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email.toLowerCase());
      navigate("/Dashboard");
    }
  }, [isAuthenticated, token, email, navigate]);

  useEffect(() => {
    // Limpiar mensajes al cambiar de login a registro y viceversa
    dispatch(clearLoginMessages());
  }, [isLogin, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearLoginMessages());

    if (!isLogin && password !== confirmPassword) {
      // Validar confirmación de contraseña en registro
      dispatch(clearLoginMessages());
      setTimeout(() => {
        dispatch(clearLoginMessages());
      }, 3000);
      return;
    }

    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ nombre, email, password }));
    }
  };

  const phoneNumber = "+59891640623";
  const message = "Hola, tengo una consulta!.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const enviarCorreo = async () => {
    if (!Remail) return setMensaje("Ingresá un email válido.");
    setMensaje("");
    setLoadingRecovery(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/send-reset-password`, { email: Remail });
      setMensaje(res.data.message || "Correo enviado.");
    } catch (err) {
      setMensaje("Hubo un error al enviar el correo.");
    } finally {
      setLoadingRecovery(false);
    }
  };

  return (
    <div className="w-screen flex flex-col min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black">
      <img src="/erickgomez.png" alt="Logo" className="w-[280px] sm:w-[150px]" />

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

      <div className="bg-black/60 border border-zinc-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-11/12 sm:w-1/2">
        <h1 className="text-white text-4xl mb-6 text-center font-bold">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-3 px-6 rounded-md tracking-wide transition-all duration-200 ease-in-out ${
              loading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 hover:ring-2 hover:ring-zinc-400"
            }`}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em"
            }}
          >
            {loading ? (
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
              dispatch(clearLoginMessages());
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
        )}
        {showRecoveryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-gray-700 rounded-xl p-6 w-full max-w-md relative text-white shadow-2xl">
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setShowRecoveryModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">Recuperar contraseña</h2>
              <input
                type="email"
                placeholder="Tu email"
                value={Remail}
                onChange={(e) => setRemail(e.target.value)}
                className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-white"
              />
              <button
                onClick={enviarCorreo}
                disabled={loadingRecovery}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                {loadingRecovery ? "Enviando..." : "Enviar link de recuperación"}
              </button>
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