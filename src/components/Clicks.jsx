import { useEffect, useState } from "react"

const API_BASE_URL = import.meta.env.PROD
  ? "https://back-cursos.onrender.com"
  : "http://localhost:5000"

const agruparClicks = (data, modo, cursoSeleccionado) => {
  const agrupado = {}

  data.forEach((item) => {
    if (cursoSeleccionado !== "todos" && item.curso !== cursoSeleccionado) return

    const fecha = new Date(item.fecha)
    let key = ""

    if (modo === "dia") {
      key = fecha.toISOString().split("T")[0]
    } else if (modo === "semana") {
      key = `Semana ${getWeekNumber(fecha)}`
    } else if (modo === "mes") {
      key = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`
    }

    if (!agrupado[key]) agrupado[key] = {}
    agrupado[key][item.curso] = (agrupado[key][item.curso] || 0) + 1
  })

  return agrupado
}

function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDay) / 86400000
  return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7)
}

export default function ClicksDeCompra() {
  const [clicks, setClicks] = useState([])
  const [modoAgrupacion, setModoAgrupacion] = useState("dia")
  const [cursoSeleccionado, setCursoSeleccionado] = useState("todos")

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

  const cursosUnicos = Array.from(new Set(clicks.map((c) => c.curso)))
  const agrupado = agruparClicks(clicks, modoAgrupacion, cursoSeleccionado)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clicks de Compra</h2>
        <div className="flex gap-4">
          <select
            value={modoAgrupacion}
            onChange={(e) => setModoAgrupacion(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="dia">Por Día</option>
            <option value="semana">Por Semana</option>
            <option value="mes">Por Mes</option>
          </select>

          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="todos">Todos los cursos</option>
            {cursosUnicos.map((curso, idx) => (
              <option key={idx} value={curso}>{curso}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Periodo</th>
              {(cursoSeleccionado === "todos" ? cursosUnicos : [cursoSeleccionado]).map((curso, idx) => (
                <th key={idx} className="px-4 py-2 border">{curso}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(agrupado).map(([periodo, data], i) => (
              <tr key={i} className="text-center">
                <td className="px-4 py-2 border">{periodo}</td>
                {(cursoSeleccionado === "todos" ? cursosUnicos : [cursoSeleccionado]).map((curso, idx) => (
                  <td key={idx} className="px-4 py-2 border">
                    {data[curso] || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
