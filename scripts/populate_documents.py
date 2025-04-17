import os
from dotenv import load_dotenv
from supabase import create_client, Client
from openai import OpenAI
import json
from typing import List, Dict, Any
import time

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text: str) -> List[float]:
    """Generate embedding for a given text using OpenAI's API."""
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def fetch_linear_fusion_rifles() -> List[Dict[str, Any]]:
    """Fetch Linear Fusion Rifle data from the tier list."""
    response = supabase.table('legendary_weapons').select(
        'id, type, name, icon_url, affinity, frame, enhanceable, reserves, perk_one, perk_two, origin_trait, tier'
    ).eq('type', 'Linear Fusion Rifle').execute()
    return response.data

def process_weapon_data(weapon: Dict[str, Any]) -> Dict[str, Any]:
    """Process weapon data into a document format."""
    content = f"""
    Linear Fusion Rifle: {weapon.get('name', 'Unknown')}
    Element: {weapon.get('affinity', 'Unknown')}
    Frame: {weapon.get('frame', 'Unknown')}
    Enhanceable: {weapon.get('enhanceable', 'Unknown')}
    Reserves: {weapon.get('reserves', 'Unknown')}
    Perk One: {weapon.get('perk_one', 'Unknown')}
    Perk Two: {weapon.get('perk_two', 'Unknown')}
    Origin Trait: {weapon.get('origin_trait', 'Unknown')}
    Tier: {weapon.get('tier', 'Unknown')}
    """
    
    return {
        'content': content.strip(),
        'metadata': {
            'type': 'linear_fusion_rifle',
            'weapon_id': weapon.get('id'),
            'name': weapon.get('name'),
            'source': 'tier_list'
        }
    }

def store_document(content: str, metadata: Dict[str, Any], embedding: List[float]):
    """Store a document in the Supabase documents table."""
    supabase.table('documents').insert({
        'content': content,
        'metadata': metadata,
        'embedding': embedding
    }).execute()

def main():
    print("Starting document population for Linear Fusion Rifles...")
    
    # Fetch and process weapon data
    print("Processing Linear Fusion Rifle data...")
    weapons = fetch_linear_fusion_rifles()
    print(f"Found {len(weapons)} Linear Fusion Rifles to process")
    
    for weapon in weapons:
        try:
            doc = process_weapon_data(weapon)
            print(f"Processing {doc['metadata']['name']}...")
            embedding = get_embedding(doc['content'])
            store_document(doc['content'], doc['metadata'], embedding)
            time.sleep(0.1)  # Rate limiting for OpenAI API
        except Exception as e:
            print(f"Error processing weapon {weapon.get('name', 'Unknown')}: {str(e)}")
            continue
    
    print("Document population completed!")

if __name__ == "__main__":
    main() 