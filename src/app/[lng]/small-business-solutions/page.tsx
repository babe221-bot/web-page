'use client';

import { useTranslation } from '@/app/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Laptop, Bot, Film, CheckCircle2 } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function SmallBusinessSolutionsPage({ params }: { params: { lng: string } }) {
  const { lng } = params;
  const { t } = useTranslation(lng, 'common');

  const services = t('smallBusinessSolutions.services', { returnObjects: true }) as { title: string; description: string; features: string[]; }[];

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Laptop className="h-8 w-8 text-primary" />;
      case 1:
        return <Film className="h-8 w-8 text-primary" />;
      case 2:
        return <Bot className="h-8 w-8 text-primary" />;
      case 3:
        return <Lightbulb className="h-8 w-8 text-primary" />;
      default:
        return <Laptop className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <>
      <Header lng={lng} />
      <main className="flex min-h-screen flex-col">
        <section id="small-business-solutions" className="relative w-full py-32 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                <span className="gradient-text">{t('smallBusinessSolutions.title')}</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80">
                {t('smallBusinessSolutions.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="glass-card flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      {getIcon(index)}
                    </div>
                    <CardTitle className="font-headline text-2xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-base text-foreground/80 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mt-auto">
                      {service.features.map((feature, featIndex) => (
                         <li key={featIndex} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>
                            <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lng={lng} />
    </>
  );
}
