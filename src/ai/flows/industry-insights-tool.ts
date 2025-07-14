'use server';

/**
 * @fileOverview A Genkit flow for providing industry-specific insights based on user selection.
 *
 * - getIndustryInsights - A function that takes an industry as input and returns relevant AI insights.
 * - IndustryInsightsInput - The input type for the getIndustryInsights function.
 * - IndustryInsightsOutput - The return type for the getIndustryInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { logServerEvent } from '@/lib/analytics';

const IndustryInsightsInputSchema = z.object({
  industry: z
    .string()
    .describe('The industry selected by the user in the contact form.'),
});
export type IndustryInsightsInput = z.infer<typeof IndustryInsightsInputSchema>;

const IndustryInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe('AI insights specific to the selected industry.'),
});
export type IndustryInsightsOutput = z.infer<typeof IndustryInsightsOutputSchema>;

export async function getIndustryInsights(input: IndustryInsightsInput): Promise<IndustryInsightsOutput> {
  return industryInsightsFlow(input);
}

const industryInsightsPrompt = ai.definePrompt({
  name: 'industryInsightsPrompt',
  input: { schema: IndustryInsightsInputSchema },
  output: { schema: IndustryInsightsOutputSchema },
  prompt: `You are an AI assistant specialized in providing industry-specific insights.

  Based on the industry provided by the user, generate a series of insights relevant to that industry.

  Industry: {{{industry}}}
  `,
});

const industryInsightsFlow = ai.defineFlow(
  {
    name: 'industryInsightsFlow',
    inputSchema: IndustryInsightsInputSchema,
    outputSchema: IndustryInsightsOutputSchema,
  },
  async input => {
    logServerEvent('fetch_industry_insights', {
      category: 'AI Tool',
      label: `Industry: ${input.industry}`,
    });

    const { output } = await industryInsightsPrompt(input);
    return output!;
  }
);
