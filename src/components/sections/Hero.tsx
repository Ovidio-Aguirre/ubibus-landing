import React from 'react';
import { APP_URL } from '../../config';

export const Hero: React.FC = () => {
  const MAP_IMAGE = "/mapa-celular-v3.webp";

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
              Ya disponible en 7 municipios del Gran San Salvador
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-medium text-slate-900 leading-[1.05] tracking-tight">
              Ya no esperes <br className="hidden lg:block" />
              tu bus <span className="text-gradient font-bold">a ciegas.</span>
            </h1>

            <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
              La comunidad nos mueve
            </p>

            <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Mira en el mapa dónde viene tu bus, cuánto tarda en llegar y si va vacío, normal o lleno. Datos en tiempo real que genera la misma gente que ya viaja en él.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-primary-600/25 hover:bg-primary-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Probar la app
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-semibold text-lg shadow-md hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Dejar un comentario
              </a>
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
                  width={720}
                  height={1418}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover brightness-[0.96]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
