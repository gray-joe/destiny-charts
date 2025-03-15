import { createLegendaryWeapon } from '@/app/lib/admin-actions'
import { redirect } from 'next/navigation'

export default async function CreateLegendaryWeaponPage() {
  async function create(formData: FormData) {
    'use server'
    const result = await createLegendaryWeapon(formData)
    if (result.success) {
      redirect(`/admin/legendary_weapons/${result.id}`)
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white mb-8">Create New Legendary Weapon</h1>
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
                placeholder="Enter weapon name"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-2">
                Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select weapon type</option>
                <option value="Linear Fusion Rifle">Linear Fusion Rifle</option>
                <option value="Heavy Grenade Launcher">Heavy Grenade Launcher</option>
                <option value="Machine Gun">Machine Gun</option>
                <option value="Rocket">Rocket</option>
                <option value="Sword">Sword</option>
                <option value="Breach Grenade Launcher">Breach Grenade Launcher</option>
                <option value="Glaive">Glaive</option>
                <option value="Fusion Rifle">Fusion Rifle</option>
                <option value="Rocket Sidearm">Rocket Sidearm</option>
                <option value="Sniper Rifle">Sniper Rifle</option>
                <option value="Shotgun">Shotgun</option>
                <option value="Trace Rifle">Trace Rifle</option>
              </select>
            </div>

            <div>
              <label htmlFor="affinity" className="block text-sm font-medium text-gray-400 mb-2">
                Affinity
              </label>
              <select
                id="affinity"
                name="affinity"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select affinity</option>
                <option value="Kinetic">Kinetic</option>
                <option value="Stasis">Stasis</option>
                <option value="Strand">Strand</option>
                <option value="Arc">Arc</option>
                <option value="Solar">Solar</option>
                <option value="Void">Void</option>
              </select>
            </div>

            <div>
              <label htmlFor="frame" className="block text-sm font-medium text-gray-400 mb-2">
                Frame
              </label>
              <input
                type="text"
                id="frame"
                name="frame"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter frame type"
              />
            </div>

            <div>
              <label htmlFor="enhanceable" className="block text-sm font-medium text-gray-400 mb-2">
                Enhanceable
              </label>
              <select
                id="enhanceable"
                name="enhanceable"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select enhanceable status</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label htmlFor="reserves" className="block text-sm font-medium text-gray-400 mb-2">
                Reserves
              </label>
              <input
                type="number"
                id="reserves"
                name="reserves"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter reserves amount"
              />
            </div>

            <div>
              <label htmlFor="perk_one" className="block text-sm font-medium text-gray-400 mb-2">
                Perk One
              </label>
              <input
                type="text"
                id="perk_one"
                name="perk_one"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter perk one"
              />
            </div>

            <div>
              <label htmlFor="perk_two" className="block text-sm font-medium text-gray-400 mb-2">
                Perk Two
              </label>
              <input
                type="text"
                id="perk_two"
                name="perk_two"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter perk two"
              />
            </div>

            <div>
              <label htmlFor="origin_trait" className="block text-sm font-medium text-gray-400 mb-2">
                Origin Trait
              </label>
              <input
                type="text"
                id="origin_trait"
                name="origin_trait"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter origin trait"
              />
            </div>

            <div>
              <label htmlFor="icon_url" className="block text-sm font-medium text-gray-400 mb-2">
                Icon URL
              </label>
              <input
                type="text"
                id="icon_url"
                name="icon_url"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter icon URL"
              />
            </div>

            <div>
              <label htmlFor="tier" className="block text-sm font-medium text-gray-400 mb-2">
                Tier
              </label>
              <select
                id="tier"
                name="tier"
                required
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select tier</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>

            <div>
              <label htmlFor="rank" className="block text-sm font-medium text-gray-400 mb-2">
                Rank in Type
              </label>
              <input
                type="number"
                id="rank"
                name="rank"
                required
                min="0"
                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter rank"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Weapon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 