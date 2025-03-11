"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function BarberAcademy() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [featuredCourseIndex, setFeaturedCourseIndex] = useState(1); // Default to middle card

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

  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp

  const getWhatsAppLink = (index) => {
    console.log(index)
    const message = `Hola, estoy interesado en el curso "${courseNames[index]}". ¿Podrías darme más información?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

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

  // Update featured course when current course changes
  useEffect(() => {
    setFeaturedCourseIndex((currentCourseIndex + 1) % courseImages.length);
  }, [currentCourseIndex]);

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextCourse();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextCourse]);

  const openModal = (index) => {
    console.log('asd',index)
    setSelectedCourseIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to get visible cards based on current index
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      // Aseguramos que el índice sea circular
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

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        {/* Background Image */}
        <div className="absolute inset-0" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Header Section */}
          <header className="px-6 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">
            <div className="mb-6">
              <img
                src="/erickgomez.png"
                alt="Erick Gomez Academy"
                className="w-[180px]"
              />
            </div>

            <div className="flex md:flex-row gap-8 z-10">
              <div className="md:w-2/3">
                <h1 className="relative text-3xl font-bold mb-2 z-10">
                  Mis Formaciones
                </h1>
                <p className="relative text-lg text-gray-300 z-10">
                  Si estás buscando perfeccionar tus técnicas de cortes y fade o
                  escalar tu tus redes con Erick, este año tienes la oportunidad
                  de hacerlo 100% online sin importar de donde seas.
                </p>
              </div>

              <img
                src="https://i.ibb.co/4g1JHSQ3/14b2d988-8d6c-43f4-8568-e8e9634c316b.png"
                className="absolute top-[80px] right-0 w-3/4 z-0 md:w-1/2"
                alt=""
              />

              <div className="md:w-1/3 flex justify-center md:justify-end"></div>
            </div>

            {/* Banner Section */}
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
              Hoy puedes ser parte de la comunidad que educa día a día a más de
              7000 barberos de distintas partes del mundo <br />
            </p>

            <div className="border-b border-[#D4AF37] mt-5" />
          </header>

          {/* Courses Section */}
          <section className="px-1 py-1">
            <h2 className="text-md font-bold text-center mb-1">
              COMO INSCRIBIRTE A LA ACADEMIA ONLINE:
            </h2>

            <div className="flex justify-center items-center w-full">
              <img
                src="https://i.ibb.co/v6XQcg8g/Pasos.png"
                className="w-full  md:w-1/2"
                alt=""
              />
            </div>

            {/* Featured Course Card (Mobile Only) */}
            <div className="px-1 py-1 md:mt-20  lg:mt-20 rounded-xl flex flex-col items-center justify-center mt-2 ">
              {/* Featured Course Card */}
              <div className="rounded-xl flex flex-col items-center md:justify-center ">
                <div className="relative w-full">
                  {/* Contenedor del fondo - Aumentamos la altura en móvil */}
                  <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                    {/* Contenedor de las tarjetas - Ajustamos el espacio y padding */}
                    <div className="flex flex-row gap-4 md:gap-6 px-4 md:px-6 justify-center items-center w-full overflow-visible mt-[-10px] md:mt-[-30px] transition-all duration-700 ease-in-out">
                      {visibleCards.map((card, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer transform transition-all duration-700 ease-in-out flex-shrink-0 w-full ${
                            card.index === featuredCourseIndex
                              ? "max-w-[110px] sm:max-w-[140px] md:max-w-[300px] scale-[1.15] md:scale-[1.3] z-10 brightness-100"
                              : "max-w-[80px] sm:max-w-[100px] md:max-w-[250px] scale-[0.9] md:scale-[0.8] opacity-60 brightness-50"
                          }`}
                          onClick={() => {
                            // Actualizamos la imagen principal
                            setFeaturedCourseIndex(card.index);

                            // Calculamos el nuevo índice del carrusel basado en la posición de la tarjeta
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
                            // Si es la del medio, mantenemos el índice actual
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

                  {/* Botón izquierdo */}
                  <button
                    onClick={prevCourse}
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-1 sm:p-2 transition-all duration-300 ease-in-out z-20"
                  >
                    <ChevronLeft size={16} className="md:size-24" />
                  </button>
                  {/* Botón derecho */}
                  <button
                    onClick={nextCourse}
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-1 sm:p-2 transition-all duration-300 ease-in-out z-20"
                  >
                    <ChevronRight size={16} className="md:size-24" />
                  </button>
                </div>
                <div className="md:mt-20 hidden md:block">
                  <p className="p-2 text-center mt-[-70px]">
                    Toca las flechas para ver todos los cursos disponibles
                  </p>
                </div>
              </div>

              {/* Imagen principal que abre el modal al hacer clic */}
              <div
                className="w-full cursor-pointer bg-[url('https://i.ibb.co/L7xrzRz/Social-proof-banner.png')] bg-cover bg-center bg-no-repeat relative"
                onClick={() => openModal(featuredCourseIndex)}
              >
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/80"></div>

                {/* Contenedor de la imagen con z-index para que esté por encima del overlay */}
                <div className="relative z-10 flex justify-center py-3">
                  <img
                    src={
                      courseImages[featuredCourseIndex] || "/placeholder.svg"
                    }
                    alt={courseNames[featuredCourseIndex]}
                    className="max-w-[280px] md:max-w-[400px] h-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center relative z-100 mt-5 mb-4">
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

              <motion.a
                href={getWhatsAppLink(featuredCourseIndex)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center max-w-md bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center p-5"
                animate={{
                  y: [0, -5, 0], // Movimiento arriba y abajo
                }}
                transition={{
                  repeat: Infinity, // Se repite infinitamente
                  duration: 1.5, // Duración de la animación
                  ease: "easeInOut", // Movimiento suave
                }}
                whileHover={{ scale: 1.1 }} // Se agranda al pasar el mouse
                whileTap={{ scale: 0.9 }} // Se achica al hacer clic
              >
                <img src="./phone.svg" className="h-8 w-8 mr-2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2v14a2 2z"
                />
                Obtener entrenamiento vía WhatsApp
              </motion.a>
              <p className="text-white text-sm p-2 text-center">
                {" "}
                Vas a ser redirigido a mi WhatsApp Oficial para hablar conmigo o
                alguien de mi equipo y culminar la inscripción
              </p>
            </div>

            {/* Course Cards Carousel - Separado de la imagen principal */}
          </section>
        </div>
      </div>

      {/* Modal for enlarged image */}
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
              <h2 className="text-2xl font-bold text-white mb-4">
                {courseNames[selectedCourseIndex]}
              </h2>

              <img
                src={courseImages[selectedCourseIndex] || "/placeholder.svg"}
                alt={courseNames[selectedCourseIndex]}
                className="w-full max-h-[60vh] object-contain mb-1"
              />

              <div className="flex items-center justify-center mb-4">
                <span className="mr-2 font-bold text-white">
                  {courseRatings[selectedCourseIndex].score}
                </span>
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
                <span className="ml-2 text-md font-bold text-white">
                  {courseRatings[selectedCourseIndex].count.toLocaleString()}{" "}
                  calificaciones
                </span>
              </div>

              <motion.a
                href={getWhatsAppLink(selectedCourseIndex)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center max-w-md bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center p-5"
                animate={{
                  y: [0, -5, 0], // Movimiento arriba y abajo
                }}
                transition={{
                  repeat: Infinity, // Se repite infinitamente
                  duration: 1.5, // Duración de la animación
                  ease: "easeInOut", // Movimiento suave
                }}
                whileHover={{ scale: 1.1 }} // Se agranda al pasar el mouse
                whileTap={{ scale: 0.9 }} // Se achica al hacer clic
              >
                <img src="./phone.svg" className="h-8 w-8 mr-2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2v14a2 2z"
                />
                Obtener entrenamiento vía WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
