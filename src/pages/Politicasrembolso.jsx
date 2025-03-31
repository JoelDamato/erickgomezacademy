import React from "react";

const PoliticasReembolso = () => {
  return (
    <div className="bg-black flex flex-col text-white text-[20px] leading-tight p-4 w-full mx-auto">
      <h2 className="font-bold mb-8 text-center text-2xl">🔒 Políticas de Reembolso – Erick Gómez Academy</h2>
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="px-4">
          En Erick Gómez Academy, confiamos plenamente en el valor de nuestros cursos y en la transformación que pueden generar en tu camino como barbero profesional. Aun así, entendemos que pueden surgir dudas o situaciones imprevistas. Por eso, ofrecemos una garantía de satisfacción de 7 días en todos nuestros cursos online.
        </p>

        <div className="space-y-2">
          <p className="font-bold">✅ ¿Cuándo podés pedir un reembolso?</p>
          <p>Podés solicitar el reembolso dentro de los primeros 7 días desde la fecha de compra.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">💬 ¿Cómo pedirlo?</p>
          <p>Simplemente escribinos por WhatsApp al mismo número desde el cual realizaste la compra, indicando tu nombre completo y comprobante de pago.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">🔁 ¿Cuándo lo procesamos?</p>
          <p>Una vez aprobado el pedido, el reembolso se procesa en un plazo de hasta 7 días hábiles.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">⚠️ Importante:</p>
          <ul className="list-disc pl-8 space-y-2 text-left mx-auto max-w-md">
            <li>Esta política aplica a todos nuestros cursos online.</li>
            <li>No se realizan reembolsos luego de los 7 días desde la compra.</li>
            <li>Al solicitar un reembolso, perderás automáticamente el acceso al contenido del curso.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PoliticasReembolso;