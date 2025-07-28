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
import { browseTool } from '../tools/browse';
import { Content, Message } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
const HistorySchema = z.array(MessageSchema);


const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
      text: z.string(),
    })),
  })).describe('The conversation history.'),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const knowledgeBase = `
# Chatbot Knowledge Base: DaorsForge AI Systems

## O Kompaniji

**Ime:** DaorsForge AI Systems
**Slogan:** Kujemo Budućnost Proizvodnje. Eliminišemo uska grla, automatiziramo kompleksnost i otključavamo puni potencijal vaše industrije kroz napredna AI rješenja.
**Lokacija:** Stolac, BiH 88360
**Email:** bakir@daorsforgealsystems.com
**Web:** www.daorsforgealsystems.com
**Društvene mreže:**
- LinkedIn: https://www.linkedin.com/company/daors
- Twitter: https://x.com/daors
- Facebook: https://www.facebook.com/daors
- YouTube: https://www.youtube.com/@Daors

## Glavne Usluge za Industriju

### AI Strategija i Implementacija
Projektujemo i implementiramo napredne AI modele koji automatiziraju složene proizvodne procese, smanjujući troškove do 35% i povećavajući efikasnost. Naši sistemi uče i prilagođavaju se promjenama u realnom vremenu.

### Prilagođena Integracija Sistema
Povezujemo vaše postojeće sisteme (MES, SCADA, ERP) u jedinstven, inteligentni ekosistem koji omogućava donošenje odluka u realnom vremenu. Eliminišemo silose podataka i stvaramo jedinstven izvor istine.

### Cloud Infrastruktura
Dizajniramo skalabilnu cloud arhitekturu optimizovanu za industrijske AI/ML aplikacije sa 99.9% uptime garancijom. Sigurna, visoko dostupna infrastruktura koja raste uz vaše poslovne potrebe.

## Industrije Koje Poslužujemo

### Muzička i Video Industrija
**Opis:** Revolucionarni AI alati za muzičku produkciju, video obradu i distribuciju.
**Karakteristike:** AI-generisana muzička pratnja, automatska video obrada i optimizacija, inteligentna distribucija sadržaja, prediktivna analiza trendova.

### Kamenoklesarska Industrija
**Opis:** Napredna AI rješenja za modernizaciju tradicionalne klesarske industrije.
**Karakteristike:** 3D skeniranje i modeliranje, AI-dizajn klesarskih elemenata, optimizacija materijala, kontrola kvaliteta kompjuterskim vidom, napredni upravljački programi.

### Vinarije
**Opis:** AI rješenja za optimizaciju procesa proizvodnje vina, od vinograda do boce.
**Karakteristike:** Prediktivna analiza zrelosti grožđa, automatizirana kontrola fermentacije, optimizacija miješanja sorti, praćenje uslova u podrumu.

### Klasična Proizvodnja
**Opis:** Osnovna AI rješenja za klasične proizvodne procese.
**Karakteristike:** Prediktivno održavanje, optimizacija proizvodnih linija, kontrola kvaliteta AI sistemima, integracija sistema u realnom vremenu.

## 4-D Metodologija

Naš dokazani proces za uspješnu AI transformaciju.
1.  **Otkrivanje:** Dubinske radionice za mapiranje proizvodnih procesa, tehnološkog steka i strateških operativnih ciljeva. Identificiramo ključne tačke gdje AI može stvoriti najveću vrijednost.
2.  **Dizajn:** Arhitektiranje sveobuhvatnog blueprint-a rješenja sa tehničkom arhitekturom i jasnim roadmap-om. Definiramo KPI-jeve i metodologiju mjerenja uspjeha.
3.  **Razvoj:** Elitni inženjerski tim gradi, testira i usavršava vaš prilagođeni automatizacijski i integracijski motor. Koristimo agilnu metodologiju sa kratkim iteracijama.
4.  **Implementacija:** Potpuna implementacija u live proizvodno okruženje sa kontinuiranom podrškom i praćenjem performansi. Obuka timova i transfer znanja za održivost.

## Rješenja za Male Biznise i Lične Potrebe

### Izrada Web Stranica
Profesionalna izrada modernih, responzivnih i funkcionalnih web stranica. Karakteristike: Dizajn prilagođen klijentu, SEO optimizacija, integracija društvenih mreža, mobilna responzivnost.

### Audio i Video Produkcija
Kompletna usluga audio i video produkcije za web stranice, marketing kampanje ili lične projekte. Karakteristike: Snimanje i montaža, animacije i efekti, optimizacija za web, audio inženjering.

### Web Chatbotovi
Implementacija inteligentnih web chatbotova koji poboljšavaju korisničku podršku. Karakteristike: Automatski odgovori, prikupljanje informacija o klijentima, 24/7 dostupnost, integracija sa postojećim sistemima.

### Male Automatizacije
Razvoj malih, ali moćnih automatizacija za smanjenje rutinskih zadataka. Karakteristike: Automatizacija email komunikacije, automatsko generisanje izvještaja, upravljanje kalendarom.
`;


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ history, message }) => {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      tools: [browseTool],
      system: `Ti si DaorsChatBot, prijateljski i uslužan AI asistent za DaorsForge AI Systems.
Tvoj cilj je da odgovaraš na pitanja korisnika o kompaniji, njenim uslugama i veštačkoj inteligenciji uopšte.

**Uputstva za konverzaciju:**
- Budi ljubazan i otvoren za neobavezan razgovor. Ako te neko pozdravi, uzvrati pozdrav i pitaj kako možeš pomoći.
- Na pitanja poput "Kako si?", odgovori pozitivno i usmeri razgovor na to kako možeš pomoći korisniku.
- Kada te pitaju "Šta nudite?", sažeto predstavi glavne usluge za industriju i rešenja za male biznise, koristeći informacije iz baze znanja.
- Za pitanja o kontaktu, pruži email i web adresu iz baze znanja.

Uvek odgovaraj na osnovu sledeće baze znanja. Ako ne znaš odgovor, reci da nemaš tu informaciju, ali da ćeš preneti pitanje timu.
Ako korisnik pošalje URL, koristi 'browse' alat da preuzmeš sadržaj stranice i odgovoriš na osnovu tog sadržaja.

**Baza Znanja:**
${knowledgeBase}

Odgovaraj na bosanskom jeziku. Budi sažet i od pomoći.
`,
      history: history.map(h => new Message(h.role, h.content as Content[])),
      prompt: message,
    });
    
    if (!response) {
      return "Izvinite, desila se neočekivana greška. Molimo pokušajte ponovo.";
    }

    return response.text;
  }
);
