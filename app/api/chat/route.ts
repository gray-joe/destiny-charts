import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    // Check if the question is about Linear Fusion Rifles in general
    const isGeneralQuestion = message.toLowerCase().includes('linear fusion') || 
                            message.toLowerCase().includes('lfr') ||
                            message.toLowerCase().includes('tier') ||
                            message.toLowerCase().includes('list');

    let documents;
    
    if (isGeneralQuestion) {
      // For general questions, get all Linear Fusion Rifles
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('metadata->>type', 'linear_fusion_rifle');
      
      if (error) throw error;
      documents = data;
    } else {
      // For specific questions, use semantic search
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: message,
      });
      const embedding = embeddingResponse.data[0].embedding;

      const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: 5,
      });

      if (error) throw error;
      documents = data;
    }

    console.log('Found documents:', documents?.length);

    if (!documents || documents.length === 0) {
      return NextResponse.json({
        response: "I don't have enough information in my database to answer that question about Linear Fusion Rifles.",
        sources: []
      });
    }

    // Format the context in a more structured way
    const context = documents
      .map((doc: any) => {
        const weaponData = doc.content.split('\n')
          .filter((line: string) => line.trim())
          .map((line: string) => line.trim())
          .join('\n');
        return `Weapon Information:\n${weaponData}\n`;
      })
      .join('\n');

    console.log('Context:', context);

    // Generate response using OpenAI with the context
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a Destiny 2 Linear Fusion Rifle expert. Your knowledge is limited to ONLY the weapons listed in the context below. You must follow these rules strictly:

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

    const response = completion.choices[0].message.content;
    console.log('Generated response:', response);

    return NextResponse.json({ 
      response,
      sources: documents.map((doc: any) => ({
        name: doc.metadata.name,
        type: doc.metadata.type,
      }))
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 