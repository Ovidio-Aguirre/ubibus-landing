import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from './firebase';

// --- COMPONENTE MODAL (VENTANAS EMERGENTES) ---
const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl w-full max-w-lg flex flex-col shadow-2xl border border-white/20 transform transition-all scale-100">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{title}</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">✕</button>
      </div>
      <div className="p-6 overflow-y-auto text-sm text-slate-600 space-y-4 text-justify leading-relaxed font-medium max-h-[60vh]">
        {children}
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
        <button onClick={onClose} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
          Cerrar
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const db = getFirestore(app);

  // --- CONFIGURACIÓN (AHORA DENTRO PARA EVITAR ERRORES) ---
  const MAP_IMAGE = "/mapa-celular.png"; 
  const CONTACT_EMAIL = "om4648654@gmail.com";
  // La APP_URL la dejamos definida por si la usas en el futuro en el footer
  const APP_URL = "https://rutas-sv-e437b.web.app";
  
  // --- ESTADOS ---
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sugMsg, setSugMsg] = useState('');
  const [sugSent, setSugSent] = useState(false);
  const [loadingSug, setLoadingSug] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FUNCIONES ---
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) { alert("Correo inválido."); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, 'whitelist'), { email: email.toLowerCase().trim(), date: serverTimestamp(), source: 'landing_fixed' });
      setJoined(true);
      setEmail('');
    } catch { alert("Error de conexión."); }
    setLoading(false);
  };

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sugMsg.trim()) return;
    setLoadingSug(true);
    try {
        await addDoc(collection(db, 'suggestions'), { message: sugMsg, date: serverTimestamp(), source: 'landing_feedback' });
        setSugSent(true);
        setSugMsg('');
    } catch { alert("Error al enviar."); }
    setLoadingSug(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* MODALES */}
      {showTerms && (
        <Modal title="Términos de Servicio" onClose={() => setShowTerms(false)}>
          <p><strong>1. Definición del Servicio:</strong> UbiBusSV actúa como un intermediario de información de movilidad. No operamos unidades de transporte ni garantizamos la puntualidad de las mismas.</p>
          <p><strong>2. Colaboración de Usuarios:</strong> La precisión del sistema depende de la veracidad de los reportes. Nos reservamos el derecho de vetar usuarios que introduzcan datos erróneos intencionalmente.</p>
          <p><strong>3. Propiedad Intelectual:</strong> Todos los derechos de código, marca y diseño pertenecen a <strong>Oscar Aguirre</strong>. Prohibida su reproducción total o parcial.</p>
        </Modal>
      )}

      {showPrivacy && (
        <Modal title="Política de Privacidad" onClose={() => setShowPrivacy(false)}>
          <p><strong>1. Datos de Ubicación:</strong> La geolocalización es efímera. Solo se transmite mientras el usuario mantiene activa la sesión de "Viaje". No guardamos historiales de movimiento personal.</p>
          <p><strong>2. Protección de Datos:</strong> Su correo electrónico se almacena en bases de datos cifradas y solo se usa para comunicaciones oficiales del servicio.</p>
        </Modal>
      )}

      {/* --- NAVBAR (SIN BOTÓN DE APP) --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            {/* LOGO */}
            <div className="flex items-center gap-1 select-none cursor-default">
                <span className="text-xl font-black italic tracking-tighter text-blue-700 leading-none">
                    UbiBus<span className="text-orange-500">SV</span>
                </span>
            </div>
            
            {/* ENLACES (Solo informativos) */}
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
                <a href="#que-es" className="hover:text-blue-600 transition-colors hidden sm:block">¿Qué es?</a>
                <a href="#funciona" className="hover:text-blue-600 transition-colors hidden sm:block">Cómo Funciona</a>
                <a href="#contacto" className="hover:text-blue-600 transition-colors">Sugerencias</a>
            </div>
        </div>
      </nav>

      {/* --- HERO SECTION (SIN ESPACIO BLANCO EXTRA) --- */}
      {/* Reduje el padding-top (pt-24) para subir el contenido */}
      <section className="pt-24 pb-16 lg:pt-28 lg:pb-20 px-6 max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              
              {/* COLUMNA IZQUIERDA: TEXTO */}
              <div className="flex-1 text-center md:text-left space-y-6 animate-in slide-in-from-bottom duration-700">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Plataforma Activa en San Salvador
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                      Infraestructura digital para el <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                          transporte colectivo.
                      </span>
                  </h1>
                  
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium max-w-lg mx-auto md:mx-0">
                      Optimizamos la movilidad urbana mediante inteligencia colectiva. Visualice rutas, anticipe llegadas y reporte incidencias.
                  </p>

                  {/* FORMULARIO WHITELIST */}
                  <div className="max-w-sm mx-auto md:mx-0 pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">Acceso anticipado Beta</p>
                      <form onSubmit={handleJoin} className="relative group">
                          <input 
                              type="email" 
                              placeholder="correo@ejemplo.com" 
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-28 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-sm text-slate-900 shadow-sm"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={loading}
                          />
                          <button 
                              disabled={loading}
                              className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white px-4 rounded-lg font-bold text-[10px] uppercase tracking-wide hover:bg-blue-600 transition-colors disabled:opacity-70 shadow-md"
                          >
                              {loading ? '...' : 'Notificarme'}
                          </button>
                      </form>
                      {joined && (
                          <div className="mt-2 text-green-600 text-xs font-bold flex items-center gap-1 justify-center md:justify-start animate-in fade-in">
                              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                              Registro confirmado.
                          </div>
                      )}
                  </div>
              </div>

              {/* COLUMNA DERECHA: TELÉFONO REALISTA */}
              <div className="flex-none relative animate-in zoom-in duration-1000 delay-100">
                  {/* Decoración de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-orange-50 rounded-full blur-[60px] opacity-50 scale-90"></div>
                  
                  {/* TELÉFONO CON BORDES NEGROS (Margen realista) */}
                  <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[12px] border-slate-900 ring-1 ring-slate-900/5 z-10 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
                      {/* PANTALLA INTERNA */}
                      <div className="w-full h-full bg-slate-800 rounded-[2rem] overflow-hidden relative">
                          
                          {/* IMAGEN DEL MAPA */}
                          <img 
                            src={MAP_IMAGE} 
                            alt="App Interface" 
                            className="w-full h-full object-cover brightness-[0.9]"
                          />
                          
                          {/* ELEMENTOS FLOTANTES UI */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
                              <span className="text-[8px] font-bold text-white uppercase tracking-wider">San Salvador, SV</span>
                          </div>

                          {/* Pin Animado */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <div className="relative flex flex-col items-center">
                                  <div className="bg-white text-slate-900 text-[8px] font-black uppercase px-2 py-1 rounded shadow-lg mb-1 whitespace-nowrap">
                                      Ruta 44 • Lleno
                                  </div>
                                  <div className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
                              </div>
                          </div>
                          
                          {/* Panel Inferior */}
                          <div className="absolute bottom-4 left-3 right-3 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                              <div className="flex justify-between items-center">
                                  <div>
                                      <p className="text-[8px] uppercase font-bold text-slate-400">Próximo Bus</p>
                                      <p className="text-sm font-black text-slate-900">2 min</p>
                                  </div>
                                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs">
                                      🚍
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- ¿QUÉ ES UBIBUS? --- */}
      <section id="que-es" className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Definición del Proyecto</h2>
              <h3 className="text-3xl font-black text-slate-900 mb-6">¿Qué es UbiBusSV?</h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium text-justify md:text-center">
                  UbiBusSV es una plataforma web progresiva (PWA) diseñada para resolver la incertidumbre del transporte público en El Salvador. Utiliza tecnología de geolocalización colaborativa ("Crowdsourcing") para mostrar la posición de autobuses y microbuses en un mapa digital, permitiendo a los usuarios planificar sus viajes con datos reales.
              </p>
          </div>
      </section>

      {/* --- CÓMO FUNCIONA --- */}
      <section id="funciona" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3">Modelo Operativo</h2>
                  <h3 className="text-3xl font-black text-slate-900">Inteligencia Colectiva.</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-4">🔍</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">1. Búsqueda y Rastreo</h4>
                      <p className="text-sm text-slate-600 leading-relaxed text-justify">
                          El usuario accede a la plataforma y selecciona su ruta de interés. El sistema despliega un mapa vectorial mostrando las unidades activas.
                      </p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4"></div>
                      <div className="text-4xl mb-4 relative z-10">📡</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3 relative z-10">2. Reporte Activo</h4>
                      <p className="text-sm text-slate-600 leading-relaxed text-justify relative z-10">
                          Al abordar una unidad, el usuario activa el modo <strong>"Reportar Viaje"</strong>. Su dispositivo transmite coordenadas anónimas, ayudando a otros a ver el bus.
                      </p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-4">🛡️</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">3. Alertas en Ruta</h4>
                      <p className="text-sm text-slate-600 leading-relaxed text-justify">
                          La red permite reportar incidencias críticas: tráfico pesado, retenes o unidades llenas, distribuyendo la información instantáneamente.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- API DEVELOPERS --- */}
      <section id="developers" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">
                      Para Desarrolladores
                  </div>
                  <h3 className="text-3xl font-bold mb-6">API de Transporte Abierta</h3>
                  <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                      Estamos construyendo la infraestructura de datos más robusta del país. Integre nuestros endpoints de geolocalización en sus propios sistemas municipales.
                  </p>
                  <button className="text-sm font-bold border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors opacity-50 cursor-not-allowed">
                      Ver Documentación (Próximamente)
                  </button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 font-mono text-xs shadow-2xl">
                  <div className="flex gap-1.5 mb-4 opacity-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2">
                      <p><span className="text-purple-400">const</span> <span className="text-blue-400">response</span> = <span className="text-purple-400">await</span> fetch(<span className="text-green-400">'https://api.ubibus.sv/v1/routes/44'</span>);</p>
                      <p className="text-slate-500">// Respuesta del servidor</p>
                      <p className="text-yellow-300 mt-4 opacity-80">{`{ "status": "active", "units": 14, "eta": "5m" }`}</p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- CAJA DE SUGERENCIAS --- */}
      <section id="contacto" className="py-20 max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2rem] p-10 md:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase italic mb-2">Buzón de Sugerencias</h3>
                  <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                      ¿Tienes una idea para mejorar la app? Envíala aquí. Leemos todos los mensajes.
                  </p>

                  {!sugSent ? (
                      <form onSubmit={handleSuggest} className="max-w-md mx-auto space-y-3">
                          <textarea 
                              rows={3}
                              placeholder="Escribe tu sugerencia..." 
                              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all resize-none text-sm font-medium"
                              value={sugMsg}
                              onChange={(e) => setSugMsg(e.target.value)}
                              required
                          />
                          <button disabled={loadingSug} className="w-full bg-blue-600 text-white font-bold uppercase text-xs tracking-widest py-3.5 rounded-xl hover:bg-blue-500 transition-colors shadow-lg disabled:opacity-70">
                              {loadingSug ? 'Enviando...' : 'Enviar Sugerencia'}
                          </button>
                      </form>
                  ) : (
                      <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-green-400 font-bold">
                          ¡Gracias por tu aporte!
                      </div>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-white/10">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">Contacto Directo</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-white font-bold hover:text-blue-400 transition-colors text-sm">
                          {CONTACT_EMAIL}
                      </a>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FOOTER FINAL --- */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
              <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-black italic tracking-tighter text-white">
                          UbiBus<span className="text-slate-500">SV</span>
                      </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed max-w-xs text-xs">
                      Infraestructura digital para la modernización del transporte público en El Salvador. Tecnología 100% local.
                  </p>
              </div>
              
              <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Plataforma</h4>
                  <ul className="space-y-2 text-slate-500 text-xs font-bold uppercase tracking-wide">
                      <li><a href=# target="_blank" className="hover:text-white transition-colors">Iniciar Web App</a></li>
                      <li><span className="cursor-not-allowed opacity-50">API Developers</span></li>
                  </ul>
              </div>

              <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Legal</h4>
                  <ul className="space-y-2 text-slate-500 text-xs font-bold uppercase tracking-wide">
                      <li><button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">Términos de Uso</button></li>
                      <li><button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">Privacidad</button></li>
                      <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">Contacto</a></li>
                  </ul>
              </div>
          </div>

          <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <p>© {new Date().getFullYear()} UbiBusSV. Todos los derechos reservados.</p>
              <p>Desarrollado por Oscar Aguirre</p>
          </div>
      </footer>

    </div>
  );
}

export default App;
