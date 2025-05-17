const OfertaMasterFade = () => {
    const beneficios = [
      "La técnica de Fade a Tijera de Erick Gómez.",
      "Las últimas Tendencias en Cortes y Fade paso a paso.",
      "Diploma Digital Certificado.",
      "Acceso de por vida a las clases y actualizaciones.",
      "100% online y disponible en todos los países.",
      "Acceso al método que hizo viral a Erick y sus alumnos."
    ];
  
    return (
      <section className="w-full bg-black text-white mt-[-10px] px-4 flex flex-col items-center">
        
        {/* Mockup general */}
        <div className="w-full max-w-md mb-4">
          <img
            src="https://i.ibb.co/vxRgrpvV/Mockups-Mf-3-0-5s.webp"
            alt="Master Fade Mockups"
            className="w-full h-auto"
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
  
        {/* Título */}
        <div className="w-full max-w-xs mb-4">
          <img
            src="https://i.ibb.co/3yJrZ9Bg/titulo-5s.webp"
            alt="Cuando veas lo que incluye vas a pensar que le falta un cero al precio"
            className="w-full h-auto"
            loading="lazy"
            width="300"
            height="60"
          />
        </div>
  
        {/* Lista de beneficios */}
        <div className="w-full max-w-sm mb-6">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="flex items-start mb-2 font-bold">
              <img
                src="https://i.ibb.co/60zSzgJF/Check-dorado-5s.webp"
                alt="Check"
                className="w-5 h-5 mr-2 flex-shrink-0"
                loading="lazy"
                width="20"
                height="20"
              />
              <p className="text-sm">{beneficio}</p>
            </div>
          ))}
        </div>
  
        {/* Precio */}
        <div className="w-full mb-2">
          <img
            src="https://i.ibb.co/6c0hB483/47-usd-precio.png"
            alt="Precio oferta"
            className="w-full h-auto"
            loading="lazy"
            width="400"
            height="200"
          />
        </div>
  
            {/* WhatsApp */}
            <div className="flex items-center justify-center max-w-xs mx-auto text-left gap-2">
  <img
    src="https://i.ibb.co/fYTmk4Nh/Instagram-icono-5s.webp"
    alt="Whatsapp"
    className="w-20 h-14 flex-shrink-0"  // Más ancho (56px)
    loading="lazy"
    width="56"
    height="56"
  />
  <p className="text-[0.65rem] leading-tight">
    Incluye Comunidad de Barberos y Seguimiento vía Whatsapp para garantizar tus resultados
  </p>
</div>


  
      </section>
    );
  };
  
  export default OfertaMasterFade;
  