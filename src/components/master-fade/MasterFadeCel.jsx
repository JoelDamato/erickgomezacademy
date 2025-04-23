import { useEffect, useState } from "react";

const VentajaCompetitiva = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { id: 1, content: "Tarjeta 1: Aprende la técnica de Fade a tijera." },
    { id: 2, content: "Tarjeta 2: Aumentá tu autoridad y seguidores." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 6000); // Cambia cada 6 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black py-6 relative overflow-hidden">
      
      <div className="w-4/5 max-w-xs mb-[-50px]">
  <img
    src="https://i.ibb.co/8Fbp2Yb/titulo-4s.webp"
    alt="Lo que obtenés no es solo una técnica... es ventaja competitiva"
    className="w-full h-auto"
    loading="lazy"
    width="300"
    height="60"
  />
</div>


      {/* Mockup del celular con fondo */}
      <div
  className="relative w-full bg-cover bg-center aspect-[9/16] max-w-[400px] "
  style={{ backgroundImage: "url('https://i.ibb.co/0jsh9zpv/Mano-mockup-4s-1.webp')" }}
>


        {/* Contenido dinámico (tarjetas dentro del celular) */}
        <div className="absolute top-[21%] left-[18%] w-[48%] h-[60%] bg-white rounded-lg overflow-hidden flex items-center justify-center text-center p-2">
          <p className="text-black text-xs font-semibold transition-opacity duration-500 ease-in-out">
            {cards[activeCard].content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VentajaCompetitiva;
