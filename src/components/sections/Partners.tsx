import React from 'react';

export const Partners: React.FC = () => {
  return (
    <section id="empresas" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-primary-300 backdrop-blur-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
            </svg>
            Para Motoristas y Empresas
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">Una plataforma, <br />tres roles.</h3>
          <p className="text-slate-400 leading-relaxed text-lg max-w-lg">
            UbiBusSV no es solo un mapa para pasajeros. Los motoristas tienen su propio portal para transmitir su ubicación de forma automática, y las empresas de transporte cuentan con un panel para ver en tiempo real toda su flota, asignar rutas y revisar reportes de sus unidades.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 text-primary-300 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-white mb-1">Portal del Motorista</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Login simple, ruta anclada automáticamente y transmisión de posición en segundo plano.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 text-brand-orange flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-white mb-1">Panel de Empresa</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Visibilidad de toda tu flota, asignación de rutas y conductores, y reportes filtrados a tus unidades.</p>
              </div>
            </div>
          </div>

          <a href="#contacto" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group">
            Quiero registrar mi empresa o unidad
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* VISTA PREVIA ILUSTRATIVA DEL PANEL DE EMPRESA */}
        <div className="glass-dark p-1 rounded-3xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-slate-900/80 rounded-2xl p-6 md:p-8 font-mono text-sm leading-relaxed overflow-hidden">
            {/* Cabecera de Ventana Mac */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-[11px] font-sans font-semibold text-slate-400">Panel de Empresa · Vista previa</span>
            </div>

            <div className="space-y-3 font-sans">
              {[
                { ruta: 'Ruta 44', motorista: 'Mario R.', estado: 'Activo', color: 'bg-emerald-400' },
                { ruta: 'Ruta 12', motorista: 'Ana L.', estado: 'Activo', color: 'bg-emerald-400' },
                { ruta: 'Ruta 7', motorista: 'Sin asignar', estado: 'Inactivo', color: 'bg-slate-500' },
              ].map((row) => (
                <div key={row.ruta} className="flex items-center justify-between bg-slate-800/60 rounded-xl px-4 py-3 border border-white/5">
                  <div>
                    <p className="text-white font-semibold text-sm">{row.ruta}</p>
                    <p className="text-slate-400 text-xs">{row.motorista}</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-slate-300">
                    <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
                    {row.estado}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 font-sans flex items-center justify-between text-xs text-slate-500">
              <span>2 rutas activas</span>
              <span>Actualizado en tiempo real</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
