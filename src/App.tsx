import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Partners } from './components/sections/Partners';
import { FeedbackForm } from './components/sections/FeedbackForm';
import { Footer } from './components/layout/Footer';
import { Modal } from './components/ui/Modal';
import { CONTACT_EMAIL } from './config';

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
        <Modal title="Términos y Condiciones" onClose={() => setShowTerms(false)}>
          <p><strong>1. Aceptación de los términos:</strong> Al registrarse en la lista de acceso anticipado o utilizar este sitio web, usted acepta los presentes Términos y Condiciones. Si no está de acuerdo, debe abstenerse de utilizar el sitio.</p>
          <p><strong>2. Naturaleza del servicio:</strong> UbiBusSV es una plataforma tecnológica en fase de desarrollo, próxima a su lanzamiento, orientada a facilitar información colaborativa sobre el transporte público en El Salvador. Este sitio web tiene como único fin informar sobre la plataforma y recopilar manifestaciones de interés ("acceso anticipado"); no constituye la app en funcionamiento ni implica disponibilidad inmediata del servicio.</p>
          <p><strong>3. Intermediación de información:</strong> Una vez lanzada, UbiBusSV actuará como intermediario de información de movilidad generada por la comunidad de usuarios. UbiBusSV no opera unidades de transporte público, no es una empresa de transporte y no garantiza la exactitud, puntualidad ni disponibilidad continua de los datos reportados por terceros.</p>
          <p><strong>4. Conducta y veracidad de los usuarios:</strong> La utilidad del sistema depende de la veracidad de la información aportada por la comunidad. UbiBusSV se reserva el derecho de suspender, restringir o eliminar el acceso de cualquier usuario que introduzca datos falsos, manipule el sistema o haga un uso indebido de la plataforma.</p>
          <p><strong>5. Propiedad intelectual:</strong> El sitio web, el código fuente, el diseño, la marca "UbiBusSV" y todo el contenido asociado son propiedad exclusiva de <strong>Oscar Aguirre</strong>, autor y titular de los derechos patrimoniales y morales sobre la obra, protegidos por la Ley de Fomento y Protección de la Propiedad Intelectual de El Salvador y tratados internacionales aplicables. Queda prohibida su reproducción, distribución, modificación, ingeniería inversa o explotación total o parcial, con o sin fines de lucro, sin autorización previa y por escrito del titular.</p>
          <p><strong>6. Limitación de responsabilidad:</strong> El sitio y la futura plataforma se ofrecen "tal cual" ("as is"). En la medida permitida por la ley, Oscar Aguirre y UbiBusSV no serán responsables por daños directos o indirectos derivados del uso o la imposibilidad de uso del sitio o del servicio.</p>
          <p><strong>7. Modificaciones:</strong> Estos términos podrán actualizarse en cualquier momento para reflejar cambios en el servicio o en la normativa aplicable. La versión vigente será siempre la publicada en este sitio.</p>
          <p><strong>8. Contacto y ley aplicable:</strong> Estos términos se rigen por las leyes de la República de El Salvador. Para consultas, escriba a <strong>{CONTACT_EMAIL}</strong>.</p>
        </Modal>
      )}

      {showPrivacy && (
        <Modal title="Política de Privacidad" onClose={() => setShowPrivacy(false)}>
          <p><strong>1. Responsable del tratamiento:</strong> Oscar Aguirre, como desarrollador y titular de UbiBusSV, es responsable del tratamiento de los datos personales recabados a través de este sitio.</p>
          <p><strong>2. Datos recopilados en esta etapa:</strong> Mientras el sitio se encuentra en fase de acceso anticipado, únicamente se recopila el correo electrónico y, en su caso, los comentarios o sugerencias que usted proporcione voluntariamente al registrarse.</p>
          <p><strong>3. Finalidad:</strong> Estos datos se utilizan exclusivamente para notificarle sobre el lanzamiento de la plataforma, dar seguimiento a sus sugerencias y enviar comunicaciones oficiales relacionadas con el servicio. No se utilizan con fines publicitarios de terceros ni se venden a otras empresas.</p>
          <p><strong>4. Datos de ubicación (uso futuro en la app):</strong> Una vez lanzada, la geolocalización dentro de la aplicación será efímera: solo se transmitirá mientras el usuario mantenga activa una sesión de "Viaje" y no se almacenarán historiales de movimiento personal una vez finalizada esta.</p>
          <p><strong>5. Seguridad:</strong> La información se almacena en bases de datos con controles de acceso y cifrado. Se toman medidas razonables para proteger sus datos, aunque ningún sistema es completamente infalible.</p>
          <p><strong>6. Derechos del usuario:</strong> Usted puede solicitar en cualquier momento la actualización o eliminación de su correo electrónico de nuestra lista de acceso anticipado escribiendo a <strong>{CONTACT_EMAIL}</strong>.</p>
        </Modal>
      )}

      {/* CABECERA (NAVBAR) */}
      <Navbar onOpenSugerencias={scrollToContacto} />

      {/* SECCIÓN HERO (PORTADA) */}
      <Hero />

      {/* SECCIÓN DETALLES & CARACTERÍSTICAS */}
      <Features />

      {/* SECCIÓN PARA MOTORISTAS Y EMPRESAS */}
      <Partners />

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
