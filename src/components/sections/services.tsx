import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Link as LinkIcon, Cloud } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: BrainCircuit,
    title: "AI Strategija i Implementacija",
    description: "Projektujemo i implementiramo napredne AI modele koji automatiziraju složene proizvodne procese, smanjujući troškove do 35% i povećavajući efikasnost. Naši sistemi uče i prilagođavaju se promjenama u realnom vremenu.",
    ariaLabel: "AI Strategy and Implementation Service"
  },
  {
    icon: LinkIcon,
    title: "Prilagođena Integracija Sistema",
    description: "Povezujemo vaše postojeće sisteme (MES, SCADA, ERP) u jedinstven, inteligentni ekosistem koji omogućava donošenje odluka u realnom vremenu. Eliminišemo silose podataka i stvaramo jedinstven izvor istine.",
    ariaLabel: "Custom System Integration Service"
  },
  {
    icon: Cloud,
    title: "Cloud Infrastruktura",
    description: "Dizajniramo skalabilnu cloud arhitekturu optimizovanu za industrijske AI/ML aplikacije sa 99.9% uptime garancijom. Sigurna, visoko dostupna infrastruktura koja raste uz vaše poslovne potrebe.",
    ariaLabel: "Cloud Infrastructure Service"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="services-heading" className="text-3xl md:text-5xl font-bold font-headline mb-4">
            <span className="gradient-text">Šta Kujemo Za Lidere Proizvodnje</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-16">
            Naša AI rješenja su dizajnirana da riješe najkompleksnije industrijske izazove kroz naprednu automatizaciju i analitiku.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <article key={service.title} aria-labelledby={service.ariaLabel}>
                <Card className="glass-card text-center flex flex-col items-center h-full">
                    <CardHeader className="items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                            <service.icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle id={service.ariaLabel} className="font-headline text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription className="text-foreground/80">{service.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="bg-white/10 border-white/20 hover:bg-white/20 mt-4" asChild>
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

export default Services;
