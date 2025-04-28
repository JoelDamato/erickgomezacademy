import { useEffect, useState } from "react";

const VentajaCompetitiva = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { id: 1, image: "https://i.ibb.co/8n5F0bHX/1-tarjeta.webp" },
    { id: 2, image: "https://i.ibb.co/9m0DQyTT/2-tarjeta.webp" },
    { id: 3, image: "https://i.ibb.co/qYL4g0QT/3-tarjeta.webp" },
    { id: 4, image: "https://i.ibb.co/Jh7J36G/4-tarjeta.webp" },
    { id: 5, image: "https://i.ibb.co/HDPCbgFY/5-tarjeta.webp" },
    { id: 6, image: "https://i.ibb.co/Lhc0bZhp/6-tarjeta.webp" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 3000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black py-6 relative overflow-hidden">
      
      {/* Título */}
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
        className="relative w-full bg-cover bg-center aspect-[9/16] max-w-[400px]"
        style={{ backgroundImage: "url('https://i.ibb.co/0jsh9zpv/Mano-mockup-4s-1.webp')" }}
      >
        {/* Contenido dinámico (tarjetas dentro del celular) */}
        <div className="absolute top-[21%] left-[18%] w-[48%] h-[60%] rounded-lg overflow-hidden flex items-center justify-center">
          {cards.map((card, index) => (
            <img
              key={card.id}
              src={card.image}
              alt={`Tarjeta ${card.id}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                activeCard === index ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VentajaCompetitiva;
