'use server';

/**
 * @fileOverview A Genkit flow for a conversational chatbot.
 *
 * - chat - A function that takes the conversation history and a new message, and returns the AI's response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const knowledgeBase = `
# Chatbot Knowledge Base: DaorsForge AI Systems

## App Name

DaorsForge AI Systems

## Core Features

- Homepage Hero Section: Hero section with background video to highlight key company information.
- Industry Specific Display: Informational section displaying specific industries where our solutions apply.
- 4D Methodology: A 4-step methodology that enables us to successfully build automation tools and systems
- Contact form: A clean, and elegant contact form with input fields to capture contact information for prospects and customers.
- Predictive Insights: Industry Insights Tool: The system will analyze the user-selected industry during form submission and display a series of insights specific to it

## Style Guidelines

- Primary color: Electric blue (#00D4FF) for highlighting calls to action.
- Background color: Dark navy (#0F0F23) creates a modern tech look. 20% saturation of primary.
- Accent color: Purple (#7C3AED) analogous to electric blue.
- Headline font: 'Space Grotesk' (sans-serif) for a futuristic aesthetic. It should be paired with 'Inter' (sans-serif) for longer bodies of text
- Code font: 'Source Code Pro' for any snippets.
- Use modern, flat design icons from Font Awesome.
- Subtle animations like fade-ins and slide-ups to improve user experience.

## Industries Served

### Muzička i Video Industrija

**Description:** Revolucionarni AI alati za muzičku produkciju, video obradu i distribuciju. Naši sistemi optimiziraju procese kreativne produkcije, ubrzavaju radne tokove i poboljšavaju kvalitet finalnog proizvoda.

**Features:**
- AI-generisana muzička pratnja
- Automatska video obrada i optimizacija
- Inteligentna distribucija sadržaja
- Prediktivna analiza trendova

### Kamenoklesarska Industrija

**Description:** Napredna AI rješenja za modernizaciju tradicionalne klesarske industrije. Automatiziramo procese dizajna, optimiziramo upotrebu materijala i poboljšavamo preciznost klesarskih radova.

**Features:**
- 3D skeniranje i modeliranje
- AI-dizajn klesarskih elemenata
- Optimizacija materijala
- Kontrola kvaliteta kompjuterskim vidom
- Napravni upravljački programi

### Vinarije

**Description:** AI rješenja za optimizaciju procesa proizvodnje vina, od vinograda do boce. Unaprijedite kvalitet, smanjite troškove i povećajte prinose uz pomoć pametne tehnologije.

**Features:**
- Prediktivna analiza zrelosti grožđa
- Automatizirana kontrola fermentacije
- Optimizacija miješanja sorti
- Praćenje uslova u podrumu

### Klasična Proizvodnja

**Description:** Naša osnovna AI rješenja za klasične proizvodne procese. Implementiramo napredne modele koji automatiziraju složene proizvodne procese, smanjujući troškove do 35% i povećavajući efikasnost.

**Features:**
- Prediktivno održavanje
- Optimizacija proizvodnih linija
- Kontrola kvaliteta AI sistemima
- Integracija sistema u realnom vremenu
`;

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  prompt: `Ti si DaorsChatBot, prijateljski i uslužan AI asistent za DaorsForge AI Systems.
Tvoj cilj je da odgovaraš na pitanja korisnika o kompaniji, njenim uslugama i veštačkoj inteligenciji uopšte.
Koristiš sledeću bazu znanja da odgovoriš na pitanja:
${knowledgeBase}

Odgovaraj na bosanskom jeziku. Budi sažet i od pomoći.

Here is the conversation history:
{{#each history}}
- {{role}}: {{content}}
{{/each}}

New user message:
- user: {{message}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await chatPrompt(input);
    return response.text ?? "Izvinite, nisam mogao da obradim vaš zahtev. Možete li preformulisati?";
  }
);
