import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [email, setEmail] = useState(localStorage.getItem('savedEmail') || '');
  const [password, setPassword] = useState(localStorage.getItem('savedPassword') || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  // Agregar lógica para redirigir si el token ya existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Dashboard');  // Redirige automáticamente si ya hay un token almacenado
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar el estado de loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(), // Convertir a minúsculas al enviar
          password,
        }),
      });


      const data = await response.json();
      console.log(data); // Verificar la respuesta del servidor

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        navigate('/Dashboard');  // Redirige al Dashboard en caso de éxito
      } else {
        setError(data.message || 'Login fallido. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error en el servidor. Por favor, intenta nuevamente más tarde.');
    } finally {
      setIsLoading(false); // Dejar de mostrar el estado de loading
    }
  };

  return (
    <div
      className="w-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')" }}
    >
      {/* Logo de la web */}
      <img
        src="https://i.ibb.co/GpQ6Lkw/cold-smooth-tasty-removebg-preview.png"
        alt="Logo"
        className="w-48 sm:w-64 mb-6"
      />

      <div className="bg-black/70  h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h1 className="flex justify-center text-white text-3xl tracking-wide font-bold py-4 sm:text-6xl">
          INGRESAR
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
          <div className="w-4/5">
            <label className="block text-white  font-semibold tracking-wide mb-2">
              EMAIL:
              <div className="flex items-center mt-1">
                <input
                  className="text-black w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
                <img
                  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
                  src="https://cdn-icons-png.flaticon.com/128/3916/3916631.png"
                  alt="Email Icon"
                />
              </div>
            </label>
          </div>

          <div className="w-4/5">
            <label className="block text-white  font-semibold tracking-wide mb-2">
              CONTRASEÑA:
              <div className="flex items-center mt-1">
                <input
                  className="text-black w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
                  src="https://cdn-icons-png.flaticon.com/128/3917/3917642.png"
                  alt="Password Icon"
                />
              </div>
            </label>
          </div>

          <button
  className={`${
    isLoading ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'
  } rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-white transition-all duration-300 flex justify-center items-center`}
  type="submit"
  disabled={isLoading}
>
  {isLoading ? (
    <svg
      className="animate-spin h-6 w-6 text-white"
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
  ) : (
    'INGRESAR'
  )}
</button>

        </form>
      </div>
    </div>
  );
}

export default Home;
