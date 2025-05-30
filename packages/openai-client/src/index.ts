import { OpenAI } from 'openai';

export async function getEmbedding(message: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: message,
  });
  return embeddingResponse.data[0].embedding;
}

export async function getChatCompletion(message: string, context: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a Destiny 2 weapon expert. Your knowledge is limited to ONLY the weapons listed in the context below. You must follow these rules strictly:

1. ONLY use information from the provided context. If information isn't in the context, say "I don't have information about that in my database."
2. When listing weapons (like S-tier weapons), include ALL weapons that match the criteria from the context.
3. For specific weapon questions, provide ALL details available in the context.
4. Never make up or assume information not present in the context.
5. When asked about tiers, only mention weapons that explicitly have the requested tier in their information.
6. Always be precise and complete in your answers.

Available Weapons:
${context}

Remember: Your knowledge is limited to these weapons only. Do not reference any other weapons or make assumptions.`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.1,
  });

  return completion.choices[0].message.content;
} 