"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import ProgresoUsuario from "../components/ProgresoUsuario"
import Searchusers from "../components/Searchusers"

const Csm = () => {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://back-cursos.onrender.com"
    : "http://localhost:5000"

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/search/usuarios`)
        setUsuarios(res.data)
        setLoading(false)
      } catch (err) {
        setError("Error al cargar los usuarios")
        setLoading(false)
      }
    }
    fetchUsuarios()
  }, [])

  const usuariosFiltrados = usuarios
    .filter(u => `${u.nombre} ${u.email}`.toLowerCase().includes(busqueda.toLowerCase()))
    .filter(u => u.Csm && u.Csm !== "")

  if (loading) return <div className="text-center text-black p-10">Cargando...</div>
  if (error) return <div className="text-center text-red-600 p-10">{error}</div>

  return (
    <>
      <Navbar />
      <div className="pt-20 p-6 bg-gray-100 min-h-screen text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">CSM</h1>
<ProgresoUsuario/>
<Searchusers/>
       

     
      </div>
    </>
  )
}

export default Csm
