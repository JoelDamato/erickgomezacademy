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
        Erick Gómez Academy 2019®️ | Todos los derechos reservados ©️
      </p>
      
      {/* Términos */}
      <p className="text-center text-sm">
        <a
          href="/politicas-de-privacidad"
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
      </p>
    </div>

    <div className="flex flex-col text-white text-[10px] leading-tight p-4 max-w-md mx-auto">
  <h2 className="font-bold mb-2 text-center">🔒 Políticas de Reembolso – Erick Gómez Academy</h2>
  <div className="space-y-2">
    <p>
      En Erick Gómez Academy, confiamos plenamente en el valor de nuestros cursos y en la transformación que pueden generar en tu camino como barbero profesional. Aun así, entendemos que pueden surgir dudas o situaciones imprevistas. Por eso, ofrecemos una garantía de satisfacción de 7 días en todos nuestros cursos online.
    </p>

    <div>
      <p className="font-bold inline">✅ ¿Cuándo podés pedir un reembolso?</p>
      <p className="inline"> Podés solicitar el reembolso dentro de los primeros 7 días desde la fecha de compra.</p>
    </div>

    <div>
      <p className="font-bold inline">💬 ¿Cómo pedirlo?</p>
      <p className="inline"> Simplemente escribinos por WhatsApp al mismo número desde el cual realizaste la compra, indicando tu nombre completo y comprobante de pago.</p>
    </div>

    <div>
      <p className="font-bold inline">🔁 ¿Cuándo lo procesamos?</p>
      <p className="inline"> Una vez aprobado el pedido, el reembolso se procesa en un plazo de hasta 7 días hábiles.</p>
    </div>

    <p className="font-bold">⚠️ Importante:</p>
    <ul className="list-disc pl-4 space-y-1">
      <li>Esta política aplica a todos nuestros cursos online.</li>
      <li>No se realizan reembolsos luego de los 7 días desde la compra.</li>
      <li>Al solicitar un reembolso, perderás automáticamente el acceso al contenido del curso.</li>
    </ul>
  </div>
</div>

  </footer>
 
  </>
  );
};

export default ComponentName;
