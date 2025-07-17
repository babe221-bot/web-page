'use client';

import { useTranslation } from '@/app/i18n/client';
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  ChevronRight,
  MapPin,
  Mail,
  Heart,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface FooterProps {
  lng: string;
}

const Footer = ({ lng }: FooterProps) => {
  const { t } = useTranslation(lng, 'common');

  const services = t('smallBusinessSolutions.services', { returnObjects: true }) as { id: string; title: string }[];
  
  // Filtering out the 'title' key from industries object
  const industries = t('industries', { returnObjects: true }) as Record<string, { title: string }>;
  const industryEntries = Object.entries(industries).filter(([key]) => key !== 'title');


  return (
    <footer className="bg-background/70 backdrop-blur-sm border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h4 className="text-lg font-bold font-headline">DaorsForge AI Systems</h4>
                <p className="text-sm text-foreground/60">Managed by daors.com</p>
              </div>
            </div>
            <p className="text-foreground/80 mb-6 text-sm">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
                <Link href="https://www.daorsforgealsystems.com">www.daorsforgealsystems.com</Link>
            </div>
            <div className="flex gap-2 mt-auto">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/company/daors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><Linkedin className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://x.com/daors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter"><Twitter className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.facebook.com/daors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><Facebook className="w-5 h-5" /></Link>
              </Button>
               <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.youtube.com/@Daors" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel"><Youtube className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 id="footer-services" className="text-xl font-bold font-headline mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-primary to-accent">{t('smallBusinessSolutions.title')}</h4>
            <nav aria-labelledby="footer-services">
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link href={`/${lng}/small-business-solutions`} className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors hover:translate-x-1">
                      <ChevronRight className="w-4 h-4" />
                      <span>{service.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 id="footer-industries" className="text-xl font-bold font-headline mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-primary to-accent">{t('industries.title')}</h4>
            <nav aria-labelledby="footer-industries">
              <ul className="space-y-3">
                {industryEntries.map(([key, industry]) => (
                  <li key={key}>
                    <Link href={`/${lng}#industries`} className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors hover:translate-x-1">
                      <ChevronRight className="w-4 h-4" />
                      <span>{industry.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xl font-bold font-headline mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-primary to-accent">{t('footer.contact.title')}</h4>
            <div className="space-y-4 text-foreground/80">
              <p className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Stolac, BiH 88360</span></p>
              <p className="flex items-start gap-3"><Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                <a href="mailto:bakir@daorsforgealsystems.com" className="hover:text-primary transition-colors">
                  bakir@daorsforgealsystems.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} DaorsForge AI Systems. {t('footer.allRightsReserved')} | Dizajnirano sa <Heart className="inline-block h-4 w-4 text-primary fill-primary" /></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
