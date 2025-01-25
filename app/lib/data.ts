import { db } from '@vercel/postgres';
import {
  Weapon,
} from './definitions';

export async function fetchTierList(type: string): Promise<Weapon[]> {
  const validTypes = [
    'Linear Fusion Rifle',
    'Heavy Grenade Launcher',
    'Machine Gun',
    'Rocket',
    'Sword',
    'Breach Grenade Launcher',
    'Glaive',
    'Fusion Rifle',
    'Rocket Sidearm',
    'Sniper',
    'Shotgun',
    'Trace Rifle'
  ];

  if (!validTypes.includes(type)) {
    console.log(`Type "${type}" not found in valid types:`, validTypes);
    throw new Error(`Invalid weapon type: ${type}`);
  }

  try {
    const { rows } = await db.query(`
      SELECT 
        id,
        icon_url,
        name,
        affinity,
        frame,
        enhanceable,
        reserves,
        perk_one,
        perk_two,
        origin_trait,
        rank_in_type,
        tier
      FROM legendary_weapons
      WHERE type = $1
      ORDER BY CAST(rank_in_type AS INTEGER) ASC`, [type]);

    console.log(`Found ${rows.length} weapons for type "${type}"`);
    return rows as Weapon[];
  } catch (error) {
    console.error(`Error fetching ${type} tier list data:`, error);
    throw new Error(`Failed to fetch ${type} tier list data.`);
  }
}
