import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://back-cursos.onrender.com'
  : 'http://localhost:5000';

const SeguimientoGlobal = () => {
  const [progreso, setProgreso] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProgreso, resCursos] = await Promise.all([
          fetch(`${API_BASE_URL}/api/progresoget`),
          fetch(`${API_BASE_URL}/api/courses/getcourses`),
        ]);
        const progresoData = await resProgreso.json();
        const cursosData = await resCursos.json();

        setProgreso(progresoData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const agrupadoPorCurso = progreso.reduce((acc, item) => {
    if (!acc[item.cursoId]) acc[item.cursoId] = {};
    if (!acc[item.cursoId][item.email]) acc[item.cursoId][item.email] = [];
    acc[item.cursoId][item.email].push(item);
    return acc;
  }, {});

  const cursosDisponibles = Object.keys(agrupadoPorCurso);

  // 🔢 Calcular avance promedio por curso
  const calcularAvancePorCurso = () => {
    return cursos.map((curso) => {
      const totalCapitulos = curso.chapters.length;
      const cursoId = curso.courseTitle.toLowerCase().replace(/\s+/g, "-");

      const progresosCurso = progreso.filter((p) => p.cursoId === cursoId);
      const progresosPorUsuario = progresosCurso.reduce((acc, p) => {
        if (!acc[p.email]) acc[p.email] = [];
        acc[p.email].push(p);
        return acc;
      }, {});

      const porcentajes = Object.values(progresosPorUsuario).map((items) => {
        const completados = items.filter((i) => i.estado === "completado").length;
        return (completados / totalCapitulos) * 100;
      });

      const promedioAvance = porcentajes.length
        ? porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length
        : 0;

      return {
        curso: curso.courseTitle,
        avance: promedioAvance.toFixed(1),
      };
    });
  };

  const progresoCursos = calcularAvancePorCurso();

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-6">Seguimiento Global de Usuarios</h2>

      {/* Select de cursos */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Seleccioná un curso:</label>
        <select
          className="p-2 rounded border border-gray-300"
          value={cursoSeleccionado}
          onChange={(e) => setCursoSeleccionado(e.target.value)}
        >
          <option value="">-- Elegí un curso --</option>
          {cursosDisponibles.map((curso, i) => (
            <option key={i} value={curso}>
              {curso}
            </option>
          ))}
        </select>
      </div>

      {cursoSeleccionado && (
        <div className="mb-12 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{cursoSeleccionado}</h3>

          {Object.entries(agrupadoPorCurso[cursoSeleccionado]).map(([email, items], idxUser) => (
            <div key={idxUser} className="mb-6">
              <p className="text-sm font-semibold mb-2">{email}</p>
              <div className="flex flex-wrap gap-3">
                {items.map((item, i) => {
                  let color = "bg-gray-300";
                  if (item.estado === "en_progreso") color = "bg-yellow-300 animate-pulse";
                  if (item.estado === "completado") color = "bg-green-400";

                  return (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xs font-bold text-black`}>
                        {i + 1}
                      </div>
                      <span className="text-[10px] mt-1">{item.capituloId}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📊 Barra de avance promedio por curso */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4">Avance Promedio por Curso</h2>
        {progresoCursos.map((curso, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{curso.curso}</span>
              <span>{curso.avance}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${curso.avance}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeguimientoGlobal;
