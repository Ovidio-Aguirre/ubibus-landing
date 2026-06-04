import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Developers } from './components/sections/Developers';
import { FeedbackForm } from './components/sections/FeedbackForm';
import { Footer } from './components/layout/Footer';
import { Modal } from './components/ui/Modal';

function AppContent() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const scrollToContacto = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-slate-900 font-sans selection:bg-primary-600 selection:text-white overflow-x-hidden">
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

      {/* CABECERA (NAVBAR) */}
      <Navbar onOpenSugerencias={scrollToContacto} />

      {/* SECCIÓN HERO (PORTADA) */}
      <Hero />

      {/* SECCIÓN DETALLES & CARACTERÍSTICAS */}
      <Features />

      {/* SECCIÓN PARA DESARROLLADORES (API) */}
      <Developers />

      {/* FORMULARIO DE SUGERENCIAS / FEEDBACK */}
      <FeedbackForm />

      {/* PIE DE PÁGINA (FOOTER) */}
      <Footer 
        onShowTerms={() => setShowTerms(true)} 
        onShowPrivacy={() => setShowPrivacy(true)} 
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
