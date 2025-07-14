"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Insights from "./insights";

const ContactForm = dynamic(() => import("@/components/contact-form"), {
  ssr: false,
});

const ContactSection = () => {
  const [submittedIndustry, setSubmittedIndustry] = useState<string | null>(
    null
  );

  const handleFormSubmit = (industry: string) => {
    setSubmittedIndustry(industry);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">
            <span className="gradient-text">
              Spremni da Transformišete Vaše Operacije?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-12">
            Razgovarajmo o tome kako DaorsForge može eliminirati vaša operativna
            uska grla i iskovati osnovu za inteligentni rast.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ContactForm onSubmitSuccess={handleFormSubmit} />
          {submittedIndustry && <Insights industry={submittedIndustry} />}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
