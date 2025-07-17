'use client';
import { useTranslation } from '@/app/i18n/client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Music, Music2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';
import Image from 'next/image';
import { useRadio } from '@/context/RadioContext';
import { cn } from '@/lib/utils';

const Hero = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'common');
  const { isPlaying, togglePlay } = useRadio();

  const handleCTAClick = (ctaName: string) => {
    trackCTAClick(ctaName);
  };

  const handleRadioToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    togglePlay();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/Logo_to_Robot_Video_Ready.mp4?alt=media&token=f9e7e336-f23e-4cbc-8068-d2929f70bc41"
          type="video/mp4"
        />
        Vaš pretraživač ne podržava video tag.
      </video>

      <div className="absolute inset-0 bg-background/70 z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 leading-tight"
            >
              <span className="gradient-text block">{t('hero.title')}</span>
              <span className="text-foreground block mt-2">
                DaorsForge AI Systems
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-foreground/80 mb-10">
              {t('hero.subtitle')}
            </p>
            <div className="flex justify-center md:justify-start flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                onClick={() => handleCTAClick(t('hero.button'))}
              >
                <Link href="#contact" aria-label={t('hero.button') || ''}>
                  {t('hero.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 border-white/20 hover:bg-white/20"
                asChild
                onClick={() => handleCTAClick(t('hero.servicesButton'))}
              >
                <Link
                  href="#services"
                  aria-label={t('hero.servicesButton') || ''}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  {t('hero.servicesButton')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
             <div className="glass-card flex flex-col items-center p-4 gap-4">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/Whisk_gif_tezymyzztc.gif?alt=media&token=89e35203-1292-472b-89bb-607bee2a6fbb"
                    alt="AI and automation technology"
                    width={300}
                    height={300}
                    className="rounded-lg mix-blend-screen"
                    unoptimized
                />
                <div className="flex gap-4">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleRadioToggle}
                        className={cn(
                            'rounded-full h-12 w-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white hover:text-primary transition-all duration-300',
                            isPlaying && 'text-primary'
                        )}
                        aria-label={isPlaying ? 'Pauziraj radio' : 'Pusti radio'}
                    >
                        {isPlaying ? (
                            <Music className="h-6 w-6" />
                        ) : (
                            <Music2 className="h-6 w-6" />
                        )}
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className='rounded-full h-12 w-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white hover:text-primary transition-all duration-300'
                        aria-label="Otvori chatbot"
                    >
                        <MessageSquare className="h-6 w-6" />
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
