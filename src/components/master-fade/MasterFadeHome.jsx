function MasterFadeHome() {
  return (
    <main className="flex flex-col items-center bg-black text-white overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/9mq2S3SK/fondo-azul-home.webp"
            alt="Fondo"
            className="object-cover w-full h-full absolute"
            loading="lazy"
            width="1920"
            height="1080"
          />
        </div>

        <div className="relative z-10 w-full bg-azul-profundo mb-2">
          <h1 className="text-[1rem] font-bebas uppercase tracking-wide text-center">
            ACCEDE HOY SIN IMPORTAR DE QUÉ PARTE DEL MUNDO SEAS.
          </h1>
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 py-0 w-full">
          <div className="text-center mb-4">
            <div className="mb-1">
              <img
                src="https://i.ibb.co/PGPhwQLv/titulo.webp"
                alt="Mejora tu técnica de fade y hazte viral"
                className="w-full h-auto"
                loading="lazy"
                width="600"
                height="150"
              />
            </div>

            <p className="text-sm font-open w-[90%] mx-auto">
              Erick Gómez por fin revela la técnica de Fade a tijera que lo hizo viral a él y sus alumnos.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <img
              src="https://i.ibb.co/B2k2NFLX/laptop.webp"
              alt="Laptop"
              className="w-full h-auto"
              loading="lazy"
              width="600"
              height="400"
            />

            <div className="absolute top-0 left-0 w-24 h-24">
              <img
                src="https://i.ibb.co/xStxDQMs/logo-master-fade.webp"
                alt="Master Fade 3.0 Elite"
                className="w-full h-auto"
                loading="lazy"
                width="96"
                height="96"
              />
            </div>

            {/* Placeholder del video */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mb-4 relative">
            <img
              src="https://i.ibb.co/vx3gKzjr/Boton-dorado.webp"
              alt="Boton dorado"
              className="w-full h-auto"
              loading="lazy"
              width="600"
              height="120"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="font-bebas uppercase text-xl sm:text-xl text-shadow-bebas">
                QUIERO DOMINAR Y ACELERAR MI TÉCNICA DE FADE
              </p>
              <span className="font-opensans font-bold text-[60%] mt-[-5px] text-shadow-open">
                La técnica a tijera que genera autoridad, seguidores y más clientes
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MasterFadeHome;
