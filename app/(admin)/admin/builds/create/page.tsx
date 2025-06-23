import { createBuild } from '@/app/lib/admin-actions'
import {
    fetchSubclasses,
    fetchExoticArmor,
    fetchAllExoticWeapons,
    fetchSuperAbilities,
    fetchActivities,
    fetchAspects,
    fetchFragments,
} from '@/app/lib/data'
import { redirect } from 'next/navigation'

export default async function CreateBuildPage() {
    const subclasses = await fetchSubclasses()
    const exoticArmor = await fetchExoticArmor()
    const exoticWeapons = await fetchAllExoticWeapons()
    const superAbilities = await fetchSuperAbilities()
    const activities = await fetchActivities()
    const aspects = await fetchAspects()
    const fragments = await fetchFragments()

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
                                required
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter build name"
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
                                rows={3}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter build description"
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
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter background image URL"
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
                            <label
                                htmlFor="subclass"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
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
                                    <option
                                        key={subclass.id}
                                        value={subclass.name}
                                    >
                                        {subclass.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="exotic_armor"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Exotic Armor
                            </label>
                            <select
                                id="exotic_armor"
                                name="exotic_armor"
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Select exotic armor (optional)
                                </option>
                                {exoticArmor.map((armor) => (
                                    <option key={armor.id} value={armor.id}>
                                        {armor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="exotic_weapon"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Exotic Weapon
                            </label>
                            <select
                                id="exotic_weapon"
                                name="exotic_weapon"
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Select exotic weapon (optional)
                                </option>
                                {exoticWeapons.map((weapon) => (
                                    <option key={weapon.id} value={weapon.id}>
                                        {weapon.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="super_ability"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Super Ability
                            </label>
                            <select
                                id="super_ability"
                                name="super_ability"
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Select super ability (optional)
                                </option>
                                {superAbilities.map((ability) => (
                                    <option key={ability.id} value={ability.id}>
                                        {ability.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4">
                                Activities
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {activities.map((activity) => (
                                    <label
                                        key={activity.id}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="checkbox"
                                            name="activities"
                                            value={activity.id}
                                            className="h-4 w-4 rounded border-gray-700 bg-primary-light text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-white">
                                            {activity.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4">
                                Aspects
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {aspects.map((aspect) => (
                                    <label
                                        key={aspect.id}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="checkbox"
                                            name="aspects"
                                            value={aspect.id}
                                            className="h-4 w-4 rounded border-gray-700 bg-primary-light text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-white">
                                            {aspect.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4">
                                Fragments
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {fragments.map((fragment) => (
                                    <label
                                        key={fragment.id}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="checkbox"
                                            name="fragments"
                                            value={fragment.id}
                                            className="h-4 w-4 rounded border-gray-700 bg-primary-light text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-white">
                                            {fragment.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
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
