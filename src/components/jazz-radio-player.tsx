"use client";

import { useEffect, useRef } from 'react';

const JazzRadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // URL javnog jazz radio streama
  const streamUrl = 'http://stream.srg-ssr.ch/m/rsj/mp3_128';

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Postavljamo jačinu zvuka na 50%
      audio.volume = 0.5;
      
      // Pokušavamo da pokrenemo reprodukciju
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay je spriječen od strane browsera.
          // Ovo je očekivano ponašanje u mnogim slučajevima.
          console.log("Automatska reprodukcija je spriječena:", error);
        });
      }
    }
  }, []); // Prazan niz osigurava da se ovaj efekat izvrši samo jednom

  return <audio ref={audioRef} src={streamUrl} loop />;
};

export default JazzRadioPlayer;
