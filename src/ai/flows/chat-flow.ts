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

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  prompt: `You are a friendly and helpful AI assistant for DaorsForge AI Systems.
Your goal is to answer user questions about the company, its services, and AI in general.
Be concise and helpful.

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
    const { output } = await chatPrompt(input);
    return output?.toString() || "I'm sorry, I couldn't process that. Could you rephrase?";
  }
);
