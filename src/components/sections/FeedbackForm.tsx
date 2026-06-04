import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '../../context/ToastContext';

export const FeedbackForm: React.FC = () => {
  const { showToast } = useToast();
  const [sugMsg, setSugMsg] = useState('');
  const [sugSent, setSugSent] = useState(false);
  const [loadingSug, setLoadingSug] = useState(false);

  const CONTACT_EMAIL = "om4648654@gmail.com";

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sugMsg.trim()) {
      showToast("Por favor, escribe una sugerencia válida.", "error");
      return;
    }
    setLoadingSug(true);
    try {
      await addDoc(collection(db, 'suggestions'), {
        message: sugMsg.trim(),
        date: serverTimestamp(),
        source: 'landing_feedback'
      });
      setSugSent(true);
      setSugMsg('');
      showToast("¡Sugerencia enviada! Muchas gracias por tu valioso aporte.", "success");
    } catch (err) {
      console.error(err);
      showToast("Hubo un error al enviar la sugerencia. Reinténtalo.", "error");
    }
    setLoadingSug(false);
  };

  return (
    <section id="contacto" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
          {/* Efecto de fondo brillante en hover */}
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
                <button 
                  disabled={loadingSug} 
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:shadow-primary-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:transform-none"
                >
                  {loadingSug ? 'Enviando...' : 'Enviar Sugerencia'}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-700 font-medium flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                ¡Gracias por tu aporte! Lo leeremos pronto.
                <button 
                  onClick={() => setSugSent(false)} 
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 underline mt-2"
                >
                  Enviar otra sugerencia
                </button>
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
  );
};
