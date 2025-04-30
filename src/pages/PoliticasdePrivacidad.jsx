import React from "react";

const PoliticasPrivacidad = () => {
  return (
    <div className="bg-black flex flex-col text-white text-[20px] leading-tight p-4 w-full mx-auto">
      <h2 className="font-bold mb-8 text-center text-2xl">🔐 Política de Privacidad – Erick Gómez Academy</h2>
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="px-4">
          En Erick Gómez Academy valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando accedés a nuestra plataforma y cursos online.
        </p>

        <div className="space-y-2">
          <p className="font-bold">📥 ¿Qué datos recopilamos?</p>
          <p>Recopilamos tu nombre, correo electrónico, número de WhatsApp, país, y otros datos que brindás voluntariamente al registrarte o al realizar una compra.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">🎯 ¿Para qué usamos tu información?</p>
          <ul className="list-disc pl-8 space-y-2 text-left mx-auto max-w-md">
            <li>Para brindarte acceso a nuestros cursos y recursos.</li>
            <li>Para enviarte información relevante sobre tu progreso, actualizaciones y contenido exclusivo.</li>
            <li>Para mejorar nuestros servicios y tu experiencia como alumno.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-bold">🔒 ¿Cómo protegemos tu información?</p>
          <p>
            Utilizamos medidas de seguridad técnicas y administrativas para proteger tu información contra accesos no autorizados, pérdida o divulgación.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">🤝 ¿Compartimos tus datos?</p>
          <p>No compartimos tu información personal con terceros, salvo que sea estrictamente necesario para brindarte nuestros servicios (como plataformas de pago o envío de mails), o requerido por ley.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">🧾 Tus derechos</p>
          <p>Podés solicitar en cualquier momento acceder, actualizar o eliminar tus datos escribiéndonos a través de nuestros canales oficiales.</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">📅 Última actualización:</p>
          <p>Abril 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PoliticasPrivacidad;
