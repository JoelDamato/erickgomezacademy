import { motion } from "framer-motion"
import React from "react"


interface ButtonWppProps {
    inx: any | number;
    width?: string; 
  }
  
  export default function ButtonWpp({ inx, width = "80%" }: ButtonWppProps) {
  const phoneNumber = "+59891640623"; 

  const courseNames = [
    "Growth Barber",
    "Master Fade",
    "Cutting Mastery",
    "Colorimetría",
    "Barber Cash",
    "Agendas Ilimitadas",
    "Focus",
  ];

    const getWhatsAppLink = (inx) => {
      // console.log(inx, courseNames[inx])
        const message = `Hola, estoy interesado en el curso "${courseNames[inx]}". ¿Podrías darme más información?`;
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      };

      
    return(
        <>
        <div className='flex justify-center' style={{width: '100%'}} >
        <div className={` lg:width-${width} md:width-${width} sm:width-[100%] `} >
          <motion.a
              href={getWhatsAppLink(inx)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
                 <div className="flex items-center justify-center">
          <img
            src="/phone.svg"
            className="h-8 w-8 ml-2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2v14a2 2z"
            />
              <p>Obtener entrenamiento vía WhatsApp</p>
            </div>
            </motion.a>
            </div>
            </div>
        </>
    )
}