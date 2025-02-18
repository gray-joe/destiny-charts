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
    await db.query(
      `UPDATE builds SET name = $1, description = $2, background_image = $3, class_id = (SELECT id FROM class WHERE name = $4), subclass_id = (SELECT id FROM subclass WHERE name = $5) WHERE id = $6`,
      [
        build.name,
        build.description,
        build.background_image,
        build.class,
        build.subclass,
        build.id,
      ]
    )
    revalidatePath(`/admin/builds/${build.id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating build:', error)
    return { success: false, error: 'Failed to update build' }
  }
}
