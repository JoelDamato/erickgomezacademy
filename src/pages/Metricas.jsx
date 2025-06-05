"use client"

import { useState, useEffect } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts"
import { Users, BookOpen, UserCheck, Clock, Ticket, Search } from "lucide-react"
import axios from "axios"
import Navbar from "../components/Navbar"
import SeguimientoCurso from "../components/ProgresoUsuario"
import API_BASE_URL from "../api_base";
import Spinner from "../components/Spinner"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF69B4", "#4BC0C0", "#36A2EB"]

const Metricas = () => {
  const [metricsData, setMetricsData] = useState({ totalUsers: 0, courses: {} })
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const itemsPorPagina = 25
  const [paginaCurso1, setPaginaCurso1] = useState(0)
  const [paginaCurso2a5, setPaginaCurso2a5] = useState(0)
  const [paginaCurso6, setPaginaCurso6] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")

        const resMetrics = await axios.get(`${API_BASE_URL}/api/search/totalsusers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMetricsData(resMetrics.data)

        const resUsuarios = await axios.get(`${API_BASE_URL}/api/search/usuarios`)
        const usuariosConCantidad = resUsuarios.data.map(u => ({
          ...u,
          cantidadCursos: u.cursos?.length || 0
        }))
        setUsuarios(usuariosConCantidad)
        setLoading(false)
      } catch (err) {
        console.error("Error cargando datos:", err)
        setError("Error al cargar las métricas")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const usuariosConMasterFade = usuarios.filter(u => Array.isArray(u.cursos) && u.cursos.includes("Master Fade 3.0"))
  const precioUSD = 47
  const totalRecaudado = usuariosConMasterFade.length * precioUSD

  const usuariosFiltrados = usuariosConMasterFade.filter(u => `${u.nombre} ${u.email}`.toLowerCase().includes(busqueda.toLowerCase()))

  const usuariosCon1Curso = usuariosFiltrados.filter(u => u.cantidadCursos === 1)
  const usuariosDe2a5Cursos = usuariosFiltrados.filter(u => u.cantidadCursos >= 2 && u.cantidadCursos <= 5)
  const usuariosCon6OMas = usuariosFiltrados.filter(u => u.cantidadCursos >= 6)

  const prepareCourseData = () =>
    Object.entries(metricsData.courses || {})
      .filter(([name]) => name !== "Cupon")
      .map(([name, value]) => ({ name, estudiantes: value }))

  const totalEnrollments = Object.entries(metricsData.courses || {})
    .filter(([name]) => name !== "Cupon")
    .reduce((total, [, count]) => total + count, 0)

  const topCourse = Object.entries(metricsData.courses || {})
    .filter(([name]) => name !== "Cupon")
    .sort((a, b) => b[1] - a[1])[0] || ["N/A", 0]

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col text-black">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        <span className="ml-2 font-medium text-sm">{title}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">{value}</span>
        {subtitle && <span className="text-xs">{subtitle}</span>}
      </div>
    </div>
  )

  const renderUsuariosPaginated = (lista, title, pagina, setPagina) => {
    const totalPaginas = Math.ceil(lista.length / itemsPorPagina)
    const visibles = lista.slice(pagina * itemsPorPagina, (pagina + 1) * itemsPorPagina)

    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full lg:w-[300px] text-black">
        <h2 className="text-base font-semibold mb-2">{title}</h2>
        <ul className="space-y-1">
          {visibles.map((user, i) => (
            <li key={i} className="border-b pb-1 text-xs">
              <details>
                <summary className="cursor-pointer font-medium text-xs">
                  {user.nombre || user.email} ({user.email}) - {user.cantidadCursos} curso{user.cantidadCursos > 1 ? "s" : ""}
                </summary>
                <ul className="ml-4 list-disc text-[11px] text-gray-600">
                  {user.cursos?.map((curso, idx) => <li key={idx}>{curso}</li>)}
                </ul>
              </details>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={`text-xs px-2 py-1 rounded ${i === pagina ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (loading) return <div className="flex justify-center items-center h-screen text-black">
    <Spinner />
    </div>
  if (error) return <div className="flex justify-center items-center h-screen text-black"><div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div></div>

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 p-6 w-full min-h-screen text-black pt-14">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Métricas</h1>

        <div className="bg-white p-6 rounded-lg shadow-md text-black text-center mb-6 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-4xl font-bold">Master Fade 3.0</h1>
          <p className="text-2xl text-gray-700">
            Total usuarios con este curso: <span className="font-bold">{usuariosConMasterFade.length}</span>
          </p>
          <p className="text-2xl text-gray-700">
            Recaudación estimada: <span className="font-bold text-green-600">USD ${totalRecaudado.toLocaleString()}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={<Users size={24} className="text-white" />} title="Usuarios Totales" value={metricsData.totalUsers.toLocaleString()} subtitle="Usuarios registrados" color="bg-blue-500" />
          <StatCard icon={<BookOpen size={24} className="text-white" />} title="Total Inscripciones" value={totalEnrollments.toLocaleString()} subtitle="Inscripciones a cursos" color="bg-purple-500" />
          <StatCard icon={<UserCheck size={24} className="text-white" />} title="Curso Más Popular" value={topCourse[0]} subtitle={`${topCourse[1].toLocaleString()} estudiantes`} color="bg-green-500" />
          <StatCard icon={<Clock size={24} className="text-white" />} title="Cursos Disponibles" value={Object.keys(metricsData.courses || {}).filter(name => name !== "Cupon").length} subtitle="Cursos activos" color="bg-orange-500" />
          <StatCard icon={<Ticket size={24} className="text-white" />} title="Cupones Usados" value={metricsData.courses?.Cupon?.toLocaleString() || 0} subtitle="Total de cupones" color="bg-pink-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-full text-black">
            <h2 className="text-lg font-semibold mb-4">Distribución de Estudiantes por Curso</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={prepareCourseData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} estudiantes`, "Cantidad"]} />
                <Bar dataKey="estudiantes" fill="#8884d8">
                  {prepareCourseData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

         
        </div>

 
      </div>
    </>
  )
}

export default Metricas
