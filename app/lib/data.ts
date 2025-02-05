import { db } from '@vercel/postgres';
import {
  Weapon,
  SuperRegen,
  SustainedBossDamage,
  Abilities,
  SwapBossDamage,
  Build
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

    return rows as Weapon[];
  } catch (error) {
    console.error(`Error fetching ${type} tier list data:`, error);
    throw new Error(`Failed to fetch ${type} tier list data.`);
  }
}

export async function fetchSuperRegenList(): Promise<SuperRegen[]> {
  try {
    const { rows } = await db.query(`SELECT * FROM super_regen`);
    return rows as SuperRegen[];
  } catch (error) {
    console.error("Error fetching super regen data:", error);
    throw new Error("Failed to fetch super regen data.");
  }
}

export async function fetchSustainedBossDamageData(): Promise<SustainedBossDamage[]> {
  try {
    const { rows } = await db.query(`SELECT * FROM dps_sustained ORDER BY sustained DESC`);
    return rows as SustainedBossDamage[];
  } catch (error) {
    console.error("Error fetching sustained boss damage data:", error);
    throw new Error("Failed to fetch sustained boss damage data.");
  }
}

export async function fetchAbilitiesData(): Promise<Abilities[]> {
  try {
    const { rows } = await db.query(`SELECT * FROM dps_abilities ORDER BY actual DESC`);
    return rows as Abilities[];
  } catch (error) {
    console.error("Error fetching abilities data:", error);
    throw new Error("Failed to fetch abilities data.");
  }
}

export async function fetchSwapBossDamageData(): Promise<SwapBossDamage[]> {
  try {
    const { rows } = await db.query(`SELECT * FROM dps_swap ORDER BY true_dps DESC`);
    return rows as SwapBossDamage[];
  } catch (error) {
    console.error("Error fetching swap boss damage data:", error);
    throw new Error("Failed to fetch swap boss damage data.");
  }
}

export async function fetchBuilds(): Promise<Build[]> {
  try {
    const { rows } = await db.query(`
      SELECT 
        b.id,
        b.updated_at,
        b.name,
        b.class,
        b.subclass,
        b.activities,
        b.background_image,
        b.exotic_armor,
        b.exotic_weapon,
        b.legendary_weapons,
        b.build_guide_id,
        e.icon_url as exotic_weapon_icon_url,
        a.icon_url as exotic_armor_icon_url
      FROM builds b
      LEFT JOIN exotic_weapons e ON b.exotic_weapon = e.name
      LEFT JOIN exotic_armor a ON b.exotic_armor = a.name
      ORDER BY b.updated_at DESC
    `);
    return rows as Build[];
  } catch (error) {
    console.error('Error fetching builds:', error);
    throw new Error('Failed to fetch builds');
  }
}

export async function fetchBuildById(id: string): Promise<Build> {
  try {
    const { rows } = await db.query(`
      SELECT *
      FROM builds
      WHERE id = $1
    `, [id]);

    if (rows.length === 0) {
      throw new Error(`Build with ID ${id} not found`);
    }

    return rows[0] as Build;
  } catch (error) {
    console.error('Error fetching build:', error);
    throw new Error('Failed to fetch build');
  }
}
