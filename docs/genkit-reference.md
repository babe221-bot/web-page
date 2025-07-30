# Genkit: Building with AI

Genkit is an open-source framework from Google for creating robust, production-ready AI applications. It provides a unified interface for various AI models, simplifying the development of features like chatbots, automators, and recommendation systems.

## Core Concepts

### Unified Model Interface (`ai.generate()`)

The `ai.generate()` function is the primary way to interact with generative models.

**Basic Usage:**

```typescript
import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-1.5-flash-latest'), // Default model
});

// Generate with the default model
const response = await ai.generate('Tell me a joke.');
console.log(response.text);
```

**Configuration:**

You can customize model behavior with parameters like `system` prompts and `config`.

```typescript
const response = await ai.generate({
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: 'Tell me a story about a brave knight.',
  system: 'You are a master storyteller.',
  config: {
    maxOutputTokens: 1024,
    temperature: 0.8,
  },
});
```

**Structured Output with Zod:**

Define a Zod schema to get structured, typed JSON output from the model.

```typescript
import { z } from 'genkit';

const CharacterSchema = z.object({
  name: z.string().describe('Character name'),
  role: z.string().describe('Character role in the story'),
});

const response = await ai.generate({
  prompt: 'Create a character for a fantasy story.',
  output: { schema: CharacterSchema },
});

const character = response.output; // Typed and validated
if (character) {
  console.log(`Name: ${character.name}, Role: ${character.role}`);
}
```

### Streaming (`ai.generateStream()`)

Use `generateStream` for real-time data, like in a chatbot interface.

```typescript
const { stream, response } = ai.generateStream({
  prompt: 'Write a short poem about the sea.',
});

// Stream text chunks as they arrive
for await (const chunk of stream) {
  console.log(chunk.text);
}

// Get the final, complete response
const finalResponse = await response;
console.log('---Complete Poem---');
console.log(finalResponse.text);
```

### Multimodal Input

Combine different types of media (text, images) in a single prompt.

```typescript
import { readFile } from 'node:fs/promises';

// Image from a URL
const response1 = await ai.generate({
  prompt: [
    { media: { url: 'https://.../cat.jpg' } },
    { text: 'Describe what this cat is doing.' },
  ],
});

// Image from a local file
const data = await readFile('dog.jpg');
const response2 = await ai.generate({
  prompt: [
    { media: { url: `data:image/jpeg;base64,${data.toString('base64')}` } },
    { text: 'What breed is this dog?' },
  ],
});
```

## AI Workflows with Flows

Flows are TypeScript functions that orchestrate AI logic, from pre-processing input to post-processing model output. They offer type safety, easy debugging, and simplified deployment.

### Defining a Flow

Wrap your AI logic in `ai.defineFlow` to make it a testable and deployable unit.

```typescript
import { z } from 'genkit';

// Define a schema for structured output
const MenuItemSchema = z.object({
  dishName: z.string(),
  description: z.string(),
});

// Define the flow
export const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: MenuItemSchema,
  },
  async ({ theme }) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: `Suggest a menu item for a '${theme}' themed restaurant.`,
      output: { schema: MenuItemSchema },
    });

    if (!output) {
      throw new Error('Failed to generate a menu item.');
    }
    return output;
  }
);
```

### Calling a Flow

Invoke flows like regular functions from your application code.

```typescript
const menuItem = await menuSuggestionFlow({ theme: 'Tropical Island' });
console.log(`Dish: ${menuItem.dishName}
Description: ${menuItem.description}`);
```

### Streaming Flows

Define flows that can stream data back to the caller.

```typescript
export const streamingStoryFlow = ai.defineFlow(
  {
    name: 'streamingStoryFlow',
    inputSchema: z.object({ topic: z.string() }),
    streamSchema: z.string(), // The type of each streamed chunk
    outputSchema: z.string(),   // The type of the final, complete output
  },
  async ({ topic }, { sendChunk }) => {
    const { stream, response } = ai.generateStream({
      prompt: `Tell a short story about ${topic}.`,
    });

    for await (const chunk of stream) {
      sendChunk(chunk.text); // Send each text chunk to the flow's stream
    }

    return (await response).text; // Return the final, complete story
  }
);
```

### Calling a Streaming Flow

```typescript
const response = streamingStoryFlow.stream({ topic: 'a robot who discovers music' });

// Process chunks as they arrive
for await (const chunk of response.stream) {
  process.stdout.write(chunk);
}

// Get the final output
const finalStory = await response.output;
```

## Development and Debugging

### Running Flows from the CLI

Test your flows directly from the terminal.

```bash
# Run a standard flow
genkit flow:run menuSuggestionFlow '{"theme": "Space Diner"}'

# Run a streaming flow and see the output chunks
genkit flow:run streamingStoryFlow '{"topic": "a lost dragon"}' -s
```

### The Genkit Developer UI

The Developer UI provides a web-based interface for running and debugging your flows. You can inspect traces for each step, view inputs and outputs, and understand how your AI logic is executing.

To start it, run:
```bash
genkit start
```
Then open your browser to `http://localhost:4000`.
