import { redirect } from 'next/navigation'
import { db } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { Build } from './definitions'
import { to_snake_case } from './utils'

export async function navigateToEdit(formData: FormData) {
  const id = formData.get('id') as string
  redirect(`/admin/legendary_weapons/${id}`)
}

export async function navigateToCreate() {
  redirect('/admin/legendary_weapons/create')
}

export async function updateWeaponIconUrl(weaponId: string, iconUrl: string) {
  try {
    await db.query(`UPDATE legendary_weapons SET icon_url = $1 WHERE id = $2`, [
      iconUrl,
      weaponId,
    ])
    revalidatePath(`/admin/legendary_weapons/${weaponId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating weapon icon URL:', error)
    return { success: false, error: 'Failed to update weapon icon URL' }
  }
}

export async function updateBuild(build: Build) {
  try {
    await db.query('BEGIN')

    await db.query(
      `UPDATE builds 
       SET name = $1, 
           description = $2, 
           background_image = $3, 
           class_id = (SELECT id FROM class WHERE name = $4), 
           subclass_id = (SELECT id FROM subclass WHERE name = $5) 
       WHERE id = $6`,
      [
        build.name,
        build.description,
        build.background_image,
        build.class,
        build.subclass,
        build.id,
      ]
    )

    if (build.exotic_armor_id) {
      await db.query(
        `DELETE FROM build_exotic_armor WHERE build_id = $1`,
        [build.id]
      )
      await db.query(
        `INSERT INTO build_exotic_armor (build_id, exotic_armor_id) VALUES ($1, $2)`,
        [build.id, build.exotic_armor_id]
      )
    }

    if (build.exotic_weapon_id) {
      await db.query(
        `DELETE FROM build_exotic_weapons WHERE build_id = $1`,
        [build.id]
      )
      await db.query(
        `INSERT INTO build_exotic_weapons (build_id, exotic_weapon_id) VALUES ($1, $2)`,
        [build.id, build.exotic_weapon_id]
      )
    }

    if (build.super_ability_id) {
      await db.query(
        `DELETE FROM build_abilities WHERE build_id = $1 AND ability_id IN (
          SELECT id FROM abilities WHERE type = 'Super'
        )`,
        [build.id]
      )
      await db.query(
        `INSERT INTO build_abilities (build_id, ability_id) VALUES ($1, $2)`,
        [build.id, build.super_ability_id]
      )
    }

    if (build.activity_ids && build.activity_ids.length > 0) {
      await db.query(`DELETE FROM build_activities WHERE build_id = $1`, [build.id])
      
      const placeholders = build.activity_ids.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_activities (build_id, activity_id) VALUES ${placeholders}`,
        [build.id, ...build.activity_ids]
      )
    }

    if (build.aspect_ids && build.aspect_ids.length > 0) {
      await db.query(`DELETE FROM build_aspects WHERE build_id = $1`, [build.id])
      
      const aspectPlaceholders = build.aspect_ids.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_aspects (build_id, aspect_id) VALUES ${aspectPlaceholders}`,
        [build.id, ...build.aspect_ids]
      )
    }

    if (build.fragment_ids && build.fragment_ids.length > 0) {
      await db.query(`DELETE FROM build_fragments WHERE build_id = $1`, [build.id])
      
      const fragmentPlaceholders = build.fragment_ids.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_fragments (build_id, fragment_id) VALUES ${fragmentPlaceholders}`,
        [build.id, ...build.fragment_ids]
      )
    }

    await db.query('COMMIT')
    revalidatePath(`/admin/builds/${build.id}`)
    return { success: true }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error updating build:', error)
    return { success: false, error: 'Failed to update build' }
  }
}

export async function createBuild(formData: FormData) {
  try {
    await db.query('BEGIN')
    
    const { rows } = await db.query(
      `INSERT INTO builds (
        name,
        description,
        background_image,
        class_id,
        subclass_id
      ) VALUES (
        $1,
        $2,
        $3,
        (SELECT id FROM class WHERE name = $4),
        (SELECT id FROM subclass WHERE name = $5)
      ) RETURNING id`,
      [
        formData.get('name'),
        formData.get('description'),
        formData.get('background_image'),
        formData.get('class'),
        formData.get('subclass'),
      ]
    )
    
    const buildId = rows[0].id
    
    const exoticArmorId = formData.get('exotic_armor')
    if (exoticArmorId) {
      await db.query(
        `INSERT INTO build_exotic_armor (build_id, exotic_armor_id) VALUES ($1, $2)`,
        [buildId, exoticArmorId]
      )
    }

    const exoticWeaponId = formData.get('exotic_weapon')
    if (exoticWeaponId) {
      await db.query(
        `INSERT INTO build_exotic_weapons (build_id, exotic_weapon_id) VALUES ($1, $2)`,
        [buildId, exoticWeaponId]
      )
    }

    const superAbilityId = formData.get('super_ability')
    if (superAbilityId) {
      await db.query(
        `INSERT INTO build_abilities (build_id, ability_id) VALUES ($1, $2)`,
        [buildId, superAbilityId]
      )
    }

    const activityIds = formData.getAll('activities')
    if (activityIds.length > 0) {
      const placeholders = activityIds.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_activities (build_id, activity_id) VALUES ${placeholders}`,
        [buildId, ...activityIds]
      )
    }

    const aspectIds = formData.getAll('aspects')
    if (aspectIds.length > 0) {
      const aspectPlaceholders = aspectIds.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_aspects (build_id, aspect_id) VALUES ${aspectPlaceholders}`,
        [buildId, ...aspectIds]
      )
    }

    const fragmentIds = formData.getAll('fragments')
    if (fragmentIds.length > 0) {
      const fragmentPlaceholders = fragmentIds.map((_, i) => `($1, $${i + 2})`).join(',')
      await db.query(
        `INSERT INTO build_fragments (build_id, fragment_id) VALUES ${fragmentPlaceholders}`,
        [buildId, ...fragmentIds]
      )
    }
    
    await db.query('COMMIT')
    
    revalidatePath('/admin/builds')
    return { success: true, id: buildId }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error creating build:', error)
    return { success: false, error: 'Failed to create build' }
  }
}

export async function createLegendaryWeapon(formData: FormData) {
  try {
    await db.query('BEGIN')

    const { rows } = await db.query(
      `INSERT INTO legendary_weapons (
        name,
        affinity,
        frame,
        enhanceable,
        reserves,
        perk_one,
        perk_two,
        origin_trait,
        icon_url,
        type,
        tier
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      ) RETURNING id`,
      [
        formData.get('name'),
        formData.get('affinity'),
        formData.get('frame'),
        formData.get('enhanceable'),
        formData.get('reserves'),
        formData.get('perk_one'),
        formData.get('perk_two'),
        formData.get('origin_trait'),
        formData.get('icon_url'),
        formData.get('type'),
        formData.get('tier')
      ]
    )

    const weaponId = rows[0].id
    const type = formData.get('type') as string
    const rank = parseInt(formData.get('rank') as string)

    // Shift existing weapons down to make room for the new rank
    await db.query(
      `UPDATE tier_list_${to_snake_case(type)} 
       SET rank = rank + 1 
       WHERE rank >= $1`,
      [rank]
    )

    // Insert the new weapon's ranking
    await db.query(
      `INSERT INTO tier_list_${to_snake_case(type)} (weapon_id, rank) 
       VALUES ($1, $2)`,
      [weaponId, rank]
    )

    await db.query('COMMIT')
    revalidatePath('/admin/legendary_weapons')
    return { success: true, id: weaponId }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error creating legendary weapon:', error)
    return { success: false, error: 'Failed to create legendary weapon' }
  }
}

export async function updateLegendaryWeapon(id: string, formData: FormData) {
  try {
    await db.query('BEGIN')

    // Get the old weapon type for comparison
    const { rows: [oldWeapon] } = await db.query(
      `SELECT type FROM legendary_weapons WHERE id = $1`,
      [id]
    )

    // Update the weapon details
    await db.query(
      `UPDATE legendary_weapons 
       SET name = $1,
           affinity = $2,
           frame = $3,
           enhanceable = $4,
           reserves = $5,
           perk_one = $6,
           perk_two = $7,
           origin_trait = $8,
           icon_url = $9,
           type = $10,
           tier = $11
       WHERE id = $12`,
      [
        formData.get('name'),
        formData.get('affinity'),
        formData.get('frame'),
        formData.get('enhanceable') === 'true',
        parseInt(formData.get('reserves') as string),
        formData.get('perk_one'),
        formData.get('perk_two'),
        formData.get('origin_trait'),
        formData.get('icon_url'),
        formData.get('type'),
        formData.get('tier'),
        id
      ]
    )

    const newType = formData.get('type') as string
    const newRank = parseInt(formData.get('rank') as string)

    // If the type has changed, we need to move the weapon to a different tier list
    if (oldWeapon.type !== newType) {
      // Remove from old tier list
      await db.query(
        `DELETE FROM tier_list_${to_snake_case(oldWeapon.type)} 
         WHERE weapon_id = $1`,
        [id]
      )

      // Make room in the new tier list
      await db.query(
        `UPDATE tier_list_${to_snake_case(newType)} 
         SET rank = rank + 1 
         WHERE rank >= $1`,
        [newRank]
      )

      // Insert into new tier list
      await db.query(
        `INSERT INTO tier_list_${to_snake_case(newType)} (weapon_id, rank) 
         VALUES ($1, $2)`,
        [id, newRank]
      )
    } else {
      // Just update the rank in the current tier list
      const { rows: [currentRank] } = await db.query(
        `SELECT rank FROM tier_list_${to_snake_case(newType)} WHERE weapon_id = $1`,
        [id]
      )

      if (currentRank.rank !== newRank) {
        if (currentRank.rank < newRank) {
          // Moving down in rank, shift others up
          await db.query(
            `UPDATE tier_list_${to_snake_case(newType)} 
             SET rank = rank - 1 
             WHERE rank > $1 AND rank <= $2`,
            [currentRank.rank, newRank]
          )
        } else {
          // Moving up in rank, shift others down
          await db.query(
            `UPDATE tier_list_${to_snake_case(newType)} 
             SET rank = rank + 1 
             WHERE rank >= $1 AND rank < $2`,
            [newRank, currentRank.rank]
          )
        }

        // Update the weapon's rank
        await db.query(
          `UPDATE tier_list_${to_snake_case(newType)} 
           SET rank = $1 
           WHERE weapon_id = $2`,
          [newRank, id]
        )
      }
    }

    await db.query('COMMIT')
    revalidatePath(`/admin/legendary_weapons/${id}`)
    revalidatePath('/admin/legendary_weapons')
    return { success: true }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error updating legendary weapon:', error)
    return { success: false, error: 'Failed to update legendary weapon' }
  }
}

