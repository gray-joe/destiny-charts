import { ExoticArmor } from '@/app/lib/definitions'
import Link from 'next/link'
import Image from 'next/image'

export default function ExoticArmorTable({ armor, basePath }: { armor: ExoticArmor[], basePath: string }) {
    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-primary-dark p-2 md:pt-0">
                        <table className="min-w-full rounded-md text-white">
                            <thead className="rounded-md bg-primary-dark text-left text-sm font-normal">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 font-medium"
                                    >
                                        Icon
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 font-medium"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-5 font-medium"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {armor.map((armorItem) => (
                                    <tr
                                        key={armorItem.name}
                                        className="hover:bg-primary-dark/50"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4">
                                            {armorItem.icon_url && (
                                                <Image
                                                    src={armorItem.icon_url}
                                                    alt={armorItem.name}
                                                    className="h-8 w-8 rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-white">
                                            {armorItem.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <Link
                                                href={`${basePath}/${armorItem.id}`}
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