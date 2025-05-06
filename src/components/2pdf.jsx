import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Ebook = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="p-5 text-1xl md:text-6xl font-bold text-center text-transparent bg-gradient-to-b from-white/60 to-yellow-800 bg-clip-text drop-shadow-lg tracking-wide">
      Descarga y edúcate con nuestros recursos de la semana de Fade
      </h1>

      <main className="flex flex-col items-center justify-center w-full max-w-4xl mt-3 p-4 rounded-lg shadow-lg">
        <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-lg mb-4">
          <iframe
            src="https://drive.google.com/file/d/1r-C4TthLISg5zFyYQZNqJOvGF6sX2fZl/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            className="rounded-lg"
          />
        </div>
        <a
          href="https://drive.google.com/u/0/uc?id=1r-C4TthLISg5zFyYQZNqJOvGF6sX2fZl&export=download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mb-10 bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md hover:bg-yellow-800 transition">
            Descargar PDF 1
          </button>
        </a>

        <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-lg mb-4">
          <iframe
            src="https://drive.google.com/file/d/1w3lg-5RhjtBd7VmTuxadL6Dj9s15Z-Os/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            className="rounded-lg"
          />
        </div>
        <a
          href="https://drive.google.com/u/0/uc?id=1w3lg-5RhjtBd7VmTuxadL6Dj9s15Z-Os&export=download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mb-6 bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md hover:bg-yellow-800 transition">
            Descargar PDF 2
          </button>
        </a>
      </main>

      <footer className="mb-10">
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
