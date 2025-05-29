import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { getEmbedding, getChatCompletion } from '@destiny-charts/openai-client';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
      const embedding = await getEmbedding(message);

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
    const response = await getChatCompletion(message, context);

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