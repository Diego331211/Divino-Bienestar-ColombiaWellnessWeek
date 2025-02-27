'use client';
import { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
}

export default function Typewriter({
  phrases,
  typingSpeed = 150,
  deletingSpeed = 80,
  pauseBetween = 2000
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'pause'>('typing');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Frase actual (puede ser undefined si hay un problema con el array)
    const currentPhrase = phrases[currentPhraseIndex] || '';

    if (phase === 'typing') {
      timer = setTimeout(() => {
        // Previene que accedas a un índice que no existe
        const nextChar = currentPhrase[charIndex] || '';

        setText((prev) => prev + nextChar);
        setCharIndex((prev) => prev + 1);

        // Si llegamos al final de la frase, pasamos a la fase de pausa
        if (charIndex + 1 === currentPhrase.length) {
          setPhase('pause');
        }
      }, typingSpeed);
    } else if (phase === 'deleting') {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);

        // Si llegamos a 0, pasamos a la siguiente frase y cambiamos a "typing"
        if (charIndex - 1 < 0) {
          setPhase('typing');
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, deletingSpeed);
    } else if (phase === 'pause') {
      timer = setTimeout(() => {
        setPhase('deleting');
      }, pauseBetween);
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    phase,
    phrases,
    currentPhraseIndex,
    typingSpeed,
    deletingSpeed,
    pauseBetween
  ]);

  return <span>{text}</span>;
}
