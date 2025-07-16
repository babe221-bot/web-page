"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const LogoAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!shouldRender || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="w-64 animate-fadeInOut flex flex-col items-center gap-4">
        <Image
          src="https://storage.googleapis.com/website3324/generated-image%20(6).png"
          width={128}
          height={128}
          alt="DaorsForge AI Loading Logo"
          className="filter hue-rotate-[200deg] brightness-125 saturate-150"
        />
        <h1 className="text-4xl font-bold font-headline gradient-text text-center">DaorsForge AI</h1>
      </div>
    </div>
  );
};

export default LogoAnimation;
