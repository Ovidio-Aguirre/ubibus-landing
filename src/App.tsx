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
    const CONTACT_EMAIL = "ubibussv@gmail.com";
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

            {/* --- NAVBAR --- */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    {/* LOGO */}
                    <div className="flex items-center gap-2 select-none cursor-default group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-display font-bold tracking-tight text-slate-900 leading-none">
                            UbiBus<span className="text-brand-orange">SV</span>
                        </span>
                    </div>

                    {/* ENLACES */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#que-es" className="hover:text-primary-600 transition-colors">¿Qué es?</a>
                        <a href="#funciona" className="hover:text-primary-600 transition-colors">Cómo Funciona</a>
                        <a href="#contacto" className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10">Sugerencias</a>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
                {/* Background Blobs for Visual Interest */}
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
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        ¡Te hemos añadido a la lista!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: TELÉFONO REALISTA */}
                        <div className="flex-none relative animate-fade-in-up mt-8 lg:mt-0" style={{ animationDelay: '0.2s' }}>
                            {/* Decoración de fondo */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-400/20 to-brand-orange/20 rounded-full blur-[80px] -z-10"></div>

                            {/* TELÉFONO TIPO IPHONE */}
                            <div className="relative w-64 h-[520px] lg:w-64 lg:h-[540px] xl:w-72 xl:h-[580px] bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border-[6px] lg:border-[8px] border-slate-900 ring-1 ring-slate-800/10 z-10 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 ease-out mx-auto">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 lg:w-32 h-5 lg:h-6 bg-slate-900 rounded-b-xl lg:rounded-b-2xl z-20"></div>

                                {/* PANTALLA INTERNA */}
                                <div className="w-full h-full bg-slate-50 rounded-[2rem] lg:rounded-[2.25rem] overflow-hidden relative border border-slate-800">

                                    {/* IMAGEN DEL MAPA */}
                                    <img
                                        src={MAP_IMAGE}
                                        alt="App Interface"
                                        className="w-full h-full object-cover brightness-[0.95]"
                                    />

                                    {/* ELEMENTOS FLOTANTES UI MEJORADOS */}
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full border border-white/40 shadow-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                                        <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">San Salvador, SV</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
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
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
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
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
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

            {/* --- API DEVELOPERS --- */}
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

                    <div className="glass-dark p-1 rounded-2xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-slate-900/80 rounded-xl p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                            {/* Mac Window Dots */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-white/10"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-white/10"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-white/10"></div>
                            </div>
                            <div className="space-y-2">
                                <p><span className="text-pink-400">const</span> <span className="text-blue-400">response</span> = <span className="text-pink-400">await</span> fetch(<span className="text-emerald-400">'https://api.ubibus.sv/v1/routes/44'</span>);</p>
                                <p className="text-slate-500 italic mt-2">// Respuesta del servidor en tiempo real</p>
                                <p className="text-amber-300/90 mt-4">
                                    {`{
  "status": "active",
  "units_tracking": 14,
  "next_eta": "5 mins",
  "congestion_level": "moderate"
}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CAJA DE SUGERENCIAS --- */}
            <section id="contacto" className="py-24 bg-slate-50 relative">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        {/* Glowing background effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-display font-bold text-slate-900 tracking-tight mb-4">Construyamos juntos.</h3>
                            <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto">
                                ¿Tienes una idea para mejorar la app o necesitas reportar un problema? Te escuchamos.
                            </p>

                            {!sugSent ? (
                                <form onSubmit={handleSuggest} className="max-w-md mx-auto space-y-4">
                                    <textarea
                                        rows={4}
                                        placeholder="Escribe tu sugerencia aquí..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all resize-none shadow-inner"
                                        value={sugMsg}
                                        onChange={(e) => setSugMsg(e.target.value)}
                                        required
                                    />
                                    <button disabled={loadingSug} className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:shadow-primary-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:transform-none">
                                        {loadingSug ? 'Enviando...' : 'Enviar Sugerencia'}
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-700 font-medium flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    ¡Gracias por tu aporte! Lo leeremos pronto.
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-2">Contacto Directo</p>
                                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER FINAL --- */}
            <footer className="bg-white text-slate-600 py-16 px-6 border-t border-slate-200">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight text-slate-900 leading-none">
                                UbiBus<span className="text-brand-orange">SV</span>
                            </span>
                        </div>
                        <p className="text-slate-500 leading-relaxed max-w-sm">
                            Infraestructura digital para la modernización del transporte público en El Salvador. Tecnología colaborativa para ciudades inteligentes.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-6">Plataforma</h4>
                        <ul className="space-y-4 font-medium">
                            <li><a href={APP_URL} target="_blank" className="hover:text-primary-600 transition-colors">Iniciar Web App</a></li>
                            <li><span className="cursor-not-allowed opacity-50 flex items-center gap-2">API Developers <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Pronto</span></span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
                        <ul className="space-y-4 font-medium">
                            <li><button onClick={() => setShowTerms(true)} className="hover:text-primary-600 transition-colors">Términos de Uso</button></li>
                            <li><button onClick={() => setShowPrivacy(true)} className="hover:text-primary-600 transition-colors">Privacidad</button></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary-600 transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto pt-8 mt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
                    <p>© {new Date().getFullYear()} UbiBusSV. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-2">
                        <span>Desarrollado con</span>
                        <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>por Oscar Aguirre</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default App;
