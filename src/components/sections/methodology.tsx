import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    title: "Otkrivanje",
    description: "Dubinske radionice za mapiranje proizvodnih procesa, tehnološkog steka i strateških operativnih ciljeva. Identificiramo ključne tačke gdje AI može stvoriti najveću vrijednost.",
  },
  {
    step: 2,
    title: "Dizajn",
    description: "Arhitektiranje sveobuhvatnog blueprint-a rješenja sa tehničkom arhitekturom i jasnim roadmap-om. Definišemo KPI-je i metodologiju mjerenja uspjeha.",
  },
  {
    step: 3,
    title: "Razvoj",
    description: "Elitni inženjerski tim gradi, testira i usavršava vaš prilagođeni automatizacijski i integracijski motor. Koristimo agile metodologiju sa kratkim iteracijama.",
  },
  {
    step: 4,
    title: "Implementacija",
    description: "Potpuna implementacija u live proizvodno okruženje sa kontinuiranom podrškom i praćenjem performansi. Obuka timova i transfer znanja za održivost.",
  },
];

const Methodology = () => {
  return (
    <section id="methodology" className="py-20 md:py-32" aria-labelledby="methodology-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="methodology-heading" className="text-3xl md:text-5xl font-bold font-headline mb-4">
            <span className="gradient-text">Naš Dokazani 4-D Proces</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Strukturirani pristup koji garantuje uspjeh vaše AI transformacije.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step}>
              <Card className="glass-card relative pt-12 text-center md:text-left h-full">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-6 md:-translate-x-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background">
                  <span className="text-2xl font-bold font-headline" aria-hidden="true">{item.step}</span>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{item.description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Methodology;
