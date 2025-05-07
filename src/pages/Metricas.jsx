"use client"

import { useState, useEffect } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts"
import { Users, BookOpen, UserCheck, Clock, Ticket, Search } from "lucide-react"
import axios from "axios"
import Navbar from "../components/Navbar"
import SeguimientoCurso from "../components/ProgresoUsuario"
import MetricasAds from "../components/MetaAds"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF69B4", "#4BC0C0", "#36A2EB"]

const Metricas = () => {
  const [metricsData, setMetricsData] = useState({ totalUsers: 0, courses: {}, roles: {}, usersPerDay: {} })
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabSeleccionado, setTabSeleccionado] = useState("metricas")
  const itemsPorPagina = 25
  const [paginaCurso1, setPaginaCurso1] = useState(0)
  const [paginaCurso2a5, setPaginaCurso2a5] = useState(0)
  const [paginaCurso6, setPaginaCurso6] = useState(0)
  const [busqueda, setBusqueda] = useState("")

  const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://back-cursos.onrender.com"
    : "http://localhost:5000"

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token")
        const resMetrics = await axios.get(`${API_BASE_URL}/api/search/totalsusers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMetricsData(resMetrics.data)

        const resUsuarios = await axios.get(`${API_BASE_URL}/api/search/usuarios`)
        setUsuarios(resUsuarios.data)

        setLoading(false)
      } catch (err) {
        console.error("Error cargando datos:", err)
        setError("Error al cargar las métricas")
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const prepareCourseData = () => Object.entries(metricsData.courses || {})
    .filter(([name]) => name !== "Cupon")
    .map(([name, value]) => ({ name, estudiantes: value }))

  const calculateTopCourse = () => {
    const filtered = Object.entries(metricsData.courses || {}).filter(([name]) => name !== "Cupon")
    if (filtered.length === 0) return { name: "N/A", estudiantes: 0 }
    filtered.sort((a, b) => b[1] - a[1])
    return { name: filtered[0][0], estudiantes: filtered[0][1] }
  }

  const totalEnrollments = Object.entries(metricsData.courses || {})
    .filter(([name]) => name !== "Cupon")
    .reduce((total, [, count]) => total + count, 0)

  const topCourse = calculateTopCourse()
  const courseData = prepareCourseData()
  const getCouponUsage = () => metricsData.courses?.Cupon || 0

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
    const filtrados = lista.filter((u) => {
      const texto = `${u.nombre} ${u.email}`.toLowerCase()
      return texto.includes(busqueda.toLowerCase())
    })
    const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina)
    const visibles = filtrados.slice(pagina * itemsPorPagina, (pagina + 1) * itemsPorPagina)

    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full lg:w-[300px] text-black">
        <h2 className="text-base font-semibold mb-2">{title}</h2>
        <ul className="space-y-1">
          {visibles.map((user, i) => (
            <li key={i} className="border-b pb-1 text-xs">
              <details>
                <summary className="cursor-pointer font-medium text-xs">
                  {user.nombre || user.email} ({user.email}) - {user.cantidadCursos} curso{user.cantidadCursos > 1 ? 's' : ''}
                </summary>
                <ul className="ml-4 list-disc text-[11px] text-gray-600">
                  {user.cursos.map((curso, idx) => <li key={idx}>{curso}</li>)}
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
            >{i + 1}</button>
          ))}
        </div>
      </div>
    )
  }

  const usuariosCon1Curso = usuarios.filter(u => u.cantidadCursos === 1)
  const usuariosDe2a5Cursos = usuarios.filter(u => u.cantidadCursos >= 2 && u.cantidadCursos <= 5)
  const usuariosCon6OMas = usuarios.filter(u => u.cantidadCursos >= 6)

  if (loading) return <div className="flex justify-center items-center h-screen text-black"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
  if (error) return <div className="flex justify-center items-center h-screen text-black"><div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div></div>

  return (
    <>
      <Navbar />

      <div className="bg-white shadow-sm mt-14 border-b mb-6 text-black">
        <div className="max-w-screen-xl mx-auto flex justify-center gap-4 py-3">
          {"metricas meta progreso".split(" ").map((tab) => (
            <button
              key={tab}
              onClick={() => setTabSeleccionado(tab)}
              className={`px-4 py-2 rounded ${tabSeleccionado === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {tab === "metricas" ? "Métricas Plataforma" : tab === "meta" ? "Meta ADS" : "Progreso de Usuarios"}
            </button>
          ))}
        </div>
      </div>

      {tabSeleccionado === "metricas" && (
        <div className="bg-gray-100 p-6 w-full min-h-screen text-black">
          <h1 className="text-3xl font-bold mb-6">Dashboard de Métricas</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={<Users size={24} className="text-white" />} title="Usuarios Totales" value={metricsData.totalUsers.toLocaleString()} subtitle="Usuarios registrados" color="bg-blue-500" />
            <StatCard icon={<BookOpen size={24} className="text-white" />} title="Total Inscripciones" value={totalEnrollments.toLocaleString()} subtitle="Inscripciones a cursos" color="bg-purple-500" />
            <StatCard icon={<UserCheck size={24} className="text-white" />} title="Curso Más Popular" value={topCourse.name} subtitle={`${topCourse.estudiantes.toLocaleString()} estudiantes`} color="bg-green-500" />
            <StatCard icon={<Clock size={24} className="text-white" />} title="Cursos Disponibles" value={Object.keys(metricsData.courses || {}).filter(name => name !== "Cupon").length} subtitle="Cursos activos" color="bg-orange-500" />
            <StatCard icon={<Ticket size={24} className="text-white" />} title="Cupones Usados" value={getCouponUsage().toLocaleString()} subtitle="Total de cupones" color="bg-pink-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md col-span-4 text-black">
              <h2 className="text-lg font-semibold mb-4">Buscar Usuario por Nombre o Email</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <Search className="text-gray-500" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md col-span-2 text-black">
              <h2 className="text-lg font-semibold mb-4">Distribución de Estudiantes por Curso</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} estudiantes`, "Cantidad"]} />
                  <Bar dataKey="estudiantes" fill="#8884d8">
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {renderUsuariosPaginated(usuariosCon1Curso, "Usuarios con 1 Curso", paginaCurso1, setPaginaCurso1)}
            {renderUsuariosPaginated(usuariosDe2a5Cursos, "Usuarios con 2 a 5 Cursos", paginaCurso2a5, setPaginaCurso2a5)}
            {renderUsuariosPaginated(usuariosCon6OMas, "Usuarios con 6 o más Cursos", paginaCurso6, setPaginaCurso6)}
          </div>
        </div>
      )}

      {tabSeleccionado === "meta" && (
        <div className="p-6 bg-gray-100 min-h-screen text-black">
          <h1 className="text-2xl font-bold mb-4">Métricas Meta ADS</h1>
          <MetricasAds />
        </div>
      )}

      {tabSeleccionado === "progreso" && (
        <div className="p-6 bg-gray-100 min-h-screen text-black">
          <h1 className="text-2xl font-bold mb-4">Progreso de Usuarios</h1>
          <SeguimientoCurso />
        </div>
      )}
    </>
  )
}

export default Metricas
