import Carrusel from "./components/Carrusel";


export default function MasterFadeFAQ(){

    return(
        <>
        <div className="w-full max-w-5xl mt-8">
        <div className="relative">
          <div className="bg-gradient-to-b from-[#051a2e] to-[#1d8dce] py-1 rounded-sm">
            <h2 className="text-center text-white text-xl md:text-2xl font-bebas">
              SI DUDAS EN INSCRIBIRTE, LEE ESTO...
            </h2>
          </div>
        </div>
        <div className="mt-6">
          <Carrusel />
        </div>
        <div className="max-w-3xl w-full mt-20 md:px-0">
        <div className="relative flex flex-col items-center">
          <div className="w-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/barra%20completa%20s9-ERCEfeL0s1tVAZdv4GGfR4nxERO07M.png"
              alt="7 días de garantía"
              className="w-full h-auto"
            />
          </div>

          <div className="h-16"></div>

          <h2 className="text-xl font-bold mb-1 text-center">¿TIENES ALGUNA DUDA?</h2>

          <div className="w-full max-w-lg px-4 mb-12">
            <a href="https://wa.me/message/YOURWHATSAPPLINK" target="_blank" rel="noopener noreferrer">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boton%20wsp%20s9-NadSW4ovPNpnhTRPqBwoKwxLS5E8AQ.png"
                alt="Habla con alguien de mi equipo vía WhatsApp"
                className="w-full h-auto"
              />
            </a>
          </div>
        </div>
      </div>
      </div>
      </>
    )
};