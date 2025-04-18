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

type WeaponType = 
  | 'Linear Fusion Rifle'
  | 'Heavy Grenade Launcher'
  | 'Machine Gun'
  | 'Rocket'
  | 'Sword'
  | 'Breach Grenade Launcher'
  | 'Glaive'
  | 'Fusion Rifle'
  | 'Rocket Sidearm'
  | 'Sniper Rifle'
  | 'Shotgun'
  | 'Trace Rifle';

interface WeaponTypeInfo {
  variations: string[];
  dbValue: string;
}

interface ChatRequest {
  message: string;
}

interface Document {
  content: string;
  metadata: {
    name: string;
    weapon_type: string;
  };
}

// Map of weapon types to their variations and database values
const WEAPON_TYPE_MAP: Record<WeaponType, WeaponTypeInfo> = {
  'Linear Fusion Rifle': {
    variations: ['linear fusion', 'lfr', 'linear fusion rifle'],
    dbValue: 'linear_fusion_rifle'
  },
  'Heavy Grenade Launcher': {
    variations: ['heavy grenade launcher', 'heavy gl', 'heavy grenade'],
    dbValue: 'heavy_grenade_launcher'
  },
  'Machine Gun': {
    variations: ['machine gun', 'mg', 'lmg'],
    dbValue: 'machine_gun'
  },
  'Rocket': {
    variations: ['rocket', 'rocket launcher', 'rl'],
    dbValue: 'rocket'
  },
  'Sword': {
    variations: ['sword'],
    dbValue: 'sword'
  },
  'Breach Grenade Launcher': {
    variations: ['breach grenade launcher', 'breach gl', 'breach grenade', 'special grenade launcher'],
    dbValue: 'breach_grenade_launcher'
  },
  'Glaive': {
    variations: ['glaive'],
    dbValue: 'glaive'
  },
  'Fusion Rifle': {
    variations: ['fusion rifle', 'fr'],
    dbValue: 'fusion_rifle'
  },
  'Rocket Sidearm': {
    variations: ['rocket sidearm', 'sidearm'],
    dbValue: 'rocket_sidearm'
  },
  'Sniper Rifle': {
    variations: ['sniper rifle', 'sniper'],
    dbValue: 'sniper_rifle'
  },
  'Shotgun': {
    variations: ['shotgun', 'sg'],
    dbValue: 'shotgun'
  },
  'Trace Rifle': {
    variations: ['trace rifle', 'trace'],
    dbValue: 'trace_rifle'
  }
};

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    if (!body || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { message } = body as ChatRequest;

    // Normalize the message for comparison
    const normalizedMessage = message.toLowerCase().trim();
    
    // Find the weapon type by checking variations
    let detectedWeaponType: WeaponType | null = null;
    for (const [type, { variations }] of Object.entries(WEAPON_TYPE_MAP)) {
      if (variations.some(variation => normalizedMessage.includes(variation))) {
        detectedWeaponType = type as WeaponType;
        break;
      }
    }

    let documents: Document[] | null = null;
    
    if (detectedWeaponType) {
      // For specific weapon type questions, get all weapons of that type
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('metadata->>weapon_type', WEAPON_TYPE_MAP[detectedWeaponType].dbValue);
      
      if (error) throw error;
      documents = data;
    } else {
      // For general questions, use semantic search
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

    if (!documents || documents.length === 0) {
      return NextResponse.json({
        response: "I don't have enough information in my database to answer that question. Please try asking about a specific weapon type.",
        sources: []
      });
    }

    // Format the context in a more structured way
    const context = documents
      .map((doc) => {
        const weaponData = doc.content.split('\n')
          .filter((line) => line.trim())
          .map((line) => line.trim())
          .join('\n');
        return `Weapon Information:\n${weaponData}\n`;
      })
      .join('\n');

    // Generate response using OpenAI with the context
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

    const response = completion.choices[0].message.content;

    return NextResponse.json({ 
      response,
      sources: documents.map((doc) => ({
        name: doc.metadata.name,
        type: doc.metadata.weapon_type,
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