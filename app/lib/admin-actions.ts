import { redirect } from 'next/navigation'
import { db } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { Build } from './definitions'

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
    
    await db.query('COMMIT')
    
    revalidatePath('/admin/builds')
    return { success: true, id: buildId }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Error creating build:', error)
    return { success: false, error: 'Failed to create build' }
  }
}
