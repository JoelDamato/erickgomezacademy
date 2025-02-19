import { useEffect, useState } from "react";

const API_URL = "https://plausible.io/api/v2/query";
const API_KEY = "UmPnzDxkjPQGQWWmndV0sDHOPmt3yp_WgcQ_o7NL-cZPtVuYNhGX5VNMbiGQrg-W"; // Tu API Key aquí

function Metrics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 Enviando solicitud a Plausible...");

    fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site_id: "plataforma.erickgomezacademy.com",
        metrics: ["visitors", "pageviews", "bounce_rate"],
        date_range: "7d",
        filters: [
          ["is_not", "visit:country_name", [""]] // Filtrar datos sin país
        ],
        dimensions: ["visit:country_name", "visit:city_name", "visit:day"]
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("📊 Datos recibidos de Plausible:", json);

        if (json.results.length > 0) {
          const groupedByDate = {};
          json.results.forEach((entry) => {
            const date = entry.dimensions[2]; // Fecha
            if (!groupedByDate[date]) {
              groupedByDate[date] = [];
            }
            groupedByDate[date].push({
              country: entry.dimensions[0],
              city: entry.dimensions[1],
              visitors: entry.metrics ? entry.metrics[0] || 0 : 0,
              pageviews: entry.metrics ? entry.metrics[1] || 0 : 0,
              bounceRate: entry.metrics ? entry.metrics[2] || 0 : 0
            });
          });

          setData(groupedByDate);
        } else {
          console.warn("⚠️ `results` está vacío, no hay datos disponibles.");
          setData(null);
        }
      })
      .catch((err) => {
        console.error("❌ Error al obtener métricas:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-5">
      <h2 className="text-2xl font-bold text-center mb-4">📊 Métricas de la Plataforma</h2>
      {error ? (
        <p className="text-red-500 text-center">⚠️ Error: {error}</p>
      ) : data ? (
        <div className="space-y-6">
          {Object.entries(data).map(([date, metrics]) => (
            <div key={date} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">📅 {date}</h3>
              <ul className="divide-y divide-gray-700">
                {Array.isArray(metrics) ? metrics.map((location, index) => (
                  <li key={index} className="py-2">
                    <p className="text-lg">📍 {location.city}, {location.country}</p>
                    <p className="text-sm text-gray-300">👤 Visitantes: {location.visitors}</p>
                    <p className="text-sm text-gray-300">📄 Páginas vistas: {location.pageviews}</p>
                    <p className="text-sm text-gray-300">📉 Bounce Rate: {location.bounceRate}%</p>
                  </li>
                )) : <p className="text-gray-400">No hay datos disponibles para esta fecha.</p>}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Cargando...</p>
      )}
    </div>
  );
}

export default Metrics;
