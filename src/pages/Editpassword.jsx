import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function EditarPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return setMessage('Por favor, completa todos los campos');
    if (newPassword !== confirmPassword) return setMessage('Las contraseñas no coinciden');
    if (newPassword.length < 8) return setMessage('La contraseña debe tener al menos 8 caracteres');

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/update/password/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      setMessage(res.ok ? '✅ Contraseña actualizada exitosamente' : data.message || 'Error al actualizar');
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-zinc-900 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6">Restablecer Contraseña</h1>

        {!email ? (
          <p className="text-red-500 text-center">❌ Email no válido en la URL</p>
        ) : (
          <form onSubmit={handlePasswordChange}>
            {message && (
              <p className={`text-sm text-center mb-4 ${message.includes('exitosamente') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
            <input
              type="email"
              value={email}
              disabled
              className="w-full mb-4 bg-gray-800 text-gray-400 p-2 rounded border border-gray-600 cursor-not-allowed"
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-gray-600"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-6 p-2 bg-gray-800 text-white rounded border border-gray-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              {loading ? 'Actualizando...' : 'Guardar Contraseña'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full mt-3 text-sm text-gray-400 hover:text-gray-200 text-center"
            >
              Volver al inicio de sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditarPassword;
