'use client'

import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/Search'
import { useState } from 'react'
import { Weapon } from '@/app/lib/definitions'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function parsePerks(perks: string[] | string | null | undefined): string[] {
    if (Array.isArray(perks)) {
        return perks;
    }
    if (typeof perks === 'string') {
        try {
            return JSON.parse(perks);
        } catch {
            const cleaned = perks.replace(/^\{|\}$/g, '');
            if (cleaned) {
                return cleaned.split(',').map(item => {
                    return item.replace(/^["']|["']$/g, '').trim();
                }).filter(item => item.length > 0);
            }
            return [perks];
        }
    }
    return [];
}

export default function WeaponsTable({ weapons }: { weapons: Weapon[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAllColumns, setShowAllColumns] = useState(false)

    const filteredWeapons = weapons.filter((weapon) => {
        const searchFields = [
            weapon.name,
            weapon.affinity,
            weapon.frame,
            weapon.origin_trait,
        ]

        const thirdPerks = parsePerks(weapon.perks_third).join(' ')
        const fourthPerks = parsePerks(weapon.perks_fourth).join(' ')

        const allSearchFields = [
            ...searchFields,
            thirdPerks,
            fourthPerks,
        ]

        return allSearchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const columns = [
        { key: 'rank', label: 'Tier', always: true, className: 'whitespace-nowrap' },
        { key: 'tier', label: 'Rank', always: true, className: 'whitespace-nowrap font-bold' },
        { key: 'icon_url', label: 'Icon', always: true, className: 'whitespace-nowrap' },
        { key: 'name', label: 'Name', always: true, className: 'whitespace-nowrap' },
        { key: 'affinity', label: 'Affinity', always: true, className: 'whitespace-nowrap' },
        { key: 'frame', label: 'Frame', always: true, className: 'whitespace-nowrap' },
        { key: 'rounds_per_min', label: 'Rounds per Min', always: false, className: 'whitespace-nowrap' },
        { key: 'perks_third', label: 'Third Column Perks', always: false, className: '' },
        { key: 'perks_fourth', label: 'Fourth Column Perks', always: false, className: '' },
        { key: 'origin_trait', label: 'Origin Trait', always: false, className: 'whitespace-nowrap' },
    ]

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`${lusitana.className} text-xl md:text-2xl text-white`}
                >
                    Tier List
                </h1>
                <button
                    onClick={() => setShowAllColumns(!showAllColumns)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-light rounded-md hover:bg-primary-hover"
                >
                    {showAllColumns ? (
                        <>
                            <EyeSlashIcon className="h-5 w-5" />
                            Hide Details
                        </>
                    ) : (
                        <>
                            <EyeIcon className="h-5 w-5" />
                            Show Details
                        </>
                    )}
                </button>
            </div>
            <Search
                placeholder="Search weapons by name, affinity, frame, perk, origin trait..."
                onSearch={setSearchTerm}
            />
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-primary-dark p-2 md:pt-0">
                            <table className="min-w-full rounded-md text-white">
                                <thead className="rounded-md bg-primary-dark text-left text-sm font-normal">
                                    <tr>
                                        {columns.map(
                                            (column) =>
                                                (column.always ||
                                                    showAllColumns) && (
                                                    <th
                                                        key={column.key}
                                                        scope="col"
                                                        className={`px-3 py-5 font-medium ${column.className}`}
                                                    >
                                                        {column.label}
                                                    </th>
                                                )
                                        )}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-primary-light text-white">
                                    {filteredWeapons.map((weapon) => (
                                        <tr
                                            key={weapon.id}
                                            className={`group hover:bg-primary-hover ${getTierBackgroundColor(
                                                weapon.tier
                                            )}`}
                                        >
                                            {columns.map((column) => {
                                                if (
                                                    !column.always &&
                                                    !showAllColumns
                                                )
                                                    return null

                                                const value = weapon[column.key as keyof Weapon]

                                                return (
                                                    <td
                                                        key={column.key}
                                                        className={`px-3 py-5 text-sm ${column.className}`}
                                                    >
                                                        {column.key === 'icon_url' ? (
                                                            value ? (
                                                                <Image
                                                                    src={value as string}
                                                                    alt={weapon.name}
                                                                    width={48}
                                                                    height={48}
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 bg-primary-light" />
                                                            )
                                                        ) : column.key === 'perks_third' || column.key === 'perks_fourth' ? (
                                                            (() => {
                                                                const perks = parsePerks(value as string | string[] | null | undefined);
                                                                return perks.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1">
                                                                        {perks.map((perk, index) => (
                                                                            <li key={index} className="text-xs">
                                                                                {perk}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <span>-</span>
                                                                );
                                                            })()
                                                        ) : (
                                                            value
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getTierBackgroundColor(tier: string): string {
    const colors = {
        S: 'bg-purple-900/30',
        A: 'bg-green-900/30',
        B: 'bg-lime-900/30',
        C: 'bg-yellow-900/30',
        D: 'bg-orange-900/30',
        E: 'bg-red-800/30',
        F: 'bg-red-900/30',
        G: 'bg-red-950/30',
    }
    return colors[tier as keyof typeof colors] || 'bg-primary-dark'
}
