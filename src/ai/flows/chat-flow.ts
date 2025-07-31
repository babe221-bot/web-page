import { GenerationConfig, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import * as ai from 'genkit';
import { geminiPro } from 'genkit/flows';
import { Message, MessageSchema, ChatInputSchema, systemPrompt } from './schemas';

// Make sure that the model is initialized.
ai.configure({
  forceGlobal: true,
  providers: [
    geminiPro({
      apiKey: process.env.GOOGLE_API_KEY!,
      apiOpts: {
        baseUrl: process.env.GOOGLE_AI_API_BASE_URL || 'https://generativelanguage.googleapis.com',
      },
    }),
  ],
  logLevel: 'debug',
  flowStateStore: 'firebase',
});

// Configure the safety settings for Gemini API
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// Configure the generation settings for Gemini API
const GENERATION_CONFIG: GenerationConfig = {
  candidateCount: 1,
  stopSequences: ['stop'],
  maxOutputTokens: 2048,
  temperature: 0.7,
  topP: 1,
  topK: 1,
};

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

async function chatPrompt(input: {
  message: string;
  history: Message[];
}): Promise<any> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    safetySettings: SAFETY_SETTINGS,
    generationConfig: GENERATION_CONFIG,
  });

  const chat = model.startChat({
    history: input.history,
    generationConfig: GENERATION_CONFIG,
  });

  const result = await chat.sendMessage(input.message);
  return result.response;
}

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: MessageSchema,
  },
  async (input) => {
    try {
      const messages: Message[] = [
        ...input.history.map((h) => ({ role: h.role, content: h.content as string })),
        { role: 'user', content: input.message },
      ];

      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        system: systemPrompt,
        prompt: messages,
        output: { schema: z.string() },
      });

      if (!output) throw new Error('Failed to generate chat response');

      return {
        role: 'model',
        content: output,
      };
    } catch (error) {
      console.error('Error generating chat response:', error);
      return {
        role: 'model',
        content: "Izvinite, nisam mogao da obradim vaš zahtev. Možete li preformulisati?",
      };
    }
  }
);
