import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import PDFViewerNoDownload from "./Ebook/PDFBookViewer";
import PDFBookViewer from "./Ebook/PDFBookViewer";
import { Link, useParams, useNavigate } from "react-router-dom";

const Ebook = () => {
  const defaultLayout = defaultLayoutPlugin();

  // Ruta del PDF
  const pdfUrl = "/lanzamiento.pdf"; // Asegúrate de que este archivo esté en `public`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Encabezado */}
      <h1 className="p-5 text-4xl md:text-6xl font-bold text-center text-transparent bg-gradient-to-b from-white/60 to-yellow-800 bg-clip-text drop-shadow-lg tracking-wide">
            Master Fade 3.0
          </h1>

      {/* Contenedor del visor PDF */}
      <main className="flex flex-col items-center justify-center w-full max-w-4xl mt-3 p-4  rounded-lg shadow-lg">
        <div className="w-full h-[75vh]  rounded-lg overflow-hidden shadow-lg">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <PDFBookViewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      </main>

      {/* Botones opcionales para interacción */}
      <footer className="mt-6 flex flex-col md:flex-row gap-4">
        <Link to="/Dashboard">
          <button className="bg-black border-1 border-white  text-white py-2 px-6 rounded-lg shadow-md transition">
            Home
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Ebook;
