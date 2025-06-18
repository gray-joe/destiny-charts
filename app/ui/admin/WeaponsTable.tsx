import { Weapon } from '@/app/lib/definitions'
import { WeaponActions } from '@/app/ui/admin/Button'

export default function WeaponsTable({ weapons }: { weapons: Weapon[] }) {
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
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 text-left text-sm font-semibold text-white"
                                    >
                                        Type
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
                                        key={weapon.id}
                                        className="hover:bg-primary-dark/50"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4 text-white">
                                            {weapon.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-white">
                                            {weapon.type}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <WeaponActions id={weapon.id} />
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
