import React from "react";

export default function Header(){
    return(
        <header className="px-6 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
        <div className="mb-6">
          <img src="/erickgomez.png" alt="Erick Gomez Academy" className="w-[180px]" />
        </div>

        <div className="flex md:flex-row gap-8 z-10">
          <div className="md:w-2/3">
            <h1 className="relative text-3xl font-bold mb-2 z-10">Mis Formaciones</h1>
            <p className="relative text-lg text-gray-300 z-10">
              Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tu tus redes con Erick, este
              año tienes la oportunidad de hacerlo 100% online sin importar de donde seas.
            </p>
          </div>

          <img
src="https://i.ibb.co/4g1JHSQ3/14b2d988-8d6c-43f4-8568-e8e9634c316b.png"
className="absolute top-[80px] right-0 w-3/4 z-0 md:w-1/2"
alt=""
/>

          <div className="md:w-1/3 flex justify-center md:justify-end"></div>
        </div>

        <div className="mt-8">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://i.ibb.co/L7xrzRz/Social-proof-banner.png"
              alt="Social proof banner"
              className="w-full h-auto object-cover md:w-1/2"
            />
          </div>
        </div>

        <p className="text-center text-sm mt-6">
          Hoy puedes ser parte de la comunidad que educa día a día a más de 7000 barberos de distintas partes del
          mundo <br />
        </p>

        <div className="border-b border-[#D4AF37] mt-5" />
      </header>
    )
}