import React, { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';

interface NavbarProps {
  onOpenSugerencias: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSugerencias }) => {
  const scrolled = useScroll(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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

        {/* ENLACES DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#que-es" className="relative py-1 hover:text-primary-600 transition-colors group">
            ¿Qué es?
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#funciona" className="relative py-1 hover:text-primary-600 transition-colors group">
            Cómo Funciona
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#empresas" className="relative py-1 hover:text-primary-600 transition-colors group">
            Empresas
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <button 
            onClick={onOpenSugerencias} 
            className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/10 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            Sugerencias
          </button>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Abrir menú de navegación"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a 
            href="#que-es" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-600 hover:text-primary-600 py-2 border-b border-slate-50 transition-colors"
          >
            ¿Qué es?
          </a>
          <a 
            href="#funciona" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-600 hover:text-primary-600 py-2 border-b border-slate-50 transition-colors"
          >
            Cómo Funciona
          </a>
          <a
            href="#empresas"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-600 hover:text-primary-600 py-2 border-b border-slate-50 transition-colors"
          >
            Empresas
          </a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSugerencias();
            }} 
            className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-center hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10 mt-2"
          >
            Sugerencias
          </button>
        </div>
      )}
    </nav>
  );
};
