import React, { useState } from 'react';

type TabLanguage = 'javascript' | 'curl' | 'python';

export const Developers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabLanguage>('javascript');

  const snippets: Record<TabLanguage, string> = {
    javascript: `// Petición con Fetch API en Javascript
const response = await fetch('https://api.ubibus.sv/v1/routes/44');
const data = await response.json();

console.log(data);`,
    curl: `# Consulta de ruta usando cURL
curl -X GET "https://api.ubibus.sv/v1/routes/44" \\
     -H "Accept: application/json"`,
    python: `# Obtener datos con requests en Python
import requests

response = requests.get('https://api.ubibus.sv/v1/routes/44')
data = response.json()

print(data)`
  };

  return (
    <section id="developers" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-primary-300 backdrop-blur-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Para Desarrolladores
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">API de Transporte Abierta</h3>
          <p className="text-slate-400 leading-relaxed text-lg max-w-lg">
            Estamos construyendo la infraestructura de datos más robusta del país. Integre nuestros endpoints de geolocalización en sus propios sistemas municipales, apps o pantallas informativas.
          </p>
          <button className="group flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors opacity-60 cursor-not-allowed">
            Ver Documentación (Próximamente)
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* CÓDIGO CON PESTAÑAS INTERACTIVAS */}
        <div className="glass-dark p-1 rounded-3xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-slate-900/80 rounded-2xl p-6 md:p-8 font-mono text-sm leading-relaxed overflow-hidden">
            {/* Cabecera de Ventana Mac */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex bg-slate-800/80 rounded-xl p-0.5 border border-white/5 text-[11px] font-sans font-semibold">
                <button
                  onClick={() => setActiveTab('javascript')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'javascript' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  JS
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'curl' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'python' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Python
                </button>
              </div>
            </div>
            
            {/* Snippet de Código */}
            <div className="overflow-x-auto min-h-[140px] text-slate-300">
              <pre className="text-left text-xs md:text-sm">
                <code>{snippets[activeTab]}</code>
              </pre>
            </div>

            {/* Respuesta Simulada */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-slate-500 text-xs italic mb-2">// Respuesta JSON del servidor:</p>
              <pre className="text-amber-300/90 text-left text-xs bg-slate-950/40 p-4 rounded-xl border border-white/5">
{`{
  "status": "active",
  "units_tracking": 14,
  "next_eta": "5 mins",
  "congestion_level": "moderate"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
