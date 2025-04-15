import { useState, useEffect } from "react"

const API_BASE_URL = import.meta.env.PROD
  ? "https://back-cursos.onrender.com"
  : "http://localhost:5000"

export default function ClicksDashboard() {
  const [clicks, setClicks] = useState([])
  const [tab, setTab] = useState("dia")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("")
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("")

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/getclicks`)
        const data = await res.json()
        setClicks(data)
      } catch (err) {
        console.error("Error al obtener clicks:", err)
      }
    }
    fetchClicks()
  }, [])

  const agruparPor = (modo, datos) => {
    const agrupado = {}
    datos.forEach((item) => {
      const fecha = new Date(item.fecha)
      let key = ""

      if (modo === "mes") {
        key = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`
      } else if (modo === "semana") {
        const oneJan = new Date(fecha.getFullYear(), 0, 1)
        const numberOfDays = Math.floor((fecha - oneJan) / (24 * 60 * 60 * 1000))
        const week = Math.ceil((fecha.getDay() + 1 + numberOfDays) / 7)
        key = `${fecha.getFullYear()}-W${week.toString().padStart(2, "0")}`
      } else {
        key = fecha.toISOString().split("T")[0]
      }

      if (!agrupado[key]) agrupado[key] = {}
      agrupado[key][item.curso] = (agrupado[key][item.curso] || 0) + 1
    })
    return agrupado
  }

  const proyectosUnicos = Array.from(new Set(clicks.map((c) => c.proyecto)))
  const cursosUnicos = Array.from(new Set(clicks.map((c) => c.curso)))

  const clicksFiltrados = proyectoSeleccionado
    ? clicks.filter((c) => c.proyecto === proyectoSeleccionado)
    : clicks

  const agrupadoPorDia = agruparPor("dia", clicksFiltrados)
  const agrupadoPorSemana = agruparPor("semana", clicksFiltrados)
  const agrupadoPorMes = agruparPor("mes", clicksFiltrados)

  const filtrarPorRango = (agrupado) => {
    return Object.entries(agrupado).filter(([fecha]) => {
      return (!fechaDesde || fecha >= fechaDesde) && (!fechaHasta || fecha <= fechaHasta)
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Filtro de Proyecto */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Filtrar por proyecto:</label>
        <select
          value={proyectoSeleccionado}
          onChange={(e) => setProyectoSeleccionado(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          {proyectosUnicos.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("dia")}
          className={`px-4 py-2 rounded ${tab === "dia" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Por Día
        </button>
        <button
          onClick={() => setTab("semana")}
          className={`px-4 py-2 rounded ${tab === "semana" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Por Semana
        </button>
        <button
          onClick={() => setTab("mes")}
          className={`px-4 py-2 rounded ${tab === "mes" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Por Mes
        </button>
      </div>

      {/* Contenido por tab */}
      {tab === "dia" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Clicks por Día</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <TablaDatos
            datos={filtrarPorRango(agrupadoPorDia)}
            cursos={cursosUnicos}
            encabezado="Fecha"
          />
        </div>
      )}

      {tab === "semana" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Clicks por Semana</h2>
          <div className="mb-4">
            <label className="mr-2">Seleccionar semana:</label>
            <select
              value={semanaSeleccionada}
              onChange={(e) => setSemanaSeleccionada(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todas</option>
              {Object.keys(agrupadoPorSemana).map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <TablaDatos
            datos={
              semanaSeleccionada
                ? [[semanaSeleccionada, agrupadoPorSemana[semanaSeleccionada]]]
                : Object.entries(agrupadoPorSemana)
            }
            cursos={cursosUnicos}
            encabezado="Semana"
          />
        </div>
      )}

      {tab === "mes" && (
        <div>
          <h2 className="text-lg font-bold mb-2">Clicks por Mes</h2>
          <TablaDatos
            datos={Object.entries(agrupadoPorMes)}
            cursos={cursosUnicos}
            encabezado="Mes"
          />
        </div>
      )}
    </div>
  )
}

function TablaDatos({ datos, cursos, encabezado }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">{encabezado}</th>
            {cursos.map((curso, idx) => (
              <th key={idx} className="px-4 py-2 border">{curso}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map(([fecha, clicks], i) => (
            <tr key={i} className="text-center">
              <td className="px-4 py-2 border font-medium">{fecha}</td>
              {cursos.map((curso, idx) => (
                <td key={idx} className="px-4 py-2 border">{clicks?.[curso] || 0}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
