import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal"; // Importar el componente Modal
import useUserStore from "../store/users";
import { Link, useParams, useNavigate } from "react-router-dom";
import LanzamientoMasterFade from "../components/LanzamientoMF";
import API_BASE_URL from "../api_base";

function PanelControl() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cursos, setCursos] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [activeSection, setActiveSection] = useState("lanzamiento");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);;

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const generateRandomPassword = (length = 12) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  useEffect(() => {
    if (email) {
      axios
        .get(`${API_BASE_URL}/api/users/${email}`)
        .then((response) => {
          if (response.data) {
            setNombre(response.data.nombre || "");
            setCursos(response.data.cursos || []); // Se mantiene la lista de cursos actual
          }
        })
        .catch(() => {
          setCursos([]);
        });
    }
  }, [email]);

  // CREAR USUARIOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedPassword = generateRandomPassword();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email,
        password: generatedPassword,
        cursos,
        rol: "user",
      });

      if (response.status === 201) {
        setModalMessage(
          `Usuario creado exitosamente. \nEmail: ${email}\nContraseña: ${generatedPassword}`
        );
        setIsModalOpen(true); // Abrir el modal
        setNombre("");
        setEmail("");
        setCursos([]);
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message ||
          "Error al registrar usuario: " + error.message
      );
      setIsModalOpen(true); // Abrir el modal con mensaje de error
    }
  };
  //-----------------------------------------------

  // Función para manejar cambios en los checkboxes de cursos
  const handleCursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCursos([...cursos, value]);
    } else {
      setCursos(cursos.filter((curso) => curso !== value));
    }
  };

  // Función para editar un usuario-------------------
  const handleEditUser = async (e) => {
    e.preventDefault();

    if (!email) {
      setModalMessage("Por favor, introduce un email.");
      setIsModalOpen(true);
      return;
    }

    try {
      // 1️⃣ Buscar el usuario con POST en `/api/search/users`
      const responseGet = await axios.post(`${API_BASE_URL}/api/search/users`, {
        email,
      });

      if (!responseGet.data) {
        setModalMessage("El usuario no existe en la base de datos.");
        setIsModalOpen(true);
        return;
      }

      const userCursos = responseGet.data.cursos || []; // Cursos actuales del usuario

      // 2️⃣ Mantener los cursos previos + los nuevos sin duplicados
      const updatedCursos = [...new Set([...userCursos, ...cursos])];

      // 3️⃣ Enviar la actualización usando `api/update/users/:email`
      const responseUpdate = await axios.put(
        `${API_BASE_URL}/api/update/users/${encodeURIComponent(email)}`,
        {
          nombre, // Si el nombre se editó, se envía también
          cursos: updatedCursos,
        }
      );

      if (responseUpdate.status === 200) {
        setModalMessage("Usuario actualizado exitosamente.");
        setIsModalOpen(true);
        setCursos(updatedCursos); // Mantiene los cursos actualizados en el estado
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setModalMessage("El usuario no fue encontrado en la base de datos.");
      } else {
        setModalMessage("Error al actualizar usuario: " + error.message);
      }
      setIsModalOpen(true);
    }
  };

  // NUEVA CONTRASEÑA ---------------------
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setModalMessage("Por favor, completa todos los campos");
      setIsModalOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden");
      setIsModalOpen(true);
      return;
    }

    if (newPassword.length < 8) {
      setModalMessage("La contraseña debe tener al menos 8 caracteres");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/update/password/${email}`,
        {
          password: newPassword,
        }
      );

      if (response.status === 200) {
        setModalMessage("Contraseña actualizada exitosamente.");
        setIsModalOpen(true);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(
          response.data.message || "Error al actualizar la contraseña"
        );
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || "Error al actualizar la contraseña."
      );
      setIsModalOpen(true);
    }
  };
  //---------------------------------------------

  // BORRA USUARIO-------------------------------
  const deleteUser = async () => {
    if (!email) {
      setModalMessage("Por favor, introduce un email.");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/update/usuarios`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setModalMessage(result.message || "Usuario eliminado correctamente.");
        setIsModalOpen(true);
      } else {
        setModalMessage(result.message || "Error al eliminar el usuario.");
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage("Error de conexión al servidor.");
      setIsModalOpen(true);
    }
  };
  //-------------------------------------

  // Restablecer el estado del perfil al montar el componente
  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  const handleCouponChange = async (action) => {
    if (!email) {
      setModalMessage("Por favor, introduce un email.");
      setIsModalOpen(true);
      return;
    }

    try {
      // 1️⃣ Buscar los datos actuales del usuario
      const responseGet = await axios.post(`${API_BASE_URL}/api/search/users`, {
        email,
      });

      if (!responseGet.data) {
        setModalMessage("El usuario no existe en la base de datos.");
        setIsModalOpen(true);
        return;
      }

      const userCursos = responseGet.data.cursos || []; // Cursos actuales del usuario

      // 2️⃣ Agregar o eliminar el cupón según la acción
      let updatedCursos = [...userCursos];

      if (action === "add") {
        if (updatedCursos.includes("Cupon")) {
          setModalMessage("El usuario no tiene un cupón para eliminar.");
          setIsModalOpen(true);
          return;
        }
        updatedCursos.push("Cupon");
      } else if (action === "remove") {
        if (!updatedCursos.includes("Cupon")) {
          setModalMessage("El usuario ya tiene un cupón.");
          setIsModalOpen(true);
          return;
        }
        updatedCursos = updatedCursos.filter((curso) => curso !== "Cupon");
      }

      // 3️⃣ Enviar la actualización
      const responseUpdate = await axios.put(
        `${API_BASE_URL}/api/update/users/${encodeURIComponent(email)}`,
        {
          cursos: updatedCursos,
        }
      );

      if (responseUpdate.status === 200) {
        setModalMessage(
          `Cupón ${action === "add" ? "eliminado" : "agregado"} correctamente.`
        );
        setIsModalOpen(true);
        setCursos(updatedCursos); // Actualizar el estado de los cursos
      }
    } catch (error) {
      setModalMessage(
        `Error al ${action === "add" ? "agregar" : "eliminar"} el cupón.`
      );
      setIsModalOpen(true);
    }
  };

  return (
    <div className="h-full w-screen bg-gray-100 flex flex-col items-center">
      <Navbar />

      <div className="bg-gray-200 w-screen rounded-xl sm:rounded-2xl flex justify-center p-4 shadow-lg mb-5 overflow-x-auto sm:overflow-hidden whitespace-nowrap">
        <div className="flex gap-2 sm:gap-4 mt-16 text-black">
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${
              activeSection === "lanzamiento"
                ? "bg-gray-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("lanzamiento")}
          >
            Lanzamiento
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${
              activeSection === "crear"
                ? "bg-gray-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("crear")}
          >
            Registro
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${
              activeSection === "editar"
                ? "bg-gray-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("editar")}
          >
            Accesos
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${
              activeSection === "cambiarContraseña"
                ? "bg-gray-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("cambiarContraseña")}
          >
            Claves
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${
              activeSection === "eliminar"
                ? "bg-gray-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("eliminar")}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "lanzamiento" && (
        <LanzamientoMasterFade className="mb-5" />
      )}
      {/* Sección para crear usuario */}
      {activeSection === "crear" && (
        <div className="flex  justify-center  bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form
              className="flex flex-col w-full items-center gap-5"
              onSubmit={handleSubmit}
            >
              <div className="w-4/5">
                <label className="block text-black text-sm mb-2">
                  Email de usuario
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="email"
                    value={email}
                    placeholder="ejemplo@correo.com"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-black text-sm mb-2">
                  Nombre
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Cursos
                  <div className="flex flex-col mt-2 space-y-2">
                    <label className="flex items-center justify-between">
                      <span>Focus</span>
                      <input
                        type="checkbox"
                        value="Focus"
                        checked={cursos.includes("Focus")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Master Fade</span>
                      <input
                        type="checkbox"
                        value="Master Fade"
                        checked={cursos.includes("Master Fade")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Cutting Mastery</span>
                      <input
                        type="checkbox"
                        value="Cutting Mastery"
                        checked={cursos.includes("Cutting Mastery")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Colorimetría</span>
                      <input
                        type="checkbox"
                        value="Colorimetria"
                        checked={cursos.includes("Colorimetria")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Growth Barber</span>
                      <input
                        type="checkbox"
                        value="GROWTH BARBER"
                        checked={cursos.includes("GROWTH BARBER")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Master Fade 3.0</span>
                      <input
                        type="checkbox"
                        value="Master Fade 3.0"
                        checked={cursos.includes("Master Fade 3.0")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                  </div>
                </label>
              </div>

              <div className="flex justify-center w-full">
              <button
              className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              type="submit"
              >
              Registrar
              </button>
              </div>
            </form>

            {successMessage && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-lg text-black">
                <p className="text-xl text-black font-bold mb-2">
                  {successMessage}
                </p>
                {createdUser && (
                  <>
                    <p>
                      Plataforma:{" "}
                      <a
                        href="https://plataforma.erickgomezacademy.com/"
                        className="text-blue-400 underline"
                      >
                        plataforma.erickgomezacademy.com
                      </a>
                    </p>
                    <p>Usuario: {createdUser.email}</p>
                    <p>Contraseña: {createdUser.password}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sección para editar usuario */}
      {activeSection === "editar" && (
        <div className="flex  justify-center  bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form
              className="flex flex-col w-full items-center gap-5"
              onSubmit={handleEditUser}
            >
              <div className="w-4/5">
                <label className="text-black text-sm mb-4 text-center">
                  Email de usuario a editar
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    value={email}
                    placeholder="ejemplo@correo.com"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="text-black text-sm mb-4 text-center">
                  Nombre
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>

              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Cursos:
                  <div className="flex flex-col mt-2 space-y-2">
                    <label className="flex items-center justify-between">
                      <span>Focus</span>
                      <input
                        type="checkbox"
                        value="Focus"
                        checked={cursos.includes("Focus")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Master Fade</span>
                      <input
                        type="checkbox"
                        value="Master Fade"
                        checked={cursos.includes("Master Fade")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Cutting Mastery</span>
                      <input
                        type="checkbox"
                        value="Cutting Mastery"
                        checked={cursos.includes("Cutting Mastery")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Colorimetría</span>
                      <input
                        type="checkbox"
                        value="Colorimetria"
                        checked={cursos.includes("Colorimetria")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Growth Barber</span>
                      <input
                        type="checkbox"
                        value="GROWTH BARBER"
                        checked={cursos.includes("GROWTH BARBER")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Master Fade 3.0</span>
                      <input
                        type="checkbox"
                        value="Master Fade 3.0"
                        checked={cursos.includes("Master Fade 3.0")}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                  </div>
                </label>
              </div>

              <div className="flex justify-center w-full">
              <button
              className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              type="submit"
              >
              Actualizar usuario
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeSection === "cambiarContraseña" && (
        <div className="flex  justify-center  bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form
              className="flex flex-col w-full items-center gap-5"
              onSubmit={handlePasswordChange}
            >
              <div className="w-4/5">
                <label className="text-black text-sm mb-4">
                  Email de usuario
                </label>
                <input
                  className="w-full px-4 text-black py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={email}
                  placeholder="ejemplo@correo.com"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </div>
              <div className="w-4/5">
                <label className="text-black text-sm mb-4">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 text-black py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
                      // Ojo abierto (moderno)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    ) : (
                      // Ojo cerrado (moderno)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M2.25 12s3.75-6.75 9.75-6.75c2.28 0 4.36.7 6.13 1.77M21.75 12s-3.75 6.75-9.75 6.75c-2.28 0-4.36-.7-6.13-1.77" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    )}
                  </span>
                </div>
              </div>
              <div className="w-4/5">
                <label className="text-black text-sm mb-4">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 text-black py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      // Ojo abierto (moderno)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    ) : (
                      // Ojo cerrado (moderno)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M2.25 12s3.75-6.75 9.75-6.75c2.28 0 4.36.7 6.13 1.77M21.75 12s-3.75 6.75-9.75 6.75c-2.28 0-4.36-.7-6.13-1.77" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-full">
              <button
              className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              type="submit"
              >
              Cambiar contraseña
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeSection === "eliminar" && (
        <div className="flex  justify-center  bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <p className="text-black text-sm mb-4 text-left">
              Introduce el email del usuario que deseas eliminar
            </p>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-center w-full">
            <button
            className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick={deleteUser}
            >
            Eliminar
            </button>
            </div>
            {responseMessage && (
              <div className={`mt-4 text-sm ${responseColor}`}>
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para errores */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="text-black text-center">
            <p className="whitespace-pre-wrap">{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PanelControl;
