import { db } from '@vercel/postgres';
import {
  Weapon,
} from './definitions';

const client = await db.connect();

export async function fetchLfrTierList(): Promise<Weapon[]> {
  try {
    const { rows } = await client.sql`
      SELECT 
        l.id,
        l.icon_url,
        l.name,
        l.affinity,
        l.frame,
        l.enhanceable,
        l.reserves,
        l.perk_one,
        l.perk_two,
        l.origin_trait,
        t.rank,
        t.tier
      FROM tier_list_lfr t
      JOIN legendary_weapons l ON t.weapon_id = l.id
      ORDER BY t.rank ASC`;
    return rows as Weapon[];
  } catch (error) {
    console.error("Error fetching LFR tier list data:", error);
    throw new Error("Failed to fetch LFR tier list data.");
  }
}
