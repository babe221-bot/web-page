'use client';

import { useRadio } from '@/context/RadioContext';

const JazzRadioPlayer = () => {
  // Logika je premeštena u RadioProvider
  // Ova komponenta sada služi samo da osigura da se audio element renderuje
  const { audioRef } = useRadio();
  return <audio ref={audioRef} src="http://stream.srg-ssr.ch/m/rsj/mp3_128" loop />;
};

export default JazzRadioPlayer;
