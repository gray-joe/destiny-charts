import { createBuild } from '@/app/lib/admin-actions'
import { fetchSubclasses, fetchExoticArmor, fetchExoticWeapons, fetchSuperAbilities, fetchActivities } from '@/app/lib/data'
import { redirect } from 'next/navigation'

export default async function CreateBuildPage() {
  const subclasses = await fetchSubclasses()
  const exoticArmor = await fetchExoticArmor()
  const exoticWeapons = await fetchExoticWeapons()
  const superAbilities = await fetchSuperAbilities()
  const activities = await fetchActivities()
  
  async function create(formData: FormData) {
    'use server'
    const result = await createBuild(formData)
    if (result.success) {
      redirect(`/admin/builds/${result.id}`)
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">Create New Build</h1>
      <div className="bg-primary-dark rounded-lg p-6">
        <form action={create}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter build name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter build description"
              />
            </div>

            <div>
              <label htmlFor="background_image" className="block text-sm font-medium text-gray-400 mb-2">
                Background Image URL
              </label>
              <input
                type="text"
                id="background_image"
                name="background_image"
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter background image URL"
              />
            </div>

            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-400 mb-2">
                Class
              </label>
              <select
                id="class"
                name="class"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a class</option>
                <option value="Hunter">Hunter</option>
                <option value="Titan">Titan</option>
                <option value="Warlock">Warlock</option>
              </select>
            </div>

            <div>
              <label htmlFor="subclass" className="block text-sm font-medium text-gray-400 mb-2">
                Subclass
              </label>
              <select
                id="subclass"
                name="subclass"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a subclass</option>
                {subclasses.map((subclass) => (
                  <option key={subclass.id} value={subclass.name}>
                    {subclass.name}
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Build
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 