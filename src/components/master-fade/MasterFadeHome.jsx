import fondoAzul from "/fondo-azul-home.png"
import titulo from "/titulo.png"
import logoMasterFade from "/logo-master-fade.png"
import laptop from "/laptop.png"
import botonDorado from "/Boton-dorado.png"

function MasterFadeHome() {
  return (
    <main className="flex flex-col items-center bg-black text-white  overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 z-0">
          <img src={fondoAzul || "/placeholder.svg"} alt="Fondo" className="object-cover w-full h-full absolute" />
        </div>

        <div className="relative z-10 w-full bg-azul-profundo  mb-2">
          <h1 className="text-[1rem] font-bebas uppercase tracking-wide text-center">
            ACCEDE HOY SIN IMPORTAR DE QUÉ PARTE DEL MUNDO SEAS.
          </h1>
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 py-0 w-full">
          <div className="text-center mb-4">
            <div className="mb-1">
              <img
                src={titulo || "/placeholder.svg"}
                alt="Mejora tu técnica de fade y hazte viral"
                className="w-full h-auto"
              />
            </div>

            <p className="text-sm font-open w-[90%] mx-auto">
              Erick Gómez por fin revela la técnica de Fade a tijera que lo hizo viral a él y sus alumnos.
            </p>
          </div>

          <div className="relative w-full max-w-md ">
            <img src={laptop || "/placeholder.svg"} alt="Laptop" className="w-full h-auto" />

            <div className="absolute top-0 left-0 w-24 h-24">
              <img src={logoMasterFade || "/placeholder.svg"} alt="Master Fade 3.0 Elite" className="w-full h-auto" />
            </div>

            {/* este bloque luego cuando este el video se borra */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mb-4 relative">
            <img src={botonDorado || "/placeholder.svg"} alt="Botón" className="w-full h-auto" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
              <p className="font-bebas uppercase text-xl sm:text-xl tracking-wide">
                QUIERO DOMINAR Y ACELERAR MI TÉCNICA DE FADE
              </p>
              <span className="font-open text-[65%] mt-0">
                La técnica a tijera que genera autoridad, seguidores y más clientes
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MasterFadeHome;
