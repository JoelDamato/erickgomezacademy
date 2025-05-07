import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopupImportante() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const target = 87;

  useEffect(() => {
    if (progress < target) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= target) {
            clearInterval(interval);
            return target;
          }
          return prev + 1;
        });
      }, 15); // velocidad (ajustable)
      return () => clearInterval(interval);
    }
  }, [progress, target]);

  return (
    <AnimatePresence>
      {visible && (
  <motion.div
  className="fixed inset-0 z-30 bg-black/70 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Barra de Progreso */}
            <div className="relative h-5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-600 shadow-inner mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-sm text-black font-bold">
                {progress}% LUGARES LLENOS
              </span>
            </div>

            {/* Contenido */}
            <div className="bg-zinc-800 rounded-xl border border-zinc-700 shadow-md p-6 space-y-4 text-gray-300 text-center">
              <h3 className="text-4xl font-bold text-white"> ¡ESTO ES IMPORTANTE!</h3>
              <p className="text-sm">
                Erick está reformulando la academia… y podrías quedar fuera si no lees esto ahora.
              </p>
              <p className="text-sm">
                Erick está construyendo una nueva generación de barberos profesionales.<br />
                Solo los que entren al <span className="text-yellow-400 font-semibold">Grupo VIP</span> van a poder acceder al nuevo sistema y niveles.<br />
                Si no entrás ahora, no vas a recibir la información completa ni asegurar tu lugar.
              </p>

              <a
                href="https://group.wha.link/axkWBe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:from-lime-300 hover:to-green-400 text-black font-bold py-2 px-6 rounded-2xl transition duration-200"
              >
                UNIRME AL GRUPO VIP AHORA
              </a>

              <p className="text-xs text-gray-500">
                Tus cursos anteriores siguen disponibles. Este acceso es para el nuevo sistema educativo.
              </p>

              <button
                onClick={() => setVisible(false)}
                className="mt-4 bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
