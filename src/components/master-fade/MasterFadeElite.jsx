"use client"

import { useEffect, useRef, useState } from "react"

const MasterFadeElite = () => {
  const contentRef = useRef(null)
  const imageContainerRef = useRef(null)
  const [contentHeight, setContentHeight] = useState("auto")

  useEffect(() => {
    const adjustHeight = () => {
      if (contentRef.current && imageContainerRef.current) {
        const height = contentRef.current.offsetHeight
        setContentHeight(`${height}px`)
      }
    }

    adjustHeight()

    window.addEventListener("resize", adjustHeight)

    window.addEventListener("load", adjustHeight)

    return () => {
      window.removeEventListener("resize", adjustHeight)
      window.removeEventListener("load", adjustHeight)
    }
  }, [])

  return (
    <section className="w-full bg-black text-white relative py-1 pr-1 md:px-8 lg:px-12 overflow-hidden md:h-[80vh]">
      <div className="max-w-6xl mx-auto relative bg-black ">
        <div className="relative md:h-[80vh]">
          <div ref={imageContainerRef} className="absolute left-0 top-0 md:w-4/5 h-full z-10 overflow-hidden">
            <div className="h-[45vh] md:h-[80vh]">
              <img
                src="https://i.ibb.co/5CtSk0s/erick-elite.webp"
                alt="Erick Gómez"
                className="h-full md:h-[80vh] w-auto max-w-none object-cover object-left"
                loading="lazy"
              />
            </div>
          </div>

          <div
            ref={contentRef}
            className="relative h-[50vh] z-20 ml-[40%] md:ml-[35%] pl-[5%] flex flex-col items-center"
          >
            <div className="relative flex justify-center md:w-24 md:h-24 md:mb-2 mx-auto">
              <img src="https://i.ibb.co/wGVCPsx/comillas.webp" alt="Comillas" className="w-[20%] md:w-[80%] h-auto" loading="lazy" />
            </div>

            <div className="mb-2 md:mb-6 w-full mt-2 md:mt-0">
              <img
                src="https://i.ibb.co/DPzSRzJk/titulo-elite.webp"
                alt="CONOCE A TU MENTOR: ERICK GÓMEZ"
                className="w-[90%] md:w-full max-w-md mx-auto" loading="lazy"
              />
            </div>

            <div className="text-center mb-1 md:mb-6 text-[55%] md:text-base font-opensans">
              <p className="mb-2 md:mb-3">
                Ser un barbero de élite en 2025 significa ir más allá del corte, la barbería es un arte, un negocio en
                crecimiento que puede cambiar tu vida.
              </p>
              <p className="md:mb-3">
              Los que despierten a tiempo se verán beneficiados.<br/>
                La mentalidad es lo que separa a los barberos promedio de los que están dejando su legado.
              </p>
            </div>

            <div className="mb-1 md:mb-6 md:w-48 flex justify-end">
              <img src="https://i.ibb.co/PZGQdrkW/firma.webp" alt="Firma Erick Gómez" className="w-1/3 md:w-[80%]"  loading="lazy"/>
            </div>

            <div className="w-full mb-1 md:mb-6 text-[35%] md:text-sm font-open">
              <div className="flex items-start mb-1 md:mb-3 justify-center text-left">
                <img
                  src="https://i.ibb.co/JRP0frKh/mini-estrella.webp"
                  alt="Estrella"
                  className="w-[.8rem] h-[.6rem] md:w-5 md:h-5 mr-1 md:mr-2 mt-0.5 md:mt-1 flex-shrink-0" loading="lazy"
                />
                <p className="font-open">Fundador de Erick Gómez Academy en 2018, referente N.º 1 en el mundo del Fade a tijera.</p>
              </div>
              <div className="flex items-start mb-1 md:mb-3 justify-center text-left">
                <img
                  src="https://i.ibb.co/JRP0frKh/mini-estrella.webp"
                  alt="Estrella"
                  className="w-[.8rem] h-[.6rem] md:w-5 md:h-5 mr-1 md:mr-2 mt-0.5 md:mt-1 flex-shrink-0" loading="lazy"
                />
                <p>Más de 10.000 barberos formados en todo el mundo en su academia.</p>
              </div>
              <div className="flex items-start mb-1 md:mb-3 justify-center text-left">
                <img
                  src="https://i.ibb.co/JRP0frKh/mini-estrella.webp"
                  alt="Estrella"
                  className="w-[.8rem] h-[.6rem] md:w-5 md:h-5 mr-1 md:mr-2 mt-0.5 md:mt-1 flex-shrink-0" loading="lazy"
                />
                <p>Reconocido por enseñar técnicas y secretos que nadie más comparte.</p>
              </div>
              <div className="flex items-start mb-1 md:mb-3 justify-center text-left">
                <img
                  src="https://i.ibb.co/JRP0frKh/mini-estrella.webp"
                  alt="Estrella"
                  className="w-[.8rem] h-[.6rem] md:w-5 md:h-5 mr-1 md:mr-2 mt-0.5 md:mt-1 flex-shrink-0" loading="lazy"
                />
                <p>Mentor de los barberos que buscan dominar la industria y dejar huella.</p>
              </div>
            </div>

            <div className="w-1/2 md:mt-4 mx-auto">
              <a
                href="https://instagram.com/erickgomezz1/"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform duration-300 hover:scale-105"
              >
                <img src="https://i.ibb.co/BHLwpTG5/boton-ig.webp" alt="Seguir en Instagram" className="flex justify-center md:w-64" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MasterFadeElite
