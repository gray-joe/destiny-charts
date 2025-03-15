'use client'

import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import { useState } from 'react'
import { Weapon } from '@/app/lib/definitions'

export default function WeaponsTable({ weapons }: { weapons: Weapon[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWeapons = weapons.filter((weapon) => {
    const searchFields = [
      weapon.name,
      weapon.affinity,
      weapon.frame,
      weapon.perk_one,
      weapon.perk_two,
      weapon.origin_trait,
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
                    <th scope="col" className="px-3 py-5 font-medium">
                      Tier
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Rank
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Icon
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Affinity
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Frame
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Enhanced
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Reserves
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Perk 1
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Perk 2
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Origin Trait
                    </th>
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
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.rank}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm font-bold">
                        {weapon.tier}
                      </td>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                        {weapon.icon_url ? (
                          <Image
                            src={weapon.icon_url}
                            alt={weapon.name}
                            width={48}
                            height={48}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary-light" />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.affinity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.frame}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.enhanced ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.reserves}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.perk_one}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.perk_two}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {weapon.origin_trait}
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

function getTierBackgroundColor(tier: string): string {
  const colors = {
    S: 'bg-emerald-900/50',
    A: 'bg-green-900/50',
    B: 'bg-lime-900/50',
    C: 'bg-yellow-900/50',
    D: 'bg-orange-900/50',
    E: 'bg-red-800/50',
    F: 'bg-red-900/50',
    G: 'bg-red-950/50',
  }
  return colors[tier as keyof typeof colors] || 'bg-primary-dark'
}
