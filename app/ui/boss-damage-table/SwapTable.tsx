'use client'

import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/Search'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { SwapBossDamage } from '@/app/lib/definitions'
import Image from 'next/image'
export default function SwapDamageTable({ data }: { data: SwapBossDamage[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAllColumns, setShowAllColumns] = useState(false)

    const filteredData = data.filter((item) => {
        const searchFields = [item.name, item.type]

        return searchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    function getDPSColor(value: string) {
        const numValue = parseInt(value.replace(/,/g, ''))
        if (numValue > 750000) return 'bg-emerald-900/50'
        if (numValue > 250000) return 'bg-green-900/50'
        if (numValue > 100000) return 'bg-yellow-900/50'
        if (numValue > 50000) return 'bg-orange-900/50'
        return 'bg-red-900/50'
    }

    const columns = [
        { key: 'icon_url', label: '', always: true, className: 'w-[54px]' },
        {
            key: 'name',
            label: 'Name',
            always: true,
            className: 'min-w-[200px] max-w-[300px] break-words',
        },
        {
            key: 'type',
            label: 'Type',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'swap_dps',
            label: 'Swap DPS',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'true_dps',
            label: 'True DPS',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'total',
            label: 'Total Damage',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'base',
            label: 'Base',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'perk',
            label: 'Perk',
            always: false,
            className: 'min-w-[80px]',
        },
        {
            key: 'surge',
            label: 'Surge',
            always: false,
            className: 'min-w-[80px]',
        },
        {
            key: 'buff',
            label: 'Buff',
            always: false,
            className: 'min-w-[80px]',
        },
        {
            key: 'debuff',
            label: 'Debuff',
            always: false,
            className: 'min-w-[80px]',
        },
        {
            key: 'ready',
            label: 'Ready Time',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'fire',
            label: 'Fire Time',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'stow',
            label: 'Stow Time',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'swap_time',
            label: 'Swap Time',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'total_time',
            label: 'Total Time',
            always: false,
            className: 'min-w-[100px]',
        },
    ]

    function formatValue(value: string | null, key: string): React.ReactNode {
        if (value === null) return ''

        if (key === 'icon_url') {
            return value ? (
                <Image
                    src={value}
                    alt=""
                    className="w-8 h-8"
                    width={48}
                    height={48}
                />
            ) : null
        }

        const cleanValue = value.replace(/,/g, '')
        const num = parseFloat(cleanValue)

        if (!isNaN(num)) {
            if (num < 100) {
                return num.toFixed(3)
            }
            return num.toLocaleString()
        }

        return value
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`${lusitana.className} text-xl md:text-2xl text-white`}
                >
                    Weapon Swap DPS
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
                placeholder="Search by name or type..."
                onSearch={setSearchTerm}
            />

            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-primary-dark p-2 md:pt-0">
                            <table className="min-w-full rounded-md text-white">
                                <thead className="rounded-md bg-primary-dark text-left text-sm font-normal sticky top-0 z-10">
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
                                    {filteredData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="group hover:bg-primary-hover"
                                        >
                                            {columns.map((column) => {
                                                if (
                                                    !column.always &&
                                                    !showAllColumns
                                                )
                                                    return null

                                                const value =
                                                    item[
                                                        column.key as keyof SwapBossDamage
                                                    ]
                                                const isColoredColumn = [
                                                    'swap_dps',
                                                    'true_dps',
                                                ].includes(column.key)

                                                return (
                                                    <td
                                                        key={column.key}
                                                        className={`px-3 py-5 text-sm ${column.className} ${
                                                            isColoredColumn
                                                                ? getDPSColor(
                                                                      value as string
                                                                  )
                                                                : ''
                                                        }`}
                                                    >
                                                        {formatValue(
                                                            value,
                                                            column.key
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
