const MasterFadeEstadisticas = () => {
  return (
    <div className="w-full relative overflow-hidden bg-black mt-0">
      {/* Fondo como CSS background */}
      <div
        className="relative w-full h-auto md:h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/PZ9q92rv/fondo-azul-estadisticas.webp')" }}
      >
        {/* Título sobre el fondo */}
        <div className="absolute bottom-5 left-0 right-0 px-4">
          <img
            src="https://i.ibb.co/vCwzGq6b/titulo-estadisticas.webp"
            alt="MÁS QUE NÚMEROS Y RESULTADOS REALES ERICK GÓMEZ VIENE TRANSFORMANDO BARBEROS EN REFERENTES"
            className="w-full max-w-4xl mx-auto h-auto"
            loading="lazy"
            width="1200"
            height="200"
          />
        </div>
      </div>

      {/* Sección de estadísticas */}
      <div className="w-full bg-black py-1">
        <div className="flex justify-between w-full max-w-4xl mx-auto px-4 gap-2">
          <div className="w-[31%]">
            <img
              src="https://i.ibb.co/tTZGQdw7/c1.webp"
              alt="160K Seguidores en Instagram"
              className="w-full h-auto"
              loading="lazy"
              width="400"
              height="400"
            />
          </div>

          <div className="w-[31%]">
            <img
              src="https://i.ibb.co/5Xz9Cky2/c2.webp"
              alt="+19 Países Educando Barberos"
              className="w-full h-auto"
              loading="lazy"
              width="400"
              height="400"
            />
          </div>

          <div className="w-[31%]">
            <img
              src="https://i.ibb.co/yBdjDQv9/c3.webp"
              alt="+11K Alumnos Graduados en Academia Online"
              className="w-full h-auto"
              loading="lazy"
              width="400"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterFadeEstadisticas;
