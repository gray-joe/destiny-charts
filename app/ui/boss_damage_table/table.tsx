'use client'

import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import { useState } from 'react'
import { SustainedBossDamage } from '@/app/lib/definitions'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
export default function BossDamageTable({
  data,
}: {
  data: SustainedBossDamage[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllColumns, setShowAllColumns] = useState(false)

  const filteredData = data.filter((item) => {
    const searchFields = [item.name, item.type]

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  function getDamageColor(value: string) {
    const numValue = parseInt(value.replace(/,/g, ''))
    if (numValue > 250000) return 'bg-emerald-900/50'
    if (numValue > 175000) return 'bg-green-900/50'
    if (numValue > 100000) return 'bg-yellow-900/50'
    if (numValue > 50000) return 'bg-orange-900/50'
    return 'bg-red-900/50'
  }

  const columns = [
    { key: 'icon_url', label: '', always: true, className: 'w-[48px]' },
    {
      key: 'name',
      label: 'Name',
      always: true,
      className: 'min-w-[200px] max-w-[300px] break-words',
    },
    { key: 'type', label: 'Type', always: true, className: 'min-w-[100px]' },
    { key: 'total', label: 'Total', always: true, className: 'min-w-[100px]' },
    { key: 'burst', label: 'Burst', always: true, className: 'min-w-[100px]' },
    {
      key: 'sustained',
      label: 'Sustained',
      always: true,
      className: 'min-w-[100px]',
    },
    { key: 'count', label: 'Count', always: false, className: 'min-w-[80px]' },
    { key: 'notes', label: 'Notes', always: false, className: 'min-w-[150px]' },
    {
      key: 'distribution',
      label: 'Distribution',
      always: false,
      className: 'min-w-[120px]',
    },
    { key: 'rate', label: 'Rate', always: false, className: 'min-w-[80px]' },
    { key: 'time', label: 'Time', always: false, className: 'min-w-[80px]' },
    { key: 'base', label: 'Base', always: false, className: 'min-w-[100px]' },
    { key: 'perk', label: 'Perk', always: false, className: 'min-w-[80px]' },
    { key: 'surge', label: 'Surge', always: false, className: 'min-w-[80px]' },
    { key: 'buff', label: 'Buff', always: false, className: 'min-w-[80px]' },
    {
      key: 'debuff',
      label: 'Debuff',
      always: false,
      className: 'min-w-[80px]',
    },
    {
      key: 'single',
      label: 'Single',
      always: false,
      className: 'min-w-[100px]',
    },
  ]

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className={`${lusitana.className} text-xl md:text-2xl text-white`}>
          Sustained Boss Damage
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
        placeholder="Search by name, type, notes..."
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
                        (column.always || showAllColumns) && (
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
                    <tr key={item.id} className="group hover:bg-primary-hover">
                      {columns.map((column) => {
                        if (!column.always && !showAllColumns) return null

                        const value =
                          item[column.key as keyof SustainedBossDamage]
                        const isColoredColumn = ['burst', 'sustained'].includes(
                          column.key
                        )

                        return (
                          <td
                            key={column.key}
                            className={`px-3 py-5 text-sm ${column.className} ${
                              isColoredColumn
                                ? getDamageColor(value as string)
                                : ''
                            }`}
                          >
                            {column.key === 'icon_url' ? (
                              value ? (
                                <Image
                                  src={value as string}
                                  alt=""
                                  className="w-8 h-8"
                                  width={48}
                                  height={48}
                                />
                              ) : null
                            ) : typeof value === 'number' ? (
                              value.toFixed(3)
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
