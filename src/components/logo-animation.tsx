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
      <div className="w-64 animate-fadeInOut">
        <Image
          src="https://storage.googleapis.com/website-5a18c.firebasestorage.app/generated-image%20(6).png"
          alt="DaorsForge AI Logo"
          width={256}
          height={128}
          className="filter invert sepia-0 saturate-200 hue-rotate-180 brightness-100 contrast-100"
        />
      </div>
    </div>
  );
};

export default LogoAnimation;
