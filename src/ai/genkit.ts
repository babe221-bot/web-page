import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    // googleAI({
    //   // Get your key from https://makersuite.google.com/app/apikey
    //   apiKey: process.env.GOOGLE_API_KEY,
    // }),
  ],
  // model: 'googleai/gemini-2.5-pro',
});
