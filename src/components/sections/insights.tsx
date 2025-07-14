"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { industriesData } from "@/lib/data";

interface InsightsProps {
  industry: string;
}

const Insights = ({ industry }: InsightsProps) => {
  const selectedIndustry = industriesData.find(
    (item) => item.dataAiHint === industry
  );

  if (!selectedIndustry) {
    return null;
  }

  return (
    <Card className="glass-card mt-8">
      <CardHeader>
        <CardTitle className="gradient-text">
          Predictive Insights for {selectedIndustry.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{selectedIndustry.description}</p>
        <ul className="space-y-2">
          {selectedIndustry.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-primary mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Insights;
