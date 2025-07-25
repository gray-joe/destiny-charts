'use client'

import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/Search'
import { useState, useMemo } from 'react'
import { ExoticTierListItem } from '@/app/lib/definitions'

export default function ExoticTable({ exotics }: { exotics: ExoticTierListItem[] }) {
    const [searchTerm, setSearchTerm] = useState('')

    const exoticsWithCalculations = useMemo(() => {
        const exoticsWithTotals = exotics.map(exotic => ({
            ...exotic,
            total: (exotic.ad_clear || 0) + 
                   (exotic.champions || 0) + 
                   (exotic.movement || 0) + 
                   (exotic.dps || 0) + 
                   (exotic.support || 0) + 
                   (exotic.survivability || 0)
        }))

        const sortedExotics = [...exoticsWithTotals].sort((a, b) => b.total - a.total)
        
        return sortedExotics.map((exotic, index) => ({
            ...exotic,
            rank: index + 1,
            tier: calculateTier(index + 1, sortedExotics.length)
        }))
    }, [exotics])

    const filteredExotic = exoticsWithCalculations.filter((exotic) => {
        const searchFields = [
            exotic.name,
        ]

        return searchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    return (
        <div className="w-full">
            <h1
                className={`${lusitana.className} mb-8 text-xl md:text-2xl text-white`}
            >
                Tier List
            </h1>
            <Search
                placeholder="Search exotic by name, affinity, frame, perk, origin trait..."
                onSearch={setSearchTerm}
            />
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-primary-dark p-2 md:pt-0">
                            <table className="min-w-full rounded-md text-white">
                                <thead className="rounded-md bg-primary-dark text-left text-sm font-normal">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="w-16 px-2 py-5 font-medium"
                                        >
                                            Tier
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-16 px-2 py-5 font-medium"
                                        >
                                            Rank
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-16 px-2 py-5 font-medium"
                                        >
                                            Icon
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-5 font-medium"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Ad Clear / Roam Content
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Champions / Minibosses
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Utility / Movement
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            DPS
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Support
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Survivability
                                        </th>
                                        <th
                                            scope="col"
                                            className="w-24 px-3 py-5 font-medium text-center"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-primary-light text-white">
                                    {filteredExotic.map((exotic) => (
                                        <tr
                                            key={exotic.exotic_weapon_id || exotic.exotic_armor_id}
                                            className={`group hover:bg-primary-hover ${getTierBackgroundColor(
                                                exotic.tier
                                            )}`}
                                        >
                                            <td className="whitespace-nowrap px-2 py-5 text-sm">
                                                {exotic.rank}
                                            </td>
                                            <td className="whitespace-nowrap px-2 py-5 text-sm font-bold">
                                                {exotic.tier}
                                            </td>
                                            <td className="whitespace-nowrap px-2 py-5 text-sm">
                                                {exotic.icon_url ? (
                                                    <Image
                                                        src={exotic.icon_url}
                                                        alt={exotic.name}
                                                        width={48}
                                                        height={48}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-primary-light" />
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm">
                                                {exotic.name}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.ad_clear}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.champions}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.movement}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.dps}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.support}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center">
                                                {exotic.survivability}
                                            </td>
                                            <td className="w-24 px-3 py-5 text-sm text-center font-bold">
                                                {exotic.total}
                                            </td>
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

function calculateTier(rank: number, totalItems: number): string {
    const percentage = (rank / totalItems) * 100
    
    if (percentage <= 3) return 'S'
    if (percentage <= 10) return 'A'
    if (percentage <= 20) return 'B'
    if (percentage <= 30) return 'C'
    if (percentage <= 40) return 'D'
    if (percentage <= 85) return 'E'
    if (percentage <= 95) return 'F'
    return 'G'
}

function getTierBackgroundColor(tier: string): string {
    const colors = {
        S: 'bg-purple-900/30',
        A: 'bg-emerald-900/30',
        B: 'bg-lime-900/30',
        C: 'bg-yellow-900/30',
        D: 'bg-orange-900/30',
        E: 'bg-red-800/30',
        F: 'bg-red-900/30',
        G: 'bg-red-950/30',
    }
    return colors[tier as keyof typeof colors] || 'bg-primary-dark'
}
