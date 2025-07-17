'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback, ReactNode } from 'react';

interface RadioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};

interface RadioProviderProps {
  children: ReactNode;
}

export const RadioProvider: React.FC<RadioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      // Inicijalno stanje
      if (!audio.paused) {
        setIsPlaying(true);
      }
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.volume = 0.35;
        audio.play().catch(error => console.log("Playback was prevented:", error));
      } else {
        audio.pause();
      }
    }
  }, []);
  
  // Prvo puštanje radija
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.35;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Automatska reprodukcija je spriječena:", error);
        });
      }
    }
  }, []);

  const value = {
    isPlaying,
    togglePlay,
    audioRef,
  };

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
};
