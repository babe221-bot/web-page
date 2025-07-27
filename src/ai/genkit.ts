import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: "AIzaSyDmlzykGqwLrYR9h7cqYHLSPJaMKOfoiLc"})],
  model: 'googleai/gemini-1.0-pro',
});
