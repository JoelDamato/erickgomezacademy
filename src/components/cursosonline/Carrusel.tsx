import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ButtonWpp from "./ButtonWpp";

const courseImages = [
  "https://i.ibb.co/cSNDmbZF/Tarjeta-Master-Fade.png",
  "https://i.ibb.co/8D8162hD/Tarjeta-Cutting-Mastery.png",
  "https://i.ibb.co/ymf4c9b2/Tarjeta-Colorimetria.png",
  "https://i.ibb.co/MxMJGhVx/Tarjeta-Barber-Cash.png",
  "https://i.ibb.co/tTff7Kh2/Tarjeta-Agendas-Ilimitadas.png",
  "https://i.ibb.co/JWKGtLrr/Tarjeta-Focus.png",
];

const courseNames = [
  "Master Fade",
  "Cutting Mastery",
  "Colorimetría",
  "Barber Cash",
  "Agendas Ilimitadas",
  "Focus",
];

const courseRatings = [
  { score: 4.9, count: 3782 },
  { score: 4.8, count: 3560 },
  { score: 4.7, count: 2945 },
  { score: 4.9, count: 4120 },
  { score: 4.8, count: 3215 },
  { score: 4.7, count: 2890 },
];

export default function Steps() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [featuredCourseIndex, setFeaturedCourseIndex] = useState(1); // Default to middle card
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);




  const getVisibleCards = () => {
    const cards: {
      image: string;
      name: string;
      index: number;
      position: string;
    }[] = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentCourseIndex + i) % courseImages.length;
      cards.push({
        image: courseImages[index],
        name: courseNames[index],
        index: index,
        position: i === 0 ? "left" : i === 1 ? "middle" : "right",
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const nextCourse = useCallback(() => {
    setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % courseImages.length);

    // Añadir un pequeño retraso para la animación
    setTimeout(() => {
      setFeaturedCourseIndex(
        (currentCourseIndex + 1 + 1) % courseImages.length
      );
    }, 50);
  }, [currentCourseIndex, courseImages.length]);

  const prevCourse = useCallback(() => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === 0 ? courseImages.length - 1 : prevIndex - 1
    );

    // Añadir un pequeño retraso para la animación
    setTimeout(() => {
      const newIndex =
        currentCourseIndex === 0
          ? courseImages.length - 1
          : currentCourseIndex - 1;
      setFeaturedCourseIndex(newIndex);
    }, 50);
  }, [currentCourseIndex, courseImages.length]);

 
  const openModal = (index) => {
    setSelectedCourseIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }
  // Update featured course when current course changes
  useEffect(() => {
    setFeaturedCourseIndex((currentCourseIndex + 1) % courseImages.length);
  }, [currentCourseIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextCourse();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextCourse]);


  return (
    <section className="px-1 py-1 md:mt-20  lg:mt-20 " >
      <div className="rounded-xl flex flex-col items-center justify-center mt-2 ">
        <div className="rounded-xl flex flex-col items-center md:justify-center hidden md:block">
          <div className="relative w-full">
            <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
              <div className="flex flex-row gap-4 md:gap-6 px-4 md:px-6 justify-center items-center w-full overflow-visible mt-[-10px] md:mt-[-30px] transition-all duration-700 ease-in-out">
                {visibleCards.map((card: any, idx: any) => (
                  <div
                    key={idx}
                    className={`cursor-pointer transform transition-all duration-700 ease-in-out flex-shrink-0 w-full ${
                      card.index === featuredCourseIndex
                        ? "max-w-[110px] sm:max-w-[140px] md:max-w-[300px] scale-[1.15] md:scale-[1.3] z-10 brightness-100"
                        : "max-w-[80px] sm:max-w-[100px] md:max-w-[250px] scale-[0.9] md:scale-[0.8] opacity-60 brightness-50"
                    }`}
                    onClick={() => {
                      setFeaturedCourseIndex(card.index);

                      if (card.position === "left") {
                        setCurrentCourseIndex(
                          (currentCourseIndex - 1 + courseImages.length) %
                            courseImages.length
                        );
                      } else if (card.position === "right") {
                        setCurrentCourseIndex(
                          (currentCourseIndex + 1) % courseImages.length
                        );
                      }
                    }}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={`Curso ${card.name}`}
                        className={`w-full object-contain rounded-lg shadow-lg transition-all duration-700 ease-in-out ${
                          card.index === featuredCourseIndex
                            ? "ring-4 ring-white/70 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevCourse}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-1 sm:p-2 transition-all duration-300 ease-in-out z-20"
            >
              <ChevronLeft size={16} className="md:size-24" />
            </button>

            <button
              onClick={nextCourse}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-1 sm:p-2 transition-all duration-300 ease-in-out z-20"
            >
              <ChevronRight size={16} className="md:size-24" />
            </button>
          </div>

         
        </div>
        <div className="md:mt-20 hidden md:block">
        <p className="p-2 text-center mt-[-70px]">
            Toca las flechas para ver todos los cursos disponibles
          </p>
          </div>
        {/* Imagen principal que abre el modal al hacer clic */}
        <div
          className="w-full cursor-pointer bg-[url('https://i.ibb.co/L7xrzRz/Social-proof-banner.png')] bg-cover bg-center bg-no-repeat relative"
          onClick={() => openModal(featuredCourseIndex)}
        >
        <div className="hidden md:block">
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/80"></div>

          {/* Contenedor de la imagen con z-index para que esté por encima del overlay */}
          <div className="relative z-10 flex justify-center py-3">
            <img
              src={courseImages[featuredCourseIndex] || "/placeholder.svg"}
              alt={courseNames[featuredCourseIndex]}
              className="max-w-[280px] md:max-w-[400px] h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
        </div>
        <div className="block md:hidden space-y-6 p-4">
        {courseNames.map((name, index) => (
          <div key={index} className="bg-black border-2 border-yellow-500 rounded-xl p-4">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{name}</h2>
            <img
              src={courseImages[index] || "/placeholder.svg"}
              alt={name}
              className="w-full max-h-[60vh] object-contain mb-1 rounded-lg"
            />
            <div className="flex items-center justify-center mb-4">
              <span className="mr-2 font-bold text-white">{courseRatings[index].score}</span>
              <div className="flex text-[#D4AF37]">★★★★★</div>
              <span className="ml-2 text-md font-bold text-white">
                {courseRatings[index].count.toLocaleString()} calificaciones
              </span>
            </div>
           <ButtonWpp inx={index}/>
          </div>
        ))}
      </div>

        <div className="hidden md:block">
        <div className=" flex items-center justify-center relative z-100 mt-5 mb-4">
          <span className="mr-2 font-bold">
            {courseRatings[featuredCourseIndex].score}
          </span>
          <div className="flex text-[#D4AF37]">
            <span>★★★★★</span>
          </div>
          <span className="ml-2 text-md font-bold">
            {courseRatings[featuredCourseIndex].count.toLocaleString()}{" "}
            calificaciones
          </span>
        </div>
        <ButtonWpp inx={featuredCourseIndex} width="w-full md:w-1/2" />
        <p className="text-white text-sm p-2 text-center">
          {" "}
          Vas a ser redirigido a mi WhatsApp Oficial para hablar conmigo o
          alguien de mi equipo y culminar la inscripción
        </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black border-2 border-yellow-500 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-white mb-4">{courseNames[selectedCourseIndex]}</h2>

              <img
                src={courseImages[selectedCourseIndex] || "/placeholder.svg"}
                alt={courseNames[selectedCourseIndex]}
                className="w-full max-h-[60vh] object-contain mb-6"
              />

              <div className="flex items-center justify-center mb-4">
                <span className="mr-2 font-bold text-white">{courseRatings[selectedCourseIndex].score}</span>
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
                <span className="ml-2 text-md font-bold text-white">
                  {courseRatings[selectedCourseIndex].count.toLocaleString()} calificaciones
                </span>
              </div>
            <ButtonWpp inx={selectedCourseIndex} width="w-full md:w-1/2" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
