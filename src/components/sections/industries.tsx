'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import { industriesData } from "@/lib/data";

const Industries = () => {
  const handleCtaClick = (industryTitle: string) => {
    trackCTAClick(`Industries Section - ${industryTitle}`);
  };

  return (
    <section id="industries" className="py-20 md:py-32 bg-background/50" aria-labelledby="industries-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="industries-heading" className="text-3xl md:text-5xl font-bold font-headline mb-4">
            <span className="gradient-text">
              Specijalizirana AI Rješenja po Industriji
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-16">
            Naša AI rješenja su prilagođena specifičnim potrebama različitih industrija.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((industry, index) => (
            <article key={index} aria-labelledby={`industry-title-${index}`}>
              <Card className="glass-card flex flex-col h-full">
                <CardHeader>
                  <CardTitle id={`industry-title-${index}`} className="font-headline text-2xl">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-6 text-foreground/80">{industry.description}</CardDescription>
                  <ul className="space-y-3">
                      {industry.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>
                              <span className="text-foreground/90">{feature}</span>
                          </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button 
                      variant="secondary" 
                      className="w-full bg-white/10 border-white/20 hover:bg-white/20 mt-4" 
                      asChild
                      onClick={() => handleCtaClick(industry.title)}
                    >
                      <Link href="#contact">Saznajte Više</Link>
                   </Button>
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
