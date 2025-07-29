import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { industriesData } from "@/lib/data";
import { CheckCircle, Zap, DollarSign, BrainCircuit } from "lucide-react";
import React from 'react';

interface InsightsProps {
  industry: string;
}

const featureIcons = [
  <Zap key="zap" className="w-8 h-8 text-primary" />,
  <DollarSign key="dollar" className="w-8 h-8 text-primary" />,
  <BrainCircuit  key="brain"className="w-8 h-8 text-primary" />,
  <CheckCircle key="check" className="w-8 h-8 text-primary" />,
];

const Insights = ({ industry }: InsightsProps) => {
  const selectedIndustry = industriesData.find(
    (item) => item.dataAiHint === industry
  );

  if (!selectedIndustry) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">
        Uvidi za <span className="gradient-text">{selectedIndustry.title}</span>
      </h3>
      <p className="text-center text-lg text-foreground/80 mb-12 max-w-3xl mx-auto">
        {selectedIndustry.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {selectedIndustry.features.map((feature, index) => (
          <Card key={index} className="glass-card flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
               {featureIcons[index % featureIcons.length]}
               <CardTitle>{feature}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground/70">
                AI može pomoći u optimizaciji budžeta za produkciju, predviđanju povrata investicije i upravljanju autorskim pravima, smanjujući troškove i povećavajući profitabilnost.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Insights;