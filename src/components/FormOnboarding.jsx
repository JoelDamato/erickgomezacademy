import React, { useState, useEffect } from "react";
import axios from "axios";

const FormOnboarding = () => {
  const [step, setStep] = useState(1);
  const [enviado, setEnviado] = useState(false);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({
    pais: "",
    whatsapp: "",
    instagram: "",
    trabajaComoBarbero: "",
    tipoTrabajo: "",
    tiempoCorte: "",
    precioPromedio: "",
    desafio: [],
    herramientas: [],
    motivacion: "",
    objetivo3Meses: "",
    aprenderClientes: "",
    abrirBarberia: "",
    serEducador: "",
    esfuerzoExtra: ""
  });

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://back-cursos.onrender.com"
      : "http://localhost:5000";

  const nombre = localStorage.getItem("nombre") || "";
  const email = localStorage.getItem("email") || "";

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/onboarding?email=${email}`);
        const data = await res.json();
        if (!data.completed) {
          setShouldShowForm(true);
        }
      } catch (err) {
        console.error("Error al verificar onboarding:", err);
      } finally {
        setLoading(false);
      }
    };
    if (email) checkOnboarding();
  }, [API_BASE_URL, email]);

  const isStep1Valid = () => {
    const newErrors = {};
    const { pais, whatsapp, instagram, trabajaComoBarbero, tiempoCorte, precioPromedio, tipoTrabajo } = formData;
  
    if (!pais) newErrors.pais = "Debés completar tu país de residencia";
    if (!whatsapp) newErrors.whatsapp = "Ingresá tu número de WhatsApp";
    if (!instagram) newErrors.instagram = "Ingresá tu cuenta de Instagram";
    if (!trabajaComoBarbero) newErrors.trabajaComoBarbero = "Indicá si actualmente trabajás como barbero";
    if (trabajaComoBarbero === "si" && !tipoTrabajo) newErrors.tipoTrabajo = "Seleccioná el tipo de trabajo que hacés";
    if (!tiempoCorte) newErrors.tiempoCorte = "Indicá hace cuánto cortás el pelo";
    if (!precioPromedio) newErrors.precioPromedio = "Ingresá tu precio promedio por corte";
    
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const isStep2Valid = () => {
    const newErrors = {};
    const {
      desafio,
      herramientas,
      motivacion,
      objetivo3Meses,
      aprenderClientes,
      abrirBarberia,
      serEducador,
      esfuerzoExtra
    } = formData;
  
    if (desafio.length === 0) newErrors.desafio = "Contanos cuál es tu mayor desafío";
    if (herramientas.length === 0) newErrors.herramientas = "Seleccioná al menos una herramienta que uses";
  
    if (!motivacion || motivacion.length < 20)
      newErrors.motivacion = "Escribí al menos 20 caracteres en tu motivación";
  
    if (!objetivo3Meses || objetivo3Meses.length < 20)
      newErrors.objetivo3Meses = "Escribí al menos 20 caracteres en tu objetivo";
  
    if (!aprenderClientes || aprenderClientes.length < 20)
      newErrors.aprenderClientes = "Escribí al menos 20 caracteres sobre cómo atraer clientes";
  
    if (!serEducador || serEducador.length < 20)
      newErrors.serEducador = "Escribí al menos 20 caracteres sobre si querés ser educador";
  
    if (!abrirBarberia) newErrors.abrirBarberia = "Seleccioná si te interesa abrir una barbería";
    if (!esfuerzoExtra) newErrors.esfuerzoExtra = "Indicá si estás dispuesto a invertir esfuerzo extra";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const current = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...current, value]
            : current.filter((item) => item !== value),
        };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep2Valid()) return alert("Por favor completá todas las preguntas antes de enviar.");
    const dataToSend = { ...formData, nombre, email, fechaRegistro: new Date().toISOString() };
    try {
      const res = await fetch(`${API_BASE_URL}/api/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (res.ok) {
        setEnviado(true);
      } else if (res.status === 409) {
        alert("Ya completaste este formulario.");
        setShouldShowForm(false);
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const [progress, setProgress] = useState(0);

useEffect(() => {
  if (enviado) {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > 87) {
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 15); // velocidad de animación (más bajo = más rápido)
  }
}, [enviado]);

useEffect(() => {
  if (!email) return;
  const token = localStorage.getItem("token"); // o usá tu lógica para obtenerlo
  axios
    .post(`${API_BASE_URL}/api/search/users`, { email }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Error al obtener usuario:', err));
}, [API_BASE_URL, email]);

const tieneMasterFade = user?.cursos?.some(curso => 
  curso.toLowerCase().includes("master fade 3.0")
);


  if (loading) return null;
  if (!shouldShowForm && !enviado) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-gray-400 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 text-white">
        {enviado ? (
            <div className="text-center space-y-8 py-16 px-6 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-gray-700 shadow-2xl">
  <h2 className="text-4xl font-bold text-transparent bg-gradient-to-b from-gray-200 to-white bg-clip-text">
    ¡Gracias por completar el formulario!
  </h2>
  <p className="text-lg text-gray-400">
    Bienvenido a la nueva <span className="text-white font-semibold">Erick Gómez Academy</span>. Ya sos parte del nuevo sistema educativo. ¡Nos vemos adentro!
  </p>


  <button
  onClick={() => {
    setShouldShowForm(false);
    setEnviado(false); // 🔁 Esto cierra todo el modal al apretar "Cerrar"
  }}
  className="mt-8 bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
>
  Cerrar
</button>

</div>

        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          {tieneMasterFade ? (
  <>
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-gray-400">
      🎓 FORMULARIO DE ONBOARDING – MASTER FADE 3.0
    </h1>
    <p className="text-center text-sm md:text-base text-gray-300 mb-8 max-w-3xl mx-auto space-y-2">
      🫱🏼‍🫲🏽 Queremos conocerte mejor para ayudarte a crecer en verdad.<br /><br />
      Este no es solo otro curso de barbería. <strong>Master Fade 3.0</strong> es el primer nivel del nuevo sistema educativo de Erick Gómez Academy, creado para formar barberos de alto nivel que quieran destacarse de verdad paso a paso, nivel a nivel.<br /><br />
      <strong>Antes de comenzar, necesitamos conocerte un poco más:</strong><br />
       Saber en qué etapa estás hoy.<br />
       Entender qué te trajo hasta acá.<br />
       Y sobre todo, ayudarte a que este entrenamiento te dé resultados reales.<br /><br />
      Completá este formulario con calma, siendo sincero y pensando en cada pregunta respondida. Nos va a servir para darte un mejor seguimiento, ubicarte en el punto exacto del mapa educativo… y empezar este camino como se merece: con claridad y propósito.
    </p>
  </>
) : (
  <>
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white/70 to-gray-400">
      Formulario de Integración al Nuevo Sistema Educativo de Erick Gómez Academy
    </h1>
    <p className="text-center text-sm md:text-base text-gray-300 mb-8">
      Necesitamos conocerte mejor para acompañarte en tu próxima etapa como profesional. Este formulario es obligatorio para todos los alumnos actuales de la Academia. No afecta tu acceso a los cursos que ya compraste, pero si no lo llenás, no vas a poder integrarte al nuevo sistema educativo. Este formulario va a ser revisado personalmente por Erick, y es el primer paso para avanzar hacia tu próxima etapa dentro de la Academia. Tomate 2 minutos y completalo con calma. Este es tu pase para seguir creciendo.
    </p>
  </>
)}


            {step === 1 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input name="pais" placeholder="País de residencia" onChange={handleChange} value={formData.pais} className="p-3 bg-zinc-900 border border-gray-500 rounded" required />
    <input
  name="whatsapp"
  placeholder="WhatsApp"
  inputMode="numeric"
  pattern="[0-9]*"
  onChange={handleChange}
  onKeyDown={(e) => {
    const allowedKeys = [
      "Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"
    ];
    if (
      !/[0-9]/.test(e.key) &&
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault();
    }
  }}
  value={formData.whatsapp}
  className="p-3 bg-zinc-900 border border-gray-500 rounded"
  required
/>

    <input name="instagram" placeholder="Instagram (de tus trabajos)" onChange={handleChange} value={formData.instagram} className="p-3 bg-zinc-900 border border-gray-500 rounded col-span-full" required />

    <div className="col-span-full">
      <label className="block mb-1">¿Actualmente trabajás como barbero?</label>
      <select name="trabajaComoBarbero" onChange={handleChange} value={formData.trabajaComoBarbero} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required>
        <option value="">Seleccionar</option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    </div>

    {formData.trabajaComoBarbero === "si" && (
      <div className="col-span-full">
        <label className="block mb-1">¿Trabajás en:</label>
        <select name="tipoTrabajo" onChange={handleChange} value={formData.tipoTrabajo} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required>
          <option value="">Seleccionar</option>
          <option value="propia">Barbería propia</option>
          <option value="ajena">Barbería ajena</option>
          <option value="domicilio">A domicilio</option>
          <option value="otra">Otra</option>
        </select>
      </div>
    )}

    <div className="col-span-full">
      <label className="block mb-1">¿Hace cuánto tiempo cortás?</label>
      <select name="tiempoCorte" onChange={handleChange} value={formData.tiempoCorte} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required>
        <option value="">Seleccionar</option>
        <option value="<1">Menos de 1 año</option>
        <option value="1-3">1 a 3 años</option>
        <option value="3-5">3 a 5 años</option>
        <option value=">5">Más de 5 años</option>
      </select>
    </div>



    <input name="precioPromedio" placeholder="¿Cuál es tu precio promedio en usd por corte?" onChange={handleChange} value={formData.precioPromedio} className="col-span-full p-3 bg-zinc-900 border border-gray-500 rounded" required />
   
    {Object.keys(errors).length > 0 && (
  <div className="col-span-full bg-red-500/10 border border-red-500 text-red-400 text-sm p-4 rounded">
    <ul className="list-disc list-inside space-y-1">
      {Object.values(errors).map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </div>
)}
    <button
  type="button"
  onClick={() => {
    if (isStep1Valid()) setStep(2);
  }}
  className="col-span-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition"
>
  Siguiente
</button>


  </div>
)}
{step === 2 && (
  <div className="space-y-4">
    <label className="block">¿Cuál es tu mayor desafío hoy en tu barbería?</label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {['Cobrar más caro', 'Conseguir más clientes', 'Fidelizar clientes', 'Mejorar mi técnica', 'Mostrar mi trabajo en redes', 'Otra'].map((op) => (
        <label key={op}><input type="checkbox" name="desafio" value={op} onChange={handleChange} className="mr-2" />{op}</label>
      ))}
    </div>

    <label className="block">¿Qué herramientas usás actualmente?</label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {['Tijeras de corte', 'Tijeras de entresacar', 'Máquina', 'Navaja', 'Peines'].map((tool) => (
        <label key={tool}><input type="checkbox" name="herramientas" value={tool} onChange={handleChange} className="mr-2" />{tool}</label>
      ))}
    </div>

    <textarea name="motivacion" placeholder="¿Qué te motivó a tomar Master Fade 3.0?" value={formData.motivacion} onChange={handleChange} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required />
    <textarea name="objetivo3Meses" placeholder="¿Qué objetivo querés lograr en los próximos 3 meses?" value={formData.objetivo3Meses} onChange={handleChange} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required />
    <textarea name="aprenderClientes" placeholder="¿Te gustaría aprender sobre cómo atraer más clientes y crecer en redes? ¿Por qué?" value={formData.aprenderClientes} onChange={handleChange} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required />

    <label className="block">¿Estás interesado en abrir tu propia barbería?</label>
    <select name="abrirBarberia" onChange={handleChange} value={formData.abrirBarberia} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required>
      <option value="">Seleccionar</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
      <option value="ya">Ya la tengo</option>
    </select>

    <textarea name="serEducador" placeholder="¿Te gustaría convertirte en educador/barbero referente en tu ciudad?" value={formData.serEducador} onChange={handleChange} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required />

    <label className="block">¿Estarías dispuesto a invertir tiempo y esfuerzo extra para llevar tu carrera al siguiente nivel después de Master Fade 3.0?</label>
    <select name="esfuerzoExtra" onChange={handleChange} value={formData.esfuerzoExtra} className="w-full p-3 bg-zinc-900 border border-gray-500 rounded" required>
      <option value="">Seleccionar</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
      <option value="dudoso">No estoy seguro</option>
    </select>
    {Object.keys(errors).length > 0 && (
  <div className="col-span-full bg-red-500/10 border border-red-500 text-red-400 text-sm p-4 rounded">
    <ul className="list-disc list-inside space-y-1">
      {Object.values(errors).map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </div>
)}

    <div className="flex gap-4 mt-6">
      <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-700 text-white py-3 rounded font-bold hover:bg-gray-600 transition">
        Volver
      </button>
      <button
  type="submit"
  className="flex-1 bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition"
>
  Enviar Formulario
</button>

    </div>
  </div>
)}


          </form>
        )}
      </div>
    </div>
  );
};

export default FormOnboarding;
