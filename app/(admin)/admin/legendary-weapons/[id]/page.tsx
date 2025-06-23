import { fetchLegendaryWeapon } from '@/app/lib/data'
import Image from 'next/image'

type Params = Promise<{
    id: string
}>

export default async function EditWeaponPage({ params }: { params: Params }) {
    const resolvedParams = await params
    const id = resolvedParams.id

    const weapon = await fetchLegendaryWeapon(id)

    return (
        <div className="w-full">
            <h1 className="text-2xl text-white mb-8">
                Edit Weapon: {weapon.name}
            </h1>
            <div className="bg-primary-dark rounded-lg p-6 mb-6">
                <div className="flex items-start gap-6 mb-8">
                    {weapon.icon_url && (
                        <div className="w-24 h-24 flex-shrink-0">
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

                <form action={`/admin/legendary-weapons/${id}/update`} method="POST">
                    <div className="grid grid-cols-2 gap-6">
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
                                defaultValue={weapon.name}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                defaultValue={weapon.type}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Linear Fusion Rifle">
                                    Linear Fusion Rifle
                                </option>
                                <option value="Heavy Grenade Launcher">
                                    Heavy Grenade Launcher
                                </option>
                                <option value="Machine Gun">Machine Gun</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Sword">Sword</option>
                                <option value="Breach Grenade Launcher">
                                    Breach Grenade Launcher
                                </option>
                                <option value="Glaive">Glaive</option>
                                <option value="Fusion Rifle">
                                    Fusion Rifle
                                </option>
                                <option value="Rocket Sidearm">
                                    Rocket Sidearm
                                </option>
                                <option value="Sniper Rifle">
                                    Sniper Rifle
                                </option>
                                <option value="Shotgun">Shotgun</option>
                                <option value="Trace Rifle">Trace Rifle</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="affinity"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Affinity
                            </label>
                            <select
                                id="affinity"
                                name="affinity"
                                defaultValue={weapon.affinity}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Arc">Arc</option>
                                <option value="Solar">Solar</option>
                                <option value="Void">Void</option>
                                <option value="Stasis">Stasis</option>
                                <option value="Strand">Strand</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="frame"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Frame
                            </label>
                            <input
                                type="text"
                                id="frame"
                                name="frame"
                                defaultValue={weapon.frame}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="enhanceable"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Enhanceable
                            </label>
                            <select
                                id="enhanceable"
                                name="enhanceable"
                                defaultValue={
                                    weapon.enhanceable ? 'true' : 'false'
                                }
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="reserves"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Reserves
                            </label>
                            <input
                                type="number"
                                id="reserves"
                                name="reserves"
                                defaultValue={weapon.reserves}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="perk_one"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Perk One
                            </label>
                            <input
                                type="text"
                                id="perk_one"
                                name="perk_one"
                                defaultValue={weapon.perk_one}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="perk_two"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Perk Two
                            </label>
                            <input
                                type="text"
                                id="perk_two"
                                name="perk_two"
                                defaultValue={weapon.perk_two}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="origin_trait"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Origin Trait
                            </label>
                            <input
                                type="text"
                                id="origin_trait"
                                name="origin_trait"
                                defaultValue={weapon.origin_trait}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="tier"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Tier
                            </label>
                            <select
                                id="tier"
                                name="tier"
                                defaultValue={weapon.tier}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="S">S</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="icon_url"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Icon URL
                            </label>
                            <input
                                type="text"
                                id="icon_url"
                                name="icon_url"
                                defaultValue={weapon.icon_url || ''}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter icon URL"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="rank"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Rank
                            </label>
                            <input
                                type="number"
                                id="rank"
                                name="rank"
                                defaultValue={weapon.rank}
                                className="w-full px-3 py-2 bg-primary-light text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Weapon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
