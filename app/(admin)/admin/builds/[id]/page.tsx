import { fetchBuildById } from '@/app/lib/data'
import { updateBuild } from '@/app/lib/admin-actions'
import { fetchSubclasses, fetchExoticArmor, fetchExoticWeapons, fetchSuperAbilities, fetchActivities } from '@/app/lib/data'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import { Activity } from '@/app/lib/definitions'

type Params = Promise<{
  id: string
}>

export default async function EditBuildPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const build = await fetchBuildById(id)
  const subclasses = await fetchSubclasses()
  const exoticArmor = await fetchExoticArmor()
  const exoticWeapons = await fetchExoticWeapons()
  const superAbilities = await fetchSuperAbilities()
  const activities = await fetchActivities()

  if (!build) {
    return <div>Build not found</div>
  }

  const classes = ['Hunter', 'Titan', 'Warlock']
  const subclassesNames = subclasses.map((subclass) => subclass.name)
  const currentActivityIds = build.activities?.map((activity: Activity) => activity.id) || []

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">Build Details: {build.name}</h1>
      <div className="bg-primary-dark rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          {build.background_image && (
            <div className="w-24 h-24 flex-shrink-0">
              <Image
                src={build.background_image}
                alt={build.name || 'Build background'}
                width={96}
                height={96}
                className="rounded-lg"
              />
            </div>
          )}

          <div className="flex-grow">
            <form
              action={async (formData: FormData) => {
                'use server'
                const name = formData.get('name') as string
                const description = formData.get('description') as string
                const background_image = formData.get('background_image') as string
                const class_name = formData.get('class') as string
                const subclass_name = formData.get('subclass') as string
                const exotic_armor_id = formData.get('exotic_armor') as string
                const exotic_weapon_id = formData.get('exotic_weapon') as string
                const super_ability_id = formData.get('super_ability') as string
                const activity_ids = formData.getAll('activities') as string[]

                await updateBuild({
                  id,
                  name,
                  description,
                  background_image,
                  class: class_name,
                  subclass: subclass_name,
                  exotic_armor_id,
                  exotic_weapon_id,
                  super_ability_id,
                  activity_ids,
                  updated_at: '',
                  activities: [],
                  exotic_armor: [],
                  exotic_weapon: [],
                  legendary_weapons: '',
                  aspects: [],
                  fragments: [],
                  super_ability: [],
                })

                revalidatePath('/admin/builds')
                revalidatePath(`/admin/builds/${id}`)
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={build.name || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={build.description || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label
                    htmlFor="background_image"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    id="background_image"
                    name="background_image"
                    defaultValue={build.background_image || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Class
                  </label>
                  <select
                    id="class"
                    name="class"
                    defaultValue={build.class || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a class</option>
                    {classes.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subclass"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Subclass
                  </label>
                  <select
                    id="subclass"
                    name="subclass"
                    defaultValue={build.subclass || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a subclass</option>
                    {subclassesNames.map((subclassName) => (
                      <option key={subclassName} value={subclassName}>
                        {subclassName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="exotic_armor" className="block text-sm font-medium text-gray-400 mb-2">
                    Exotic Armor
                  </label>
                  <select
                    id="exotic_armor"
                    name="exotic_armor"
                    defaultValue={build.exotic_armor?.[0]?.id || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select exotic armor (optional)</option>
                    {exoticArmor.map((armor) => (
                      <option key={armor.id} value={armor.id}>
                        {armor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="exotic_weapon" className="block text-sm font-medium text-gray-400 mb-2">
                    Exotic Weapon
                  </label>
                  <select
                    id="exotic_weapon"
                    name="exotic_weapon"
                    defaultValue={build.exotic_weapon?.[0]?.id || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select exotic weapon (optional)</option>
                    {exoticWeapons.map((weapon) => (
                      <option key={weapon.id} value={weapon.id}>
                        {weapon.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="super_ability" className="block text-sm font-medium text-gray-400 mb-2">
                    Super Ability
                  </label>
                  <select
                    id="super_ability"
                    name="super_ability"
                    defaultValue={build.super_ability?.[0]?.id || ''}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select super ability (optional)</option>
                    {superAbilities.map((ability) => (
                      <option key={ability.id} value={ability.id}>
                        {ability.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="activities" className="block text-sm font-medium text-gray-400 mb-2">
                    Activities
                  </label>
                  <select
                    id="activities"
                    name="activities"
                    multiple
                    defaultValue={currentActivityIds}
                    className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                    size={5}
                  >
                    {activities.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-400">Hold Ctrl/Cmd to select multiple activities</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Build
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
