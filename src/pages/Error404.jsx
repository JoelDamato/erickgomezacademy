import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

 function Error404() {
  return (
<>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center px-6 py-12">
      <div className="w-full flex items-center justify-center">
        <div className="border-2 border-[#d4af37] rounded-2xl p-10 md:p-16 max-w-xl w-full shadow-lg shadow-[#d4af3733] bg-[#1a1a1acc] backdrop-blur-md text-center">
          <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-white drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mt-4 tracking-wide">
            Esta silla está vacía...
          </h2>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Acá no hay fades, ni degradados... solo vacío.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 ease-in-out rounded-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
export default Error404;

// // src/pages/Error404.jsx

// import { Link } from "react-router-dom";

// export default function Error404() {
//   return (
//     <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6">
//       <div className="text-center">
//         <h1 className="text-6xl md:text-8xl font-extrabold text-white relative">
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d4af37] glitch">
//             404
//           </span>
//         </h1>
//         <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mt-4">
//           Página no encontrada
//         </h2>
//         <p className="text-gray-300 mt-2">
//           La página que estás buscando no existe o fue movida.
//         </p>git
//         <Link
//           to="/"
//           className="inline-block mt-6 px-6 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition rounded-lg"
//         >
//           Volver al inicio
//         </Link>
//       </div>

//       {/* Glitch effect */}
//       <style>
//         {`
//           .glitch {
//             position: relative;
//           }
//           .glitch::before,
//           .glitch::after {
//             content: '404';
//             position: absolute;
//             left: 0;
//             width: 100%;
//             opacity: 0.1;
//             color: #d4af37;
//           }
//           .glitch::before {
//             top: -2px;
//             left: 2px;
//           }
//           .glitch::after {
//             bottom: -2px;
//             left: -2px;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
