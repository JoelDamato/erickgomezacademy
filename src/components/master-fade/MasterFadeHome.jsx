function MasterFadeHome() {
  const phoneNumber = "+59891640623";
  const getWhatsAppLink = () => {
    const message = "Hola, tengo dudas sobre el curso Master Fade. ¿Podrías darme más información?";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="flex flex-col items-center bg-black text-white overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/prWYdG19/fondo-azul-home.webp"
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
                src="https://i.ibb.co/h1F7PqFG/titulo-s1.png"
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
              src="https://i.ibb.co/N234zXJT/laptop.webp"
              alt="Laptop"
              className="w-full h-[282px]"
              loading="lazy"
              width="600"
              height="200"
            />

            <div className="absolute top-4 left-4 w-20 h-20 z-20">
              <img 
              src="https://i.ibb.co/pvh0R3Dk/logo-master-fade.webp"
                alt="Master Fade 3.0 Elite"
                className="w-full h-auto"
                loading="lazy"
                width="96"
                height="96"
              />
            </div>

            <div className="absolute top-[60%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 w-[79%] h-[95%]">

              <iframe
            src="https://player-vz-7cd4a4ef-9e2.tv.pandavideo.com/embed/?v=93632d81-5c53-4500-8570-5c46822a30a6"
                title="Master Fade Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full shadow-lg"
              ></iframe>
            </div>
          </div>

          <div className="w-full max-w-md mb-4 relative">
            <img
              src="https://i.ibb.co/h1msk0zq/Boto-n-1s.png"
              alt="Boton dorado"
              className="w-full h-auto"
              loading="lazy"
              width="600"
              height="120"
            />
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="font-bebas uppercase text-xl sm:text-xl text-shadow-bebas">
                  QUIERO DOMINAR Y ACELERAR MI TÉCNICA DE FADE
                </p>
                <span className="font-opensans font-bold text-[60%] mt-[-5px] text-shadow-open">
                  La técnica a tijera que genera autoridad, seguidores y más clientes
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MasterFadeHome;
