import { fetchAllExoticWeapons } from '@/app/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Params {
    params: Promise<{ id: string }>
}

export default async function EditExoticWeaponPage({ params }: Params) {
    const { id } = await params
    const weapons = await fetchAllExoticWeapons()
    const weapon = weapons.find(w => w.id === id)

    if (!weapon) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Edit Exotic Weapon</h1>
                <p className="text-gray-400">Update the details for {weapon.name}</p>
            </div>

            <form action={`/admin/exotic-weapons/${id}/update`} method="POST" className="space-y-8">
                {/* Basic Information Section */}
                <div className="bg-primary-dark rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={weapon.name}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="icon_url" className="block text-sm font-medium text-gray-400 mb-2">
                                Icon URL
                            </label>
                            <input
                                type="url"
                                id="icon_url"
                                name="icon_url"
                                defaultValue={weapon.icon_url}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={weapon.description || ''}
                            className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 resize-vertical"
                            placeholder="Enter weapon description..."
                        />
                    </div>

                    {weapon.icon_url && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Current Icon
                            </label>
                            <Image
                                src={weapon.icon_url}
                                alt={weapon.name}
                                width={96}
                                height={96}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>

                {/* Tier List Section */}
                <div className="bg-primary-dark rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Tier List Ratings</h2>
                    <p className="text-gray-400 mb-6">Rate this weapon from 1-5 in each category</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="ad_clear" className="block text-sm font-medium text-gray-400 mb-2">
                                ad clear / general roam content
                            </label>
                            <input
                                type="number"
                                id="ad_clear"
                                name="ad_clear"
                                min="1"
                                max="5"
                                defaultValue={weapon.ad_clear || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="champions" className="block text-sm font-medium text-gray-400 mb-2">
                                Champions
                            </label>
                            <input
                                type="number"
                                id="champions"
                                name="champions"
                                min="1"
                                max="5"
                                defaultValue={weapon.champions || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="survivability" className="block text-sm font-medium text-gray-400 mb-2">
                                Survivability
                            </label>
                            <input
                                type="number"
                                id="survivability"
                                name="survivability"
                                min="1"
                                max="5"
                                defaultValue={weapon.survivability || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="movement" className="block text-sm font-medium text-gray-400 mb-2">
                                Movement
                            </label>
                            <input
                                type="number"
                                id="movement"
                                name="movement"
                                min="1"
                                max="5"
                                defaultValue={weapon.movement || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="dps" className="block text-sm font-medium text-gray-400 mb-2">
                                DPS
                            </label>
                            <input
                                type="number"
                                id="dps"
                                name="dps"
                                min="1"
                                max="5"
                                defaultValue={weapon.dps || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="support" className="block text-sm font-medium text-gray-400 mb-2">
                                Support
                            </label>
                            <input
                                type="number"
                                id="support"
                                name="support"
                                min="1"
                                max="5"
                                defaultValue={weapon.support || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="1-5"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update Weapon
                    </button>
                    <Link
                        href="/admin/exotic-weapons"
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
} 