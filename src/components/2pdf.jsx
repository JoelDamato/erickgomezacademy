import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import PDFViewerNoDownload from "./Ebook/PDFBookViewer";
import PDFBookViewer from "./Ebook/PDFBookViewer";
import { Link, useParams, useNavigate } from "react-router-dom";
const Ebook = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="p-5 text-4xl md:text-6xl font-bold text-center text-transparent bg-gradient-to-b from-white/60 to-yellow-800 bg-clip-text drop-shadow-lg tracking-wide">
          Master Fade 3.0
        </h1>
  
        <main className="flex flex-col items-center justify-center w-full max-w-4xl mt-3 p-4 rounded-lg shadow-lg">
          <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://drive.google.com/file/d/1w3lg-5RhjtBd7VmTuxadL6Dj9s15Z-Os/preview"
              width="100%"
              height="100%"
              allow="autoplay"
              className="rounded-lg"
            />
          </div>
        </main>
  
        <footer className="mt-6 flex flex-col md:flex-row gap-4">
          <a href="/Dashboard">
            <button className="bg-black border border-white text-white py-2 px-6 rounded-lg shadow-md transition">
              Home
            </button>
          </a>
        </footer>
      </div>
    );
  };
  
  export default Ebook;
  