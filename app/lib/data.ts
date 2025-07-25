import { db } from '@vercel/postgres'
import {
    Weapon,
    SuperRegen,
    SustainedBossDamage,
    Abilities,
    SwapBossDamage,
    Build,
    Aspect,
    Fragment,
    Subclass,
    ArtifactPerk,
    MainActivity,
    Activity,
    SubclassVerb,
    ExoticTierListItem,
} from './definitions'
import { to_snake_case } from './utils'

export async function fetchTierList(type: string): Promise<Weapon[]> {
    const validTypes = [
        'Linear Fusion Rifle',
        'Heavy Grenade Launcher',
        'Machine Gun',
        'Rocket Launcher',
        'Sword',
        'Breach Grenade Launcher',
        'Glaive',
        'Fusion Rifle',
        'Rocket Sidearm',
        'Sniper Rifle',
        'Shotgun',
        'Trace Rifle',
    ]

    if (!validTypes.includes(type)) {
        throw new Error(`Invalid weapon type: ${type}`)
    }

    try {
        const { rows } = await db.query(
            `
      SELECT 
        lw.id,
        lw.icon_url,
        lw.name,
        lw.affinity,
        lw.frame,
        lw.reserves,
        lw.rounds_per_min,
        lw.perks_third,
        lw.perks_fourth,
        lw.origin_trait,
        lw.tier,
        tl.rank
      FROM legendary_weapons lw
      JOIN tier_list_${to_snake_case(type)} tl ON lw.id = tl.weapon_id
      ORDER BY tl.rank ASC`
        )

        return rows as Weapon[]
    } catch (error) {
        console.error(`Error fetching ${type} tier list data:`, error)
        throw new Error(`Failed to fetch ${type} tier list data.`)
    }
}

export async function fetchSuperRegenList(): Promise<SuperRegen[]> {
    try {
        const { rows } = await db.query(`SELECT * FROM super_regen`)
        return rows as SuperRegen[]
    } catch (error) {
        console.error('Error fetching super regen data:', error)
        throw new Error('Failed to fetch super regen data.')
    }
}

export async function fetchSustainedBossDamageData(): Promise<
    SustainedBossDamage[]
> {
    try {
        const { rows } = await db.query(
            `SELECT
        ds.*,
        coalesce(ew.icon_url, a.icon_url, lw.icon_url) as icon_url
      FROM dps_sustained ds
      LEFT JOIN abilities a ON ds.ability_id = a.id
      LEFT JOIN exotic_weapons ew ON ds.exotic_weapon_id = ew.id
      LEFT JOIN legendary_weapons lw ON ds.legendary_weapon_id = lw.id
      ORDER BY ds.sustained DESC`
        )
        return rows as SustainedBossDamage[]
    } catch (error) {
        console.error('Error fetching sustained boss damage data:', error)
        throw new Error('Failed to fetch sustained boss damage data.')
    }
}

export async function fetchAbilitiesData(): Promise<Abilities[]> {
    try {
        const { rows } = await db.query(
            `SELECT da.*, a.name, a.type, a.icon_url
       FROM dps_abilities da
       LEFT JOIN abilities a ON da.ability_id = a.id
       ORDER BY da.total_damage DESC`
        )
        return rows as Abilities[]
    } catch (error) {
        console.error('Error fetching abilities data:', error)
        throw new Error('Failed to fetch abilities data.')
    }
}

export async function fetchSwapBossDamageData(): Promise<SwapBossDamage[]> {
    try {
        const { rows } = await db.query(
            `SELECT
        ds.*,
        coalesce(ew.icon_url, a.icon_url, lw.icon_url) as icon_url
      FROM dps_swap ds
      LEFT JOIN abilities a ON ds.ability_id = a.id
      LEFT JOIN exotic_weapons ew ON ds.exotic_weapon_id = ew.id
      LEFT JOIN legendary_weapons lw ON ds.legendary_weapon_id = lw.id
      ORDER BY ds.true_dps DESC`
        )
        return rows as SwapBossDamage[]
    } catch (error) {
        console.error('Error fetching swap boss damage data:', error)
        throw new Error('Failed to fetch swap boss damage data.')
    }
}

export async function fetchBuilds(): Promise<Build[]> {
    try {
        const { rows } = await db.query(`
      SELECT 
        b.*,
        COALESCE(
          json_agg(DISTINCT 
            json_build_object(
              'name', ea.name,
              'icon_url', ea.icon_url
            )::text
          ) FILTER (WHERE ea.name IS NOT NULL),
          '[]'
        )::json as exotic_armor,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', ew.name,
              'icon_url', ew.icon_url
            )::text
          ) FILTER (WHERE ew.name IS NOT NULL),
          '[]'
        )::json as exotic_weapon,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', a.name,
              'icon_url', a.icon_url,
              'type', a.type
            )::text
          ) FILTER (WHERE a.name IS NOT NULL AND a.type = 'Super'),
          '[]'
        )::json as super_ability,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', ac.name,
              'icon_url', ac.icon_url,
              'type', at.name
            )::text
          ) FILTER (WHERE ac.name IS NOT NULL),
          '[]'
        )::json as activities,
        c.name as class,
        sc.name as subclass
      FROM builds b
      LEFT JOIN build_exotic_armor bea ON b.id = bea.build_id
      LEFT JOIN exotic_armor ea ON bea.exotic_armor_id = ea.id
      LEFT JOIN build_exotic_weapons bew ON b.id = bew.build_id
      LEFT JOIN exotic_weapons ew ON bew.exotic_weapon_id = ew.id
      LEFT JOIN build_abilities ba ON b.id = ba.build_id
      LEFT JOIN abilities a ON ba.ability_id = a.id
      LEFT JOIN build_activities bac ON b.id = bac.build_id
      LEFT JOIN activities ac ON bac.activity_id = ac.id
      LEFT JOIN activity_types at ON ac.type_id = at.id
      LEFT JOIN class c ON b.class_id = c.id
      LEFT JOIN subclass sc ON b.subclass_id = sc.id
      GROUP BY b.id, c.name, sc.name
      ORDER BY b.updated_at DESC
    `)
        return rows as Build[]
    } catch (error) {
        console.error('Error fetching builds:', error)
        throw new Error('Failed to fetch builds')
    }
}

export async function fetchAspects(): Promise<Aspect[]> {
    try {
        const { rows } = await db.query(`SELECT * FROM aspects`)
        return rows as Aspect[]
    } catch (error) {
        console.error('Error fetching aspects:', error)
        throw new Error('Failed to fetch aspects')
    }
}

export async function fetchFragments(): Promise<Fragment[]> {
    try {
        const { rows } = await db.query(`SELECT * FROM fragments`)
        return rows as Fragment[]
    } catch (error) {
        console.error('Error fetching fragments:', error)
        throw new Error('Failed to fetch fragments')
    }
}

export async function fetchBuildById(id: string) {
    try {
        const { rows } = await db.query(
            `
      SELECT 
        b.*,
        COALESCE(
          json_agg(DISTINCT 
            json_build_object(
              'name', ea.name,
              'icon_url', ea.icon_url
            )::text
          ) FILTER (WHERE ea.name IS NOT NULL),
          '[]'
        )::json as exotic_armor,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', ew.name,
              'icon_url', ew.icon_url
            )::text
          ) FILTER (WHERE ew.name IS NOT NULL),
          '[]'
        )::json as exotic_weapon,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', ab.name,
              'icon_url', ab.icon_url
            )::text
          ) FILTER (WHERE ab.name IS NOT NULL AND ab.type = 'Super'),
          '[]'
        )::json as super_ability,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', a.name,
              'icon_url', a.icon_url
            )::text
          ) FILTER (WHERE a.name IS NOT NULL),
          '[]'
        )::json as aspects,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', f.name,
              'icon_url', f.icon_url
            )::text
          ) FILTER (WHERE f.name IS NOT NULL),
          '[]'
        )::json as fragments,
        COALESCE(
          json_agg(DISTINCT
            json_build_object(
              'name', ac.name,
              'icon_url', ac.icon_url,
              'type', at.name
            )::text
          ) FILTER (WHERE ac.name IS NOT NULL),
          '[]'
        )::json as activities,
        c.name as class,
        sc.name as subclass
      FROM builds b
      LEFT JOIN build_aspects ba ON b.id = ba.build_id
      LEFT JOIN aspects a ON ba.aspect_id = a.id
      LEFT JOIN build_fragments bf ON b.id = bf.build_id
      LEFT JOIN fragments f ON bf.fragment_id = f.id
      LEFT JOIN build_exotic_armor bea ON b.id = bea.build_id
      LEFT JOIN exotic_armor ea ON bea.exotic_armor_id = ea.id
      LEFT JOIN build_exotic_weapons bew ON b.id = bew.build_id
      LEFT JOIN exotic_weapons ew ON bew.exotic_weapon_id = ew.id
      LEFT JOIN build_abilities bab ON b.id = bab.build_id
      LEFT JOIN abilities ab ON bab.ability_id = ab.id
      LEFT JOIN build_activities bac ON b.id = bac.build_id
      LEFT JOIN activities ac ON bac.activity_id = ac.id
      LEFT JOIN activity_types at ON ac.type_id = at.id
      LEFT JOIN class c ON b.class_id = c.id
      LEFT JOIN subclass sc ON b.subclass_id = sc.id
      WHERE b.id = $1
      GROUP BY b.id, c.name, sc.name
    `,
            [id]
        )
        if (!rows[0]) return null
        return rows[0]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch build')
    }
}

export async function fetchLegendaryWeapons(
    page: number = 1,
    limit: number = 10,
    query: string = ''
) {
    try {
        const offset = (page - 1) * limit

        const countQuery = query
            ? 'SELECT COUNT(*) FROM legendary_weapons WHERE name ILIKE $1'
            : 'SELECT COUNT(*) FROM legendary_weapons'
        const countParams = query ? [`%${query}%`] : []
        const { rows: countResult } = await db.query(countQuery, countParams)

        const dataQuery = query
            ? `SELECT * FROM legendary_weapons 
         WHERE name ILIKE $3
         ORDER BY name ASC 
         LIMIT $1 OFFSET $2`
            : `SELECT * FROM legendary_weapons 
         ORDER BY name ASC 
         LIMIT $1 OFFSET $2`
        const dataParams = query
            ? [limit, offset, `%${query}%`]
            : [limit, offset]
        const { rows } = await db.query(dataQuery, dataParams)

        return {
            weapons: rows,
            total: parseInt(countResult[0].count),
        }
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Failed to fetch legendary weapons')
    }
}

export async function fetchLegendaryWeapon(id: string): Promise<Weapon> {
    try {
        const { rows } = await db.query(
            `SELECT * FROM legendary_weapons WHERE id = $1`,
            [id]
        )
        return rows[0] as Weapon
    } catch (error) {
        console.error('Error fetching legendary weapon:', error)
        throw new Error('Failed to fetch legendary weapon')
    }
}

export async function fetchSubclasses(): Promise<Subclass[]> {
    try {
        const { rows } = await db.query(`SELECT * FROM subclass`)
        return rows as Subclass[]
    } catch (error) {
        console.error('Error fetching subclasses:', error)
        throw new Error('Failed to fetch subclasses')
    }
}

export async function fetchExoticArmor() {
    try {
        const { rows } = await db.query(
            `SELECT * FROM exotic_armor ORDER BY name ASC`
        )
        return rows
    } catch (error) {
        console.error('Error fetching exotic armor:', error)
        throw new Error('Failed to fetch exotic armor')
    }
}

export async function fetchExoticArmorWithTierList(
    page: number = 1,
    limit: number = 10,
    query: string = ''
) {
    try {
        const offset = (page - 1) * limit

        const countQuery = query
            ? 'SELECT COUNT(*) FROM exotic_armor WHERE name ILIKE $1'
            : 'SELECT COUNT(*) FROM exotic_armor'
        const countParams = query ? [`%${query}%`] : []
        const { rows: countResult } = await db.query(countQuery, countParams)

        const dataQuery = query
            ? `SELECT ea.*, 
                    tlea.ad_clear,
                    tlea.champion,
                    tlea.survivability,
                    tlea.movement,
                    tlea.dps,
                    tlea.support
               FROM exotic_armor ea
               LEFT JOIN tier_list_exotic_armor tlea ON ea.id = tlea.exotic_armor_id
               WHERE ea.name ILIKE $3
               ORDER BY ea.name ASC 
               LIMIT $1 OFFSET $2`
            : `SELECT ea.*, 
                    tlea.ad_clear,
                    tlea.champion,
                    tlea.survivability,
                    tlea.movement,
                    tlea.dps,
                    tlea.support
               FROM exotic_armor ea
               LEFT JOIN tier_list_exotic_armor tlea ON ea.id = tlea.exotic_armor_id
               ORDER BY ea.name ASC 
               LIMIT $1 OFFSET $2`
        const dataParams = query
            ? [limit, offset, `%${query}%`]
            : [limit, offset]
        const { rows } = await db.query(dataQuery, dataParams)

        return {
            armor: rows,
            total: parseInt(countResult[0].count),
        }
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Failed to fetch exotic armor')
    }
}

export async function fetchAllExoticArmor() {
    try {
        const { rows } = await db.query(
            `SELECT ea.*, 
                    tlea.ad_clear,
                    tlea.champion,
                    tlea.survivability,
                    tlea.movement,
                    tlea.dps,
                    tlea.support
             FROM exotic_armor ea
             LEFT JOIN tier_list_exotic_armor tlea ON ea.id = tlea.exotic_armor_id
             ORDER BY ea.name ASC`
        )
        return rows
    } catch (error) {
        console.error('Error fetching exotic armor:', error)
        throw new Error('Failed to fetch exotic armor')
    }
}

export async function fetchExoticWeapons(
    page: number = 1,
    limit: number = 10,
    query: string = ''
) {
    try {
        const offset = (page - 1) * limit

        const countQuery = query
            ? 'SELECT COUNT(*) FROM exotic_weapons WHERE name ILIKE $1'
            : 'SELECT COUNT(*) FROM exotic_weapons'
        const countParams = query ? [`%${query}%`] : []
        const { rows: countResult } = await db.query(countQuery, countParams)

        const dataQuery = query
            ? `SELECT ew.*, 
                    tlew.ad_clear,
                    tlew.champion,
                    tlew.survivability,
                    tlew.movement,
                    tlew.dps,
                    tlew.support
               FROM exotic_weapons ew
               LEFT JOIN tier_list_exotic_weapons tlew ON ew.id = tlew.exotic_weapon_id
               WHERE ew.name ILIKE $3
               ORDER BY ew.name ASC 
               LIMIT $1 OFFSET $2`
            : `SELECT ew.*, 
                    tlew.ad_clear,
                    tlew.champion,
                    tlew.survivability,
                    tlew.movement,
                    tlew.dps,
                    tlew.support
               FROM exotic_weapons ew
               LEFT JOIN tier_list_exotic_weapons tlew ON ew.id = tlew.exotic_weapon_id
               ORDER BY ew.name ASC 
               LIMIT $1 OFFSET $2`
        const dataParams = query
            ? [limit, offset, `%${query}%`]
            : [limit, offset]
        const { rows } = await db.query(dataQuery, dataParams)

        return {
            weapons: rows,
            total: parseInt(countResult[0].count),
        }
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Failed to fetch exotic weapons')
    }
}

export async function fetchAllExoticWeapons() {
    try {
        const { rows } = await db.query(
            `SELECT ew.*, 
                    tlew.ad_clear,
                    tlew.champion,
                    tlew.survivability,
                    tlew.movement,
                    tlew.dps,
                    tlew.support
             FROM exotic_weapons ew
             LEFT JOIN tier_list_exotic_weapons tlew ON ew.id = tlew.exotic_weapon_id
             ORDER BY ew.name ASC`
        )
        return rows
    } catch (error) {
        console.error('Error fetching exotic weapons:', error)
        throw new Error('Failed to fetch exotic weapons')
    }
}

export async function fetchExoticTierList(): Promise<ExoticTierListItem[]> {
    try {
        const { rows } = await db.query(
            `SELECT 
                ew.id as exotic_weapon_id,
                ew.name,
                ew.icon_url,
                COALESCE(tlew.ad_clear, 0) as ad_clear,
                COALESCE(tlew.champion, 0) as champions,
                COALESCE(tlew.survivability, 0) as survivability,
                COALESCE(tlew.movement, 0) as movement,
                COALESCE(tlew.dps, 0) as dps,
                COALESCE(tlew.support, 0) as support
             FROM exotic_weapons ew
             LEFT JOIN tier_list_exotic_weapons tlew ON ew.id = tlew.exotic_weapon_id
             WHERE tlew.exotic_weapon_id IS NOT NULL
             ORDER BY ew.name ASC`
        )
        return rows as ExoticTierListItem[]
    } catch (error) {
        console.error('Error fetching exotic tier list:', error)
        throw new Error('Failed to fetch exotic tier list')
    }
}

export async function fetchExoticArmorTierList(): Promise<ExoticTierListItem[]> {
    try {
        const { rows } = await db.query(
            `SELECT 
                ea.id as exotic_armor_id,
                ea.name,
                ea.icon_url,
                COALESCE(tlea.ad_clear, 0) as ad_clear,
                COALESCE(tlea.champion, 0) as champions,
                COALESCE(tlea.survivability, 0) as survivability,
                COALESCE(tlea.movement, 0) as movement,
                COALESCE(tlea.dps, 0) as dps,
                COALESCE(tlea.support, 0) as support
             FROM exotic_armor ea
             LEFT JOIN tier_list_exotic_armor tlea ON ea.id = tlea.exotic_armor_id
             WHERE tlea.exotic_armor_id IS NOT NULL
             ORDER BY ea.name ASC`
        )
        return rows as ExoticTierListItem[]
    } catch (error) {
        console.error('Error fetching exotic armor tier list:', error)
        throw new Error('Failed to fetch exotic armor tier list')
    }
}

export async function fetchSuperAbilities() {
    try {
        const { rows } = await db.query(`SELECT * FROM abilities WHERE type = 'Super' ORDER BY name ASC`)
        return rows
    } catch (error) {
        console.error('Error fetching super abilities:', error)
        throw new Error('Failed to fetch super abilities')
    }
}

export async function fetchSuperAbilitiesByClass(subclass: string, className: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description, class FROM abilities WHERE type = 'Super' AND subclass = $1 AND class = $2 ORDER BY name ASC`,
            [subclass, className]
        )
        return rows
    } catch (error) {
        console.error('Error fetching super abilities:', error)
        throw new Error('Failed to fetch super abilities')
    }
}

export async function fetchActivities(): Promise<MainActivity[]> {
    try {
        // First get all activity types
        const { rows: activityTypes } = await db.query(`
      SELECT id, name, image_url, icon_url
      FROM activity_types
      ORDER BY name
    `)

        // Then get all activities
        const { rows: activities } = await db.query(`
      SELECT id, name, image_url, icon_url, type_id, encounters
      FROM activities
      ORDER BY name
    `)

        // Organize activities by type
        const activitiesByType = activities.reduce(
            (acc, activity) => {
                if (!acc[activity.type_id]) {
                    acc[activity.type_id] = []
                }
                acc[activity.type_id].push(activity)
                return acc
            },
            {} as Record<string, Activity[]>
        )

        // Transform into the expected format
        return activityTypes.map((type) => ({
            id: type.id,
            name: type.name,
            imageUrl: type.image_url,
            iconUrl: type.icon_url || '',
            subActivities:
                activitiesByType[type.id]?.map(
                    (activity: {
                        id: string
                        name: string
                        image_url: string | null
                        icon_url: string | null
                        encounters: string | null
                    }) => ({
                        id: activity.id,
                        name: activity.name,
                        imageUrl: activity.image_url || '',
                        iconUrl: activity.icon_url || '',
                        subActivities: activity.encounters
                            ? activity.encounters
                                  .split(', ')
                                  .map((encounter: string) => ({
                                      id: encounter
                                          .toLowerCase()
                                          .replace(/\s+/g, '-'),
                                      name: encounter,
                                      imageUrl: '',
                                      iconUrl: '',
                                  }))
                            : [],
                    })
                ) || [],
        }))
    } catch (error) {
        console.error('Error fetching activities:', error)
        throw error
    }
}

export async function fetchArtifactPerks(
    season: number
): Promise<ArtifactPerk[]> {
    try {
        const { rows } = await db.query(
            `SELECT * FROM artifact_perks 
       WHERE season = $1 
       ORDER BY column_number, row`,
            [season]
        )
        return rows as ArtifactPerk[]
    } catch (error) {
        console.error('Error fetching artifact perks:', error)
        throw new Error('Failed to fetch artifact perks')
    }
}

export async function fetchSubclassVerbs(
    subclass?: string
): Promise<SubclassVerb[]> {
    try {
        let query = 'SELECT * FROM subclass_verbs'
        const params: string[] = []
        if (subclass) {
            query += ' WHERE subclass = $1'
            params.push(subclass)
        }
        query += ' ORDER BY name ASC'
        const { rows } = await db.query(query, params)
        return rows as SubclassVerb[]
    } catch (error) {
        console.error('Error fetching subclass verbs:', error)
        throw new Error('Failed to fetch subclass verbs')
    }
}

export async function fetchGrenadeAbilities(subclass: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description FROM abilities WHERE type = 'Grenade' AND subclass = $1 ORDER BY name ASC`,
            [subclass]
        )
        return rows
    } catch (error) {
        console.error('Error fetching grenade abilities:', error)
        throw new Error('Failed to fetch grenade abilities')
    }
}

export async function fetchAspectsBySubclassAndClass(
    subclass: string,
    className: string
) {
    try {
        const { rows } = await db.query(
            `SELECT a.* 
             FROM aspects a
             JOIN subclass s ON a.subclass_id = s.id
             JOIN subclass_type st ON s.type_id = st.id
             JOIN class c ON s.class_id = c.id
             WHERE st.name = $1 AND c.name = $2
             ORDER BY a.name ASC`,
            [subclass, className]
        )
        return rows
    } catch (error) {
        console.error('Error fetching aspects:', error)
        throw new Error('Failed to fetch aspects')
    }
}

export async function fetchMeleeAbilities(subclass: string, className: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description, class FROM abilities WHERE type = 'Melee' AND subclass = $1 AND class = $2 ORDER BY name ASC`,
            [subclass, className]
        )
        return rows
    } catch (error) {
        console.error('Error fetching melee abilities:', error)
        throw new Error('Failed to fetch melee abilities')
    }
}

export async function fetchFragmentsBySubclass(subclass: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description FROM fragments WHERE subclass_type = $1 ORDER BY name ASC`,
            [subclass]
        )
        return rows
    } catch (error) {
        console.error('Error fetching fragments by subclass:', error)
        throw new Error('Failed to fetch fragments by subclass')
    }
}

export async function fetchClassAbilitiesByClass(subclass: string, className: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description, class FROM abilities WHERE type = 'Class' AND subclass = $1 AND class = $2 ORDER BY name ASC`,
            [subclass, className]
        )
        return rows
    } catch (error) {
        console.error('Error fetching class abilities:', error)
        throw new Error('Failed to fetch class abilities')
    }
}

export async function fetchGrenadeAbilitiesByClass(subclass: string, className: string) {
    try {
        const { rows } = await db.query(
            `SELECT id, icon_url, name, description, class FROM abilities WHERE type = 'Grenade' AND subclass = $1 AND class = $2 ORDER BY name ASC`,
            [subclass, className]
        )
        return rows
    } catch (error) {
        console.error('Error fetching grenade abilities by class:', error)
        throw new Error('Failed to fetch grenade abilities by class')
    }
}
