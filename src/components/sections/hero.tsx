"use client";
import { useTranslation } from "@/app/i18n-client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";

const Hero = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "common");

  const handleCTAClick = (ctaName: string) => {
    trackCTAClick(ctaName);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-background/80 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 leading-tight">
              <span className="gradient-text block">
                {t("hero.title")}
              </span>
              <span className="text-foreground block mt-2">
                DaorsForge AI Systems
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-foreground/80 mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex justify-center md:justify-start flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                onClick={() => handleCTAClick(t("hero.button"))}
              >
                <Link href="#contact" aria-label={t("hero.button") || ""}>
                  {t("hero.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 border-white/20 hover:bg-white/20"
                asChild
                onClick={() => handleCTAClick("Pogledajte Usluge")}
              >
                <Link href="#services" aria-label="Pogledajte naše usluge">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Pogledajte Usluge
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
