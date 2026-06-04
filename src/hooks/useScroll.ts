import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el usuario ha hecho scroll más allá de un umbral específico.
 * @param threshold Número de píxeles para activar el cambio.
 * @returns boolean true si scrollY > threshold, de lo contrario false.
 */
export function useScroll(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Verificar el scroll inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
