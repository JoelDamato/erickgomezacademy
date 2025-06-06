const MasterFadeEstadisticas = () => {
  return (
    <div className="w-full relative overflow-hidden bg-black mt-0" style={{ backgroundColor: "#000000" }}>
      <div className="relative w-full mt-0">
        <div className="w-full relative mt-0">
        <div className="relative w-full h-auto md:h-[80vh] overflow-hidden">
    <img
      src="https://i.ibb.co/GvM6LHPf/fondo-azul-estadisticas.webp"
      alt="Fondo estadísticas"
      className="w-full h-auto md:h-full md:object-cover md:object-center"
      style={{ display: "block", margin: 0 }}
    />
  </div>
        </div>

        <div className="absolute  bottom-5 left-0 right-0 px-4">
          <img
            src="https://i.ibb.co/XQHK382/titulo-s2.png"
            alt="MÁS QUE NÚMEROS Y RESULTADOS REALES ERICK GÓMEZ VIENE TRANSFORMANDO BARBEROS EN REFERENTES"
            className="w-full max-w-4xl mx-auto h-auto"
          />
        </div>
      </div>

      <div className="w-full bg-black py-1 md:" style={{ backgroundColor: "#000000" }}>
        <div className="flex justify-between w-full max-w-4xl mx-auto px-4 gap-2">
          <div className="w-[31%]">
            <img src="https://i.ibb.co/tTZGQdw7/c1.webp" alt="160K Seguidores en Instagram" className="w-full h-auto"  loading="lazy"/>
          </div>

          <div className="w-[31%]">
            <img src="https://i.ibb.co/5Xz9Cky2/c2.webp" alt="+19 Países Educando Barberos" className="w-full h-auto" loading="lazy" />
          </div>

          <div className="w-[31%]">
            <img src="https://i.ibb.co/yBdjDQv9/c3.webp" alt="+11K Alumnos Graduados en Academia Online" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MasterFadeEstadisticas
