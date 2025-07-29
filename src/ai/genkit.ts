import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Get your key from https://makersuite.google.com/app/apikey
      apiKey: process.env.AIzaSyBLsHYDr9uBnVZQ_4gOyITdPeSz7s5ckkE,
    }),
  ],
  model: 'googleai/gemini-1.5-flash-latest',
});
