"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start fading out after 4 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    // Hide the component and mark animation as done after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setAnimationDone(true);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    // Redirect once the animation is marked as done
    if (animationDone) {
      router.push("/sr");
    }
  }, [animationDone, router]);

  if (!isVisible) {
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
          src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589"
          alt="DaorsForge AI Systems Logo"
          width={200}
          height={200}
          style={{ height: "auto" }}
          unoptimized
        />
        <h1 className="text-4xl font-bold font-headline gradient-text text-center">DaorsForge AI</h1>
      </div>
    </div>
  );
};

export default LogoAnimation;
