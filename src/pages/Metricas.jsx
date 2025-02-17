import { useEffect, useState } from "react";

const API_URL = "https://plausible.io/api/stats/aggregate?site_id=plataforma.erickgomezacademy.com&period=30d&metrics=visitors,pageviews&filters=event:page%3D%3D/curses";

function Metrics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer TU_API_KEY`, // Reemplaza con tu API Key de Plausible
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Métricas de /curses</h2>
      {data ? (
        <p>👤 Visitantes: {data.results.visitors.value} | 📄 Páginas vistas: {data.results.pageviews.value}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Metrics;
