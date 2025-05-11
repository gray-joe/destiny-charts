'use client'

import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Abilities } from '@/app/lib/definitions'
import Image from 'next/image'

export default function AbilitiesTable({ data }: { data: Abilities[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAllColumns, setShowAllColumns] = useState(false)

    const filteredData = data.filter((item) => {
        const searchFields = [item.type, item.name, item.modifiers]

        return searchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    function getActualColor(value: string) {
        const numValue = parseFloat(value)
        if (numValue >= 1000000) return 'bg-emerald-900/50'
        if (numValue >= 100000) return 'bg-green-900/50'
        if (numValue >= 10000) return 'bg-yellow-900/50'
        if (numValue >= 1000) return 'bg-orange-900/50'
        return 'bg-red-900/50'
    }

    const columns = [
        { key: 'icon_url', label: 'Icon', always: true, className: 'w-[48px]' },
        {
            key: 'type',
            label: 'Type',
            always: true,
            className: 'min-w-[120px]',
        },
        {
            key: 'name',
            label: 'Name',
            always: true,
            className: 'min-w-[120px]',
        },
        {
            key: 'modifiers',
            label: 'Modifiers',
            always: true,
            className: 'min-w-[150px] max-w-[300px] break-words',
        },
        {
            key: 'count',
            label: 'Count',
            always: false,
            className: 'min-w-[80px]',
        },
        {
            key: 'percentage',
            label: 'Percentage',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'actual',
            label: 'Actual',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'wipe',
            label: 'Wipe',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'ratio',
            label: 'Ratio',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'deviation',
            label: 'Deviation',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'updated_at',
            label: 'Last Updated',
            always: false,
            className: 'min-w-[150px]',
        },
    ]

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`${lusitana.className} text-xl md:text-2xl text-white`}
                >
                    Abilities Data
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
                placeholder="Search by type, name, modifiers..."
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
                                                        column.key as keyof Abilities
                                                    ]

                                                if (column.key === 'icon_url') {
                                                    return (
                                                        <td
                                                            key={column.key}
                                                            className={`px-3 py-5 ${column.className}`}
                                                        >
                                                            {value ? (
                                                                <Image
                                                                    src={
                                                                        value as string
                                                                    }
                                                                    alt={
                                                                        item.type
                                                                    }
                                                                    width={32}
                                                                    height={32}
                                                                    className="rounded-sm"
                                                                />
                                                            ) : (
                                                                <div className="w-8 h-8 bg-primary-light rounded-sm" />
                                                            )}
                                                        </td>
                                                    )
                                                }

                                                return (
                                                    <td
                                                        key={column.key}
                                                        className={`px-3 py-5 text-sm ${column.className} ${
                                                            column.key ===
                                                            'actual'
                                                                ? getActualColor(
                                                                      value as string
                                                                  )
                                                                : ''
                                                        }`}
                                                    >
                                                        {column.key ===
                                                        'updated_at'
                                                            ? new Date(
                                                                  value as string
                                                              ).toLocaleDateString()
                                                            : value}
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
