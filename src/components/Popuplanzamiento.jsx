import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../api_base";


export default function PopupImportante() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const target = 97;

  const LAST_POPUP_KEY = 'lastPopupShown';
  const POPUP_COUNT_KEY = 'popupCount';
  const HOURS_DELAY = 5;
  const MAX_VIEWS = 3;

  useEffect(() => {
    const checkCursos = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      if (!email || !token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/search/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        const hasCurso = data?.cursos?.includes('Master Fade 3.0');

        if (!hasCurso) {
          const lastShown = localStorage.getItem(LAST_POPUP_KEY);
          const viewCount = parseInt(localStorage.getItem(POPUP_COUNT_KEY) || '0', 10);
          const now = Date.now();

          if ((!lastShown || now - parseInt(lastShown) > HOURS_DELAY * 60 * 60 * 1000) && viewCount < MAX_VIEWS) {
            setVisible(true);
            localStorage.setItem(LAST_POPUP_KEY, now.toString());
            localStorage.setItem(POPUP_COUNT_KEY, (viewCount + 1).toString());
          }
        }
      } catch (err) {
        console.error('❌ Error al consultar cursos:', err);
      }
    };

    checkCursos();
  }, []);

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
      }, 15);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-30 bg-black/70 flex items-center justify-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto max-h-[90vh] overflow-y-auto text-xs md:text-sm"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="relative h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-600 shadow-inner mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-red-800 transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">
                {progress}% LUGARES LLENOS
              </span>
            </div>

            <div className="bg-zinc-800 rounded-xl border border-zinc-700 shadow-md p-4 text-gray-300 text-center space-y-2 overflow-hidden">
              <h3 className="text-base md:text-lg font-extrabold text-white leading-snug">
                ¡ATENCIÓN! Accede al nuevo Sistema Educativo…
              </h3>

              <img
                src="https://i.ibb.co/JjcQVCsL/MOKUP.png"
                alt="Master Fade 3.0"
                className="w-full rounded"
              />

              <p className="text-[13px] leading-snug mt-2">
                Erick está creando una nueva generación de barberos profesionales. Esto no es solo un curso de cortes…
                <br /> Es el primer paso del nuevo sistema educativo para aprender la técnica que lo hizo viral,
                mejorar tus resultados rápido y empezar a construir tu nombre propio en la barbería y en las redes.
              </p>

              <p className="text-[13px] font-semibold  leading-snug">
                Hablá ahora mismo con un representante de Erick para inscribirte y asegurar tu acceso.
              </p>

              <a
                href="https://wa.me/59891640623?text=Hola,%20quiero%20inscribirme%20al%20Master%20Fade%203.0%20y%20asegurar%20mi%20lugar"
                target="_blank"
                rel="noopener noreferrer"
                className="pt-1 inline-block bg-green-500 hover:bg-green-400 text-black text-sm font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                QUIERO INSCRIBIRME AL NIVEL 1: MASTER FADE 3.0
              </a>

              <p className="text-[10px] md:text-xs text-gray-400 leading-tight">
                💬 Al presionar el botón serás redirigido a WhatsApp para hablar con un representante oficial de Erick Gómez Academy. Te ayudaremos personalmente desde cualquier parte del mundo.
              </p>

              <button
                onClick={() => setVisible(false)}
                className="mt-2 bg-white text-black font-bold py-1 px-3 rounded-md hover:bg-gray-200 transition"
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
