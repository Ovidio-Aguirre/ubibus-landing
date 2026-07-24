import React from 'react';
import { useInView } from '../../hooks/useInView';

type Accent = 'primary' | 'orange';

const ACCENT_STYLES: Record<Accent, { iconBg: string; iconText: string; iconHoverBg: string; badgeBg: string; topBar: string; ring: string }> = {
  primary: {
    iconBg: 'bg-blue-50',
    iconText: 'text-primary-600',
    iconHoverBg: 'group-hover:bg-primary-600',
    badgeBg: 'bg-primary-600',
    topBar: 'from-primary-500 to-primary-300',
    ring: 'ring-primary-500/10',
  },
  orange: {
    iconBg: 'bg-orange-50',
    iconText: 'text-brand-orange',
    iconHoverBg: 'group-hover:bg-brand-orange',
    badgeBg: 'bg-brand-orange',
    topBar: 'from-brand-orange to-orange-300',
    ring: 'ring-brand-orange/10',
  },
};

interface FeatureCardProps {
  step: number;
  accent: Accent;
  iconPath: string;
  title: string;
  description: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ step, accent, iconPath, title, description, badge, highlight }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = ACCENT_STYLES[accent];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${step * 90}ms` }}
    >
      <div
        className={`relative h-full ${highlight
          ? 'bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl hover:shadow-2xl hover:shadow-primary-500/10'
          : `bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:ring-8 ${style.ring}`
        } p-8 pt-10 rounded-3xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden group`}
      >
        {/* Barra de acento superior */}
        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${highlight ? 'from-brand-orange to-orange-300' : style.topBar}`} />

        {/* Número de paso flotante */}
        <div
          className={`absolute -top-5 left-7 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg ring-4 ring-slate-50 ${highlight ? 'bg-brand-orange' : style.badgeBg}`}
        >
          {step}
        </div>

        {badge && (
          <span className="absolute top-5 right-5 bg-brand-orange text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider animate-pulse">
            {badge}
          </span>
        )}

        {highlight ? (
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
        ) : null}

        <div className="relative z-10">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
              highlight ? 'bg-white/10 text-brand-orange backdrop-blur-sm border border-white/5' : `${style.iconBg} ${style.iconText} ${style.iconHoverBg}`
            }`}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
          </div>
          <h4 className={`text-xl font-display font-bold mb-3 ${highlight ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
          <p className={`text-sm leading-relaxed transition-colors ${highlight ? 'text-slate-300' : 'text-slate-600 group-hover:text-slate-700'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

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
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-4">Modelo Operativo</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">Inteligencia Colectiva.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <FeatureCard
              step={1}
              accent="primary"
              badge="Nuevo"
              iconPath="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              title="Llegar"
              description={<>¿No sabés qué bus tomar? Escribe a dónde vas y el planificador te dice qué ruta te lleva —directa o con transbordo— y cómo caminar hasta la parada.</>}
            />

            <FeatureCard
              step={2}
              accent="orange"
              iconPath="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              title="Búsqueda y ETA"
              description={<>Selecciona tu ruta y el mapa te muestra las unidades activas junto con el tiempo estimado de llegada a tu parada.</>}
            />

            <FeatureCard
              step={3}
              accent="orange"
              highlight
              iconPath="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              title="Abordar"
              description={<>Al subirte a una unidad, activa <strong className="text-white">"Abordar"</strong>. Tu ubicación se transmite de forma anónima y en tiempo real, ayudando a que otros vean por dónde va el bus y qué tan lleno viene.</>}
            />

            <FeatureCard
              step={4}
              accent="primary"
              iconPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              title="Favoritos y Alertas"
              description={<>Marca tus rutas favoritas y recibe un aviso automático cuando tu bus esté a menos de 500 metros de tu parada.</>}
            />

            <FeatureCard
              step={5}
              accent="orange"
              iconPath="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              title="Reportes Comunitarios"
              description={<>Reporta tráfico, retenes o unidades llenas. Otros usuarios validan cada reporte con votos para mantener la información confiable.</>}
            />
          </div>
        </div>
      </section>

      {/* --- COBERTURA BETA --- */}
      <section id="cobertura" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4">Cobertura de Lanzamiento</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">Llegamos pronto a 7 municipios.</h3>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Estamos por lanzar la beta y creceremos con cada persona que se una. Estos son los municipios donde vas a poder ver tu bus en tiempo real:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['San Salvador', 'Soyapango', 'Santa Tecla', 'Antiguo Cuscatlán', 'Mejicanos', 'Apopa', 'Ilopango'].map((municipio) => (
              <span
                key={municipio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {municipio}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-400 mt-8">¿Tu municipio no está en la lista? Únete al acceso anticipado y sé de los primeros en tenerlo.</p>
        </div>
      </section>
    </>
  );
};
