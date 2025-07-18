'use server';
/**
 * @fileoverview A tool for browsing web pages.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as cheerio from 'cheerio';

export const browseTool = ai.defineTool(
  {
    name: 'browse',
    description: 'Fetches the content of a web page from a given URL.',
    inputSchema: z.object({
      url: z.string().describe('The URL of the web page to fetch.'),
    }),
    outputSchema: z.string().describe('The text content of the web page.'),
  },
  async ({ url }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Error fetching page: ${response.statusText}`;
      }
      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove script, style, and other non-visible elements
      $('script, style, noscript, iframe, header, footer, nav').remove();

      // Extract text from the body, trying to maintain some structure
      const text = $('body').text();

      // Clean up whitespace
      return text.replace(/\s\s+/g, ' ').trim();
    } catch (e: any) {
      return `Error: Could not fetch or parse the URL. ${e.message}`;
    }
  }
);
