import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '../../context/ToastContext';

export const Hero: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const MAP_IMAGE = "/mapa-celular.png";

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast("Por favor, introduce un correo electrónico válido.", "error");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'whitelist'), {
        email: email.toLowerCase().trim(),
        date: serverTimestamp(),
        source: 'landing_fixed'
      });
      setJoined(true);
      setEmail('');
      showToast("¡Te has unido con éxito al acceso anticipado!", "success");
    } catch (err) {
      console.error(err);
      showToast("Hubo un problema de conexión. Inténtalo de nuevo.", "error");
    }
    setLoading(false);
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      {/* Blobs de fondo para interés visual */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-700 shadow-sm transition-all duration-300 hover:bg-primary-100/50 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Plataforma Activa en San Salvador
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-medium text-slate-900 leading-[1.05] tracking-tight">
              Transporte inteligente para una <br className="hidden lg:block" />
              <span className="text-gradient font-bold">
                ciudad conectada.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Optimizamos la movilidad urbana mediante inteligencia colectiva. Visualiza rutas, anticipa llegadas y repórtate en el mapa.
            </p>

            {/* FORMULARIO WHITELIST */}
            <div className="max-w-md mx-auto lg:mx-0 pt-0">
              <p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-center lg:justify-start gap-2">
                <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Únete al Acceso Anticipado
              </p>
              <form onSubmit={handleJoin} className="relative group flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full flex-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all text-slate-900 shadow-md placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  disabled={loading}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 disabled:opacity-70 disabled:hover:transform-none whitespace-nowrap"
                >
                  {loading ? 'Enviando...' : 'Notificarme'}
                </button>
              </form>
              {joined && (
                <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center justify-center lg:justify-start gap-2 bg-emerald-50 py-2 px-4 rounded-xl w-fit mx-auto lg:mx-0 border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ¡Te hemos añadido a la lista!
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: TELÉFONO MOCKUP ESTÁTICO PREMIUM */}
          <div className="flex-none relative animate-fade-in-up mt-8 lg:mt-0" style={{ animationDelay: '0.2s' }}>
            {/* Decoración de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-400/20 to-brand-orange/20 rounded-full blur-[80px] -z-10"></div>

            {/* TELÉFONO TIPO IPHONE */}
            <div className="relative w-64 h-[520px] lg:w-64 lg:h-[540px] xl:w-72 xl:h-[580px] bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] border-[6px] lg:border-[8px] border-slate-900 ring-1 ring-slate-800/10 z-10 transform lg:-rotate-2 hover:rotate-0 hover:scale-[1.01] transition-all duration-700 ease-out mx-auto">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 lg:w-32 h-5 lg:h-6 bg-slate-900 rounded-b-xl lg:rounded-b-2xl z-20"></div>

              {/* PANTALLA INTERNA */}
              <div className="w-full h-full bg-slate-50 rounded-[2rem] lg:rounded-[2.25rem] overflow-hidden relative border border-slate-800">
                
                {/* VISTA DE IMAGEN ESTÁTICA */}
                <img
                  src={MAP_IMAGE}
                  alt="App Interface"
                  className="w-full h-full object-cover brightness-[0.96]"
                />

                {/* ELEMENTOS FLOTANTES UI MEJORADOS */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full border border-white/40 shadow-md flex items-center gap-2 transition-transform hover:scale-105 duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">San Salvador, SV</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
