import { ExoticWeapon } from '@/app/lib/definitions'
import Link from 'next/link'
import Image from 'next/image'

export default function ExoticWeaponsTable({ weapons }: { weapons: ExoticWeapon[] }) {
    return (
        <div className="mt-6 low-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-primary-dark p-2">
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className="bg-primary-dark">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 text-left text-sm font-semibold text-white"
                                    >
                                        Icon
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 text-left text-sm font-semibold text-white"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3 pl-4 pr-3"
                                    >
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {weapons.map((weapon) => (
                                    <tr
                                        key={weapon.name}
                                        className="hover:bg-primary-dark/50"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4">
                                            {weapon.icon_url && (
                                                <Image
                                                    src={weapon.icon_url}
                                                    alt={weapon.name}
                                                    className="h-8 w-8 rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-white">
                                            {weapon.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <Link
                                                href={`/admin/exotic-weapons/${weapon.id}`}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 