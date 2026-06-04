import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '../../context/ToastContext';

export const Hero: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSimulation, setShowSimulation] = useState(true);

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
      {/* Hoja de estilo en línea para animaciones exclusivas del simulador */}
      <style>{`
        @keyframes moveBus1 {
          0% { top: 100px; left: -20px; transform: translate(-50%, -50%) rotate(90deg); }
          30% { top: 100px; left: 100px; transform: translate(-50%, -50%) rotate(90deg); }
          35% { top: 100px; left: 100px; transform: translate(-50%, -50%) rotate(180deg); }
          65% { top: 250px; left: 100px; transform: translate(-50%, -50%) rotate(180deg); }
          70% { top: 250px; left: 100px; transform: translate(-50%, -50%) rotate(135deg); }
          100% { top: 390px; left: 240px; transform: translate(-50%, -50%) rotate(135deg); }
        }
        @keyframes moveBus2 {
          0% { top: 420px; left: 200px; transform: translate(-50%, -50%) rotate(-90deg); }
          100% { top: -20px; left: 200px; transform: translate(-50%, -50%) rotate(-90deg); }
        }
        .animate-bus-1 {
          animation: moveBus1 18s infinite linear;
        }
        .animate-bus-2 {
          animation: moveBus2 14s infinite linear;
        }
      `}</style>

      {/* Blobs de fondo para interés visual */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-700 shadow-sm">
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
                  className="w-full flex-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all text-slate-900 shadow-sm placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  disabled={loading}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:transform-none whitespace-nowrap"
                >
                  {loading ? 'Enviando...' : 'Notificarme'}
                </button>
              </form>
              {joined && (
                <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center justify-center lg:justify-start gap-2 bg-emerald-50 py-2 px-4 rounded-xl w-fit mx-auto lg:mx-0 border border-emerald-100">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ¡Te hemos añadido a la lista!
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: TELÉFONO INTERACTIVO */}
          <div className="flex-none relative animate-fade-in-up mt-8 lg:mt-0" style={{ animationDelay: '0.2s' }}>
            {/* Decoración de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-400/20 to-brand-orange/20 rounded-full blur-[80px] -z-10"></div>

            {/* TELÉFONO TIPO IPHONE */}
            <div className="relative w-64 h-[520px] lg:w-64 lg:h-[540px] xl:w-72 xl:h-[580px] bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border-[6px] lg:border-[8px] border-slate-900 ring-1 ring-slate-800/10 z-10 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 ease-out mx-auto">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 lg:w-32 h-5 lg:h-6 bg-slate-900 rounded-b-xl lg:rounded-b-2xl z-20"></div>

              {/* PANTALLA INTERNA */}
              <div className="w-full h-full bg-slate-50 rounded-[2rem] lg:rounded-[2.25rem] overflow-hidden relative border border-slate-800">
                
                {showSimulation ? (
                  /* SIMULADOR EN VIVO */
                  <div className="w-full h-full bg-[#0b0f19] relative overflow-hidden flex flex-col justify-between p-4 font-sans select-none">
                    
                    {/* Grid de fondo del mapa */}
                    <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#ffffff 1.2px, transparent 1.2px)', backgroundSize: '20px 20px' }}></div>
                    
                    {/* Calles vectoriales del mapa */}
                    <svg className="absolute inset-0 w-full h-full text-slate-800/60" xmlns="http://www.w3.org/2000/svg">
                      <path d="M-20,100 L350,100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d="M-20,250 L350,250" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d="M100,-20 L100,600" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d="M200,-20 L200,600" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d="M100,250 L280,390" stroke="currentColor" strokeWidth="6" strokeDasharray="6,6" strokeLinecap="round" fill="none" />
                    </svg>

                    {/* Encabezado del mapa */}
                    <div className="z-30 w-full pt-6">
                      <div className="glass-dark px-3 py-1.5 rounded-full flex items-center justify-between border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">San Salvador</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400">14 buses activos</span>
                      </div>
                    </div>

                    {/* Ubicación del usuario pulsante */}
                    <div className="absolute top-[250px] left-[100px] -translate-x-1/2 -translate-y-1/2 z-15">
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-primary-500 border-2 border-white shadow"></span>
                      </span>
                    </div>

                    {/* BUS ANIMADO 1: RUTA 44 */}
                    <div className="absolute z-20 animate-bus-1 cursor-pointer group/bus">
                      <div className="bg-brand-orange text-white p-1.5 rounded-xl shadow-lg border border-white/20 hover:scale-120 hover:bg-orange-500 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-900/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md border border-slate-700 shadow whitespace-nowrap">
                        R-44
                      </div>
                    </div>

                    {/* BUS ANIMADO 2: RUTA 101 */}
                    <div className="absolute z-20 animate-bus-2 cursor-pointer group/bus">
                      <div className="bg-primary-500 text-white p-1.5 rounded-xl shadow-lg border border-white/20 hover:scale-120 hover:bg-primary-600 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-900/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md border border-slate-700 shadow whitespace-nowrap">
                        R-101
                      </div>
                    </div>

                    {/* Tarjeta flotante inferior */}
                    <div className="z-30 bg-[#121824]/95 border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-2 shadow-2xl backdrop-blur-md pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-orange-500/20 text-brand-orange flex items-center justify-center font-black text-xs border border-orange-500/10">
                          44
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">Próximo arribo</p>
                          <p className="text-xs font-bold text-white leading-none mt-0.5">UCA - Metrocentro</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-full font-bold border border-brand-orange/10">
                          ETA 3 min
                        </span>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* VISTA DE IMAGEN ESTÁTICA */
                  <img
                    src={MAP_IMAGE}
                    alt="App Interface"
                    className="w-full h-full object-cover brightness-[0.95]"
                  />
                )}

              </div>
            </div>

            {/* Selector de simulación */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowSimulation(!showSimulation)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-bold rounded-full transition-all border border-slate-200 shadow-sm"
              >
                <span className={`w-2 h-2 rounded-full ${showSimulation ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                {showSimulation ? 'Ver Captura Fija' : 'Ver Simulación en Vivo'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
