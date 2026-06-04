import React from 'react';

export const Features: React.FC = () => {
  return (
    <>
      {/* --- ¿QUÉ ES UBIBUS? --- */}
      <section id="que-es" className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4">Definición del Proyecto</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 tracking-tight">¿Qué es UbiBusSV?</h3>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            UbiBusSV es una plataforma web progresiva (PWA) diseñada para resolver la incertidumbre del transporte público en El Salvador. Utiliza tecnología de geolocalización colaborativa (<span className="text-slate-900 font-semibold border-b-2 border-primary-200 px-1">Crowdsourcing</span>) para mostrar la posición de autobuses y microbuses en un mapa digital, permitiendo a los usuarios planificar sus viajes con datos reales.
          </p>
        </div>
      </section>

      {/* --- CÓMO FUNCIONA --- */}
      <section id="funciona" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-4">Modelo Operativo</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">Inteligencia Colectiva.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-primary-100 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-4">1. Búsqueda y Rastreo</h4>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                El usuario accede a la plataforma y selecciona su ruta de interés. El sistema despliega un mapa vectorial mostrando las unidades activas en tiempo real.
              </p>
            </div>

            {/* Card 2 (Highlight) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-brand-orange flex items-center justify-center mb-8 backdrop-blur-sm border border-white/5">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-4">2. Reporte Activo</h4>
                <p className="text-slate-300 leading-relaxed">
                  Al abordar una unidad, el usuario activa el modo <strong className="text-white">"Reportar Viaje"</strong>. Su dispositivo transmite coordenadas anónimas, ayudando a otros a ver el bus.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-brand-orange/20 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-4">3. Alertas en Ruta</h4>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                La red permite reportar incidencias críticas como tráfico pesado, retenes o unidades llenas, distribuyendo la información a todos al instante.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
