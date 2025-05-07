import React from 'react';

const ComponentName = () => {
  return (

    <>
    <footer className="bg-black text-white py-4">
    <div className="container mx-auto flex flex-col items-center gap-4">
      {/* Logo */}
      <img
        src="/erickgomez.png"
        alt="Erick Gómez Logo"
        className="w-[200px] mt-[-20px] "
      />
      
      {/* Texto principal */}
      <p className="text-center text-md font-bold mt-[-50px]">
  Erick Gómez Academy <span className="text-yellow-400">2019 (R)</span> | Todos los derechos reservados <span className="text-yellow-400">(C)</span>
</p>

      
      {/* Términos */}
      <p className="text-center text-sm">
        <a
          href="/PoliticaPrivacidad"
          className="hover:underline"
        >
          Políticas de privacidad
        </a>
        {" | "}
        <a
          href="/terminos-condiciones"
          className="hover:underline"
        >
          Términos de condiciones y uso
        </a>
        {" | "}
        <a
          href="/politica-compra"
          className="hover:underline"
        >
          Política de compra
        </a>
        {" | "}
        <a
          href="/politicarembolso"
          className="hover:underline"
        >
          Política de rembolso
        </a>
      </p>
    </div>

  

  </footer>
 
  </>
  );
};

export default ComponentName;
