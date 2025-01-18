export default function WorkshopLanding() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8 mx-auto shadow-lg mt-8">
        <header className="text-center mb-16">
          <h2 className="text-2xl text-gray-800 mb-8 font-medium">
            Mi Nuevo Workshop Revela...
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Cómo estoy utilizando un Video Simple de 7 minutos y una página minimalista{" "}
            <span className="text-[#43A047]">
              para vender mis cursos online en Piloto{" "}
              <span className="italic">Automático</span>...
            </span>
          </h1>

          <p className="text-xl text-gray-700">
            (Esta estrategia me permite vender de 30 a 50 talleres por día...FUNCIONA!)
          </p>
        </header>

        {/* Main Content */}
        <div className="my-16">
          <div className="text-center space-y-8">
           

            {/* Sound Button */}
            <button
              className="bg-[#43A047] hover:bg-[#2E7D32] text-white px-16 py-8 rounded-lg shadow-lg mx-auto block transition-colors"
            >
              <div className="text-2xl mb-4">Toca aquí</div>
              <div className="flex justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-12 h-12"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              </div>
              <div className="text-xl">para activar el sonido</div>
            </button>
          </div>
        </div>

        {/* New Product Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-16 bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Desbloquea mis Sistema de Ventas y{" "}
            <span className="block">Empieza a Vender tus Cursos 24/7...</span>
          </h1>

          <div className="relative mb-12">
            <img
              src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/5f165017-3990-44ec-b1c9-10f9fc513283"
              alt="VSL Method Products"
              className="w-full h-auto"
            />
          </div>

          <button className="bg-[#43A047] hover:bg-[#2E7D32] text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-colors">
            Quiero Empezar a vender en 7 minutos!
          </button>

          <img
              src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/a77d3c0f-5951-4f3b-8a85-a23a5e702176"
              alt="VSL Method Products"
              className="w-full h-auto"
            />


          {/* Passive Income Section */}
          <div className="text-center mb-16 mt-5">
            <p className="text-xl mb-8">
              Cuando termines tu video de 7 minutos podrás olvidarte de los ciclos
              promocionales y convertirás a tu curso/ workshops online en una fuente
              de ingresos pasivos...
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              De hecho el saber vender las grabaciones de
              mis workshops con un video de 7 minutos,
              me permite generar notificaciones como
              estas en Piloto <span className="italic">Automático</span>...
            </h2>

            <div className="relative">
              <img
                src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/e69bfba9-31ab-4d11-be22-25beaa94997d"
                alt="Sales Dashboard"
                className="w-full h-auto mb-8"
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-600 text-4xl font-bold">
                ventas 24/7
              </div>
            </div>
          </div>

          <button className="bg-[#43A047] hover:bg-[#2E7D32] text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-colors">
            Quiero Empezar a vender en 7 minutos!
          </button>

          {/* Testimonials Section */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              y la mejor parte es que no solo
              funciona para mi... sino que cientos
              de estudiantes aman este sistema!
            </h2>

            <div className="grid gap-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla_2025-01-17_16-43-07-9Ehy67H8bHm7Nl1p6VGfFYnEOIUALK.png"
                alt="Student Testimonials"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Perfect For You Section */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Este Workshop es perfecto para ti si...
            </h2>
            <div className="flex items-center gap-4 text-xl">
              <svg className="w-6 h-6 text-[#43A047]" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              <span>
Si te gustaría que transformar a tu curso / grabaciones de tu workshop en una fuente de ingresos pasivos.
</span>
   </div>
   <div className="flex items-center gap-4 text-xl">
              <svg className="w-6 h-6 text-[#43A047]" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              <span>
              Sabes que tienes un producto ganador, pero te ha costado hacer que las personas entiendan el verdadero valor de lo que estás ofreciendo....
</span>
   </div>
   <div className="flex items-center gap-4 text-xl">
              <svg className="w-6 h-6 text-[#43A047]" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              <span>
              Estás cansado de depender solo de la estrategia de ciclos de lanzamientos y quieres que tus cursos se vendan todos los días...
</span>
   </div>

   <button className="mt-2 bg-[#43A047] hover:bg-[#2E7D32] text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-colors">
            Quiero Empezar a vender en 7 minutos!
          </button>

 
         
          </div>
        </section>

        <section>        
          {/* Product Details */}
          <div className="grid gap-8 mb-16">

          <img 
                src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/02c90523-c81a-4fb5-b3cf-271749d7aae4
                "
                alt="7 Minute Closing"

              />
            <div className="flex gap-8 items-center">
              <img 
                src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/02c90523-c81a-4fb5-b3cf-271749d7aae4"
                alt="7 Minute Closing"
                className="w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-2">7 Minute Closing - Valorado en $497 usd</h4>
                <p className="text-gray-600">
                  Te revelaré como convertir a tus visitantes en clientes 
                  en solo 7 minutos con un video en el cual ni siquiera 
                  tienes que aparecer en cámara..... Nunca!
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <img 
                src="https://samcart-foundation-prod.s3.amazonaws.com/marketplace-130441/assets/02c90523-c81a-4fb5-b3cf-271749d7aae4"
                alt="One Page Formula"
                className="w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-2">One Page Formula - Valorado en $197</h4>
                <p className="text-gray-600">
                  Deja de complicarte con páginas de ventas 
                  interminables o funnels complicados!... Te daré la 
                  misma estructura de la única página de ventas 
                  minimalista que utilizo todos los días
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">Entonces, esto es lo que obtendrás!</h2>
            
            <div className="border-4 border-dashed border-[#43A047] rounded-xl p-8 max-w-2xl mx-auto">
              <div className="space-y-4 text-xl mb-8">
                <div className="flex justify-between">
                  <span>7 Minute Closing.............</span>
                  <span>(Valorado en $497 usd)</span>
                </div>
                <div className="flex justify-between">
                  <span>One Page Formula............</span>
                  <span>(Valorado en $197 usd)</span>
                </div>
                <div className="flex justify-between">
                  <span>Oferta Ganadoras Evergreen..</span>
                  <span>(Valorado en $297 usd)</span>
                </div>
                <div className="flex justify-between">
                  <span>Templates Hechos para ti....</span>
                  <span>(Valorado en $247 usd)</span>
                </div>
              </div>

              <div className="text-2xl mb-4">
                Todo esto valorado por: <span className="line-through">$1238</span>
              </div>
              
              <div className="text-3xl font-bold text-[#43A047]">
                SOLO POR HOY: $67 usd
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-[#43A047] hover:bg-[#2E7D32] text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block transition-colors">
            ¡Sí! Quiero Acceso Inmediato
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="mb-2">© 2025 Santi Padilla. All Rights Reserved.</p>
          <p className="max-w-2xl mx-auto">
            Descargo de Responsabilidad: Este producto no garantiza la obtención de resultados. Las referencias al desarrollo de una determinada estrategia no debe ser interpretada como una garantía de resultados. Esta página no es parte de la página de Meta o de Meta, Inc.
          </p>
        </footer>
      </div>
    </div>
  );
}

