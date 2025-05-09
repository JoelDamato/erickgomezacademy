import { useEffect, useState } from "react"
import axios from "axios"
import { Search } from "lucide-react"

const UsuariosPorCursos = () => {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [paginaCurso1, setPaginaCurso1] = useState(0)
  const [paginaCurso2a5, setPaginaCurso2a5] = useState(0)
  const [paginaCurso6, setPaginaCurso6] = useState(0)
  const itemsPorPagina = 25

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://back-cursos.onrender.com"
      : "http://localhost:5000"

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/search/usuarios`)
      .then(res => {
        console.log("📦 Usuarios completos:", res.data)
        if (Array.isArray(res.data)) {
          // Agregamos cantidadCursos a cada usuario
          const procesados = res.data.map(u => ({
            ...u,
            cantidadCursos: u.cursos?.length || 0
          }))
          setUsuarios(procesados)
        } else {
          console.error("La respuesta no es un array")
        }
      })
      .catch(err => console.error('Error cargando usuarios', err))
  }, [])

  const renderUsuariosPaginated = (lista, title, pagina, setPagina) => {
    const filtrados = lista.filter((u) =>
      `${u.nombre} ${u.email}`.toLowerCase().includes(busqueda.toLowerCase())
    )
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

  const usuariosCon1Curso = usuarios.filter(u => u.cantidadCursos === 1)
  const usuariosDe2a5Cursos = usuarios.filter(u => u.cantidadCursos >= 2 && u.cantidadCursos <= 5)
  const usuariosCon6OMas = usuarios.filter(u => u.cantidadCursos >= 6)

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md w-full text-black">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {renderUsuariosPaginated(usuariosCon1Curso, "Usuarios con 1 Curso", paginaCurso1, setPaginaCurso1)}
        {renderUsuariosPaginated(usuariosDe2a5Cursos, "Usuarios con 2 a 5 Cursos", paginaCurso2a5, setPaginaCurso2a5)}
        {renderUsuariosPaginated(usuariosCon6OMas, "Usuarios con 6 o más Cursos", paginaCurso6, setPaginaCurso6)}
      </div>
    </div>
  )
}

export default UsuariosPorCursos
