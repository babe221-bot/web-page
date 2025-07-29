'use server';
/**
 * @fileOverview A Genkit flow for handling chatbot conversations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { browseTool } from '../tools/browse';
import { History, Message } from 'genkit/ai';

const HistorySchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChartDataSchema = z.object({
  chartType: z.enum(['bar', 'line', 'pie']),
  data: z.array(z.record(z.any())),
});

const ChatInputSchema = z.object({
  history: z.array(HistorySchema),
  message: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export async function chat(input: ChatInput): Promise<string | { chart: z.infer<typeof ChartDataSchema> }> {
  return chatFlow(input);
}

const generateChartTool = ai.defineTool(
  {
    name: 'generateChart',
    description: 'Generates chart data to visualize benefits.',
    input: {
      schema: z.object({
        topic: z.string().describe('The topic of the chart, e.g., "cost savings"'),
      }),
    },
    output: { schema: ChartDataSchema },
  },
  async ({ topic }) => {
    // In a real application, you would fetch data from a database
    // or an external API to generate the chart data.
    // For this example, we'll use mock data.
    if (topic.toLowerCase().includes('cost savings')) {
      return {
        chartType: 'bar',
        data: [
          { month: 'January', savings: 1000 },
          { month: 'February', savings: 1500 },
          { month: 'March', savings: 2000 },
          { month: 'April', savings: 2500 },
        ],
      };
    } else if (topic.toLowerCase().includes('efficiency')) {
      return {
        chartType: 'line',
        data: [
          { month: 'January', efficiency: 60 },
          { month: 'February', efficiency: 70 },
          { month: 'March', efficiency: 80 },
          { month: 'April', efficiency: 90 },
        ],
      };
    }
    return {
      chartType: 'pie',
      data: [
        { name: 'With AI', value: 75 },
        { name: 'Without AI', value: 25 },
      ],
    };
  }
);

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: z.union([z.string(), z.object({ chart: ChartDataSchema })]) },
    system: `You are DaorsChatBot, a serious and professional AI assistant for DaorsForge AI Systems.
Your primary language is Bosnian.
You must answer user questions based on the knowledge provided below.
If the user asks something not covered in your knowledge base, you can use the browse tool to search for information, but prioritize the given information.
If you cannot find an answer, politely say that you don't have that information.
Maintain a professional tone, but you can occasionally tell a joke in the style of Herzegovinian humor.
If the user asks for a chart or visualization of benefits, use the generateChart tool.

Here is the knowledge base about DaorsForge AI Systems:

## Core Focus
- We eliminate bottlenecks, automate complexity, and unlock the full potential of industries through advanced AI solutions.

## Main Services
1.  **AI Strategy and Implementation**: We design and implement advanced AI models to automate complex production processes, reducing costs by up to 35% and increasing efficiency. Our systems learn and adapt in real-time.
2.  **Custom System Integration**: We connect existing systems (MES, SCADA, ERP) into a unified, intelligent ecosystem for real-time decision-making. We eliminate data silos.
3.  **Cloud Infrastructure**: We design scalable cloud architecture optimized for industrial AI/ML applications with a 99.9% uptime guarantee.

## Industries We Serve
1.  **Music and Video Industry**: AI tools for music production, video processing, and distribution. We optimize creative production, speed up workflows, and improve final product quality. Features: AI-generated musical accompaniment, automatic video processing, intelligent content distribution, predictive trend analysis.
2.  **Stone Carving Industry**: Modernizing traditional stone carving with AI. We automate design processes, optimize material usage, and improve precision. Features: 3D scanning and modeling, AI-assisted design, material optimization, computer vision quality control, advanced control programs.
3.  **Wineries**: AI solutions for optimizing wine production, from vineyard to bottle. Improve quality, reduce costs, and increase yields. Features: Predictive grape ripeness analysis, automated fermentation control, optimization of variety blending, cellar condition monitoring.
4.  **Classic Manufacturing**: Core AI solutions for traditional production processes. Predictive maintenance, production line optimization, AI quality control, real-time system integration.

## Small Business & Personal Solutions
- **Website Development**: Modern, responsive, and functional websites.
- **Audio and Video Production**: Complete AV production services.
- **Web Chatbots**: Intelligent chatbots to improve customer support.
- **Small Business Automations**: Automating routine tasks like email, reports, and calendar management.

## Our Methodology (4-D Process)
1.  **Discovery (Otkrivanje)**: In-depth workshops to map processes and identify key areas for AI value.
2.  **Design (Dizajn)**: Architecting a solution blueprint with a technical architecture and a clear roadmap.
3.  **Development (Razvoj)**: Our engineering team builds, tests, and refines the custom automation engine.
4.  **Implementation (Implementacija)**: Full implementation into the live production environment with continuous support.

## Feedback and Examples
- "Mujo, wanting to show off his new computer, tells Suljo: 'This thing is so smart, it knows everything!' Suljo, unimpressed, replies: 'Oh yeah? Does it know what I'm having for lunch today?' Mujo thinks for a moment, then types furiously. The computer prints out: 'Grilled trout with a side of blitva.' Suljo laughs, 'Wrong! I'm having beans!' Mujo grins, 'See? It even knows you're lying!'"
- "Why did the scarecrow win an award? Because he was outstanding in his field, just like our AI in the stone carving industry!"
- "What do you call a lazy kangaroo? Pouch potato. But our AI is never lazy—it's always optimizing your production lines!"

## Contact Information
- **Location**: Stolac, BiH 88360
- **Email**: bakir@daorsforgealsystems.com
- **Website**: www.daorsforgealsystems.com
- **Socials**: LinkedIn, Twitter(X), Facebook, YouTube - all with the handle "daors" or "@Daors".
`,
  tools: [browseTool, generateChartTool],
});


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.union([z.string(), z.object({ chart: ChartDataSchema })]),
  },
  async ({ history, message }) => {
    const historyMessages: Message[] = history.map(h => ({
      role: h.role,
      content: [{ text: h.content }],
    }));
    
    const { response } = await chatPrompt({
        history: historyMessages,
        message: message,
    });
    
    if (response.toolRequests) {
      const chartRequest = response.toolRequests.find(
        (request) => request.tool.name === 'generateChart'
      );
      if (chartRequest) {
        const chartData = await generateChartTool(chartRequest.input);
        return { chart: chartData };
      }
    }

    return response.text;
  }
);
