"use client";

import { useState, useEffect } from 'react';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const [orbs, setOrbs] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    setParticles(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.3 + 0.1,
    })));

    setOrbs(Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: `${50 + Math.random() * 100}px`,
      animationDuration: `${20 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      bg: i === 0 ? 'bg-primary/30' : i === 1 ? 'bg-accent/30' : 'bg-accent-secondary/30',
    })));
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-indigo-900/20"></div>

      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: p.left,
            top: p.top,
            width: '2px',
            height: '2px',
            animation: `particleFloat ${p.animationDuration} ${p.animationDelay} linear infinite`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Floating Orbs */}
      {orbs.map(orb => (
        <div
          key={orb.id}
          className={`absolute rounded-full filter blur-3xl ${orb.bg}`}
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            animation: `orbFloat ${orb.animationDuration} ${orb.animationDelay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
