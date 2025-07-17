"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Home, Settings, Factory, Waypoints, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "Početna", icon: Home },
  { href: "#services", label: "Usluge", icon: Settings },
  { href: "#industries", label: "Industrije", icon: Factory },
  { href: "#methodology", label: "Metodologija", icon: Waypoints },
  { href: "#contact", label: "Kontakt", icon: Mail },
];

const Header = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="#home" className="flex items-center gap-3">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589"
              alt="DaorsForge AI Systems Logo"
              width={40}
              height={40}
              style={{ height: "auto" }}
              unoptimized
            />
            <h1 className="text-xl font-bold font-headline gradient-text">DaorsForge AI</h1>
          </Link>

          <nav role="navigation" aria-label="Glavna navigacija" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(`nav.${link.label.toLowerCase()}`)}
              </Link>
            ))}
          </nav>
          
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-controls="mobile-menu">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("nav.openMenu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent id="mobile-menu" side="left" className="bg-background/90 backdrop-blur-xl border-r-white/10 p-0">
                 <div className="flex flex-col h-full">
                    <div className="p-4 flex justify-between items-center border-b border-white/10">
                        <Link href="#home" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                            <Image
                              src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589"
                              alt="DaorsForge AI Systems Logo"
                              width={32}
                              height={32}
                              style={{ height: "auto" }}
                              unoptimized
                            />
                           <h1 className="text-lg font-bold font-headline gradient-text">DaorsForge AI</h1>
                        </Link>
                        <SheetTitle className="sr-only">{t("nav.mainMenu")}</SheetTitle>
                        <SheetDescription className="sr-only">{t("nav.menuDescription")}</SheetDescription>
                        <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">{t("nav.closeMenu")}</span>
                        </Button>
                    </div>
                    <nav aria-labelledby="mobile-menu-title" className="flex-1 flex flex-col items-start gap-6 p-6">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsSheetOpen(false)}
                            className="flex items-center gap-4 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                        >
                            <link.icon className="h-5 w-5" />
                            {t(`nav.${link.label.toLowerCase()}`)}
                        </Link>
                        ))}
                    </nav>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
