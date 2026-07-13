import React from 'react';
import { CONTACT_EMAIL } from '../../config';

interface FooterProps {
  onShowTerms: () => void;
  onShowPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowTerms, onShowPrivacy }) => {
  return (
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
            <li><span className="cursor-not-allowed opacity-50 flex items-center gap-2">Iniciar Web App <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Pronto</span></span></li>
            <li><a href="#empresas" className="hover:text-primary-600 transition-colors">Para Empresas y Motoristas</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4 font-medium">
            <li><button onClick={onShowTerms} className="hover:text-primary-600 transition-colors text-left">Términos de Uso</button></li>
            <li><button onClick={onShowPrivacy} className="hover:text-primary-600 transition-colors text-left">Privacidad</button></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary-600 transition-colors">Contacto</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 mt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <p>© {new Date().getFullYear()} Oscar Aguirre. UbiBusSV y todo su contenido. Todos los derechos reservados.</p>
        <div className="flex items-center gap-2">
          <span>Desarrollado por Oscar Aguirre</span>
        </div>
      </div>
    </footer>
  );
};
