'use client'

import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/Search'
import { useState, useMemo } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LegendaryWeaponForBossDamage, WeaponDamageBuff, BossDebuff } from '@/app/lib/definitions'
import Image from 'next/image'

type CombinedBossDamageData = LegendaryWeaponForBossDamage & {
    buff_name?: string
    debuff_name?: string
    total_damage?: string
    dps?: string
    swap_damage?: string
    swap_dps?: string
    swap_time?: string
    total_time?: string
}

export default function BossDamageTable({ legendaryWeapons, weaponDamageBuffs, bossDebuffs }: {
    legendaryWeapons: LegendaryWeaponForBossDamage[],
    weaponDamageBuffs: WeaponDamageBuff[],
    bossDebuffs: BossDebuff[]
}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAllColumns, setShowAllColumns] = useState(false)
    const [selectedBuffs, setSelectedBuffs] = useState<string[]>([])
    const [selectedDebuffs, setSelectedDebuffs] = useState<string[]>([])

    const uniqueBuffs = useMemo(() => {
        return [...new Set(weaponDamageBuffs.map(buff => buff.name))].sort()
    }, [weaponDamageBuffs])

    const uniqueDebuffs = useMemo(() => {
        return [...new Set(bossDebuffs.map(debuff => debuff.name))].sort()
    }, [bossDebuffs])

    const combinedData = useMemo(() => {
        return legendaryWeapons.map(weapon => {
            const selectedBuffsList = weaponDamageBuffs.filter(buff => 
                selectedBuffs.length > 0 && selectedBuffs.includes(buff.name)
            )
            
            const weaponPerkBuffs = selectedBuffsList.filter(buff => buff.buff_type === "Weapon Perk")
            const otherBuffs = selectedBuffsList.filter(buff => buff.buff_type !== "Weapon Perk")
            
            let bestPerkOne = null
            let bestPerkTwo = null
            let highestPerkOneAmount = 0
            let highestPerkTwoAmount = 0
            
            weaponPerkBuffs.forEach(buff => {
                const buffAmount = parseFloat(buff.buff_amount)
                
                if (weapon.perk_one && weapon.perk_one.includes(buff.name)) {
                    if (buffAmount > highestPerkOneAmount) {
                        highestPerkOneAmount = buffAmount
                        bestPerkOne = buff
                    }
                }
                
                if (weapon.perk_two && weapon.perk_two.includes(buff.name)) {
                    if (buffAmount > highestPerkTwoAmount) {
                        highestPerkTwoAmount = buffAmount
                        bestPerkTwo = buff
                    }
                }
            })
            
            const weaponBuffs = [
                ...(bestPerkOne ? [bestPerkOne] : []),
                ...(bestPerkTwo ? [bestPerkTwo] : []),
                ...otherBuffs
            ]
            
            const weaponDebuffs = bossDebuffs.filter(debuff => 
                selectedDebuffs.length > 0 && selectedDebuffs.includes(debuff.name)
            )
            
            const buffNames = weaponBuffs.map(buff => buff.name).join(', ')
            const buffAmounts = weaponBuffs.map(buff => buff.buff_amount)
            const debuffNames = weaponDebuffs.map(debuff => debuff.name).join(', ')
            const debuffAmounts = weaponDebuffs.map(debuff => debuff.debuff_amount)
            
            let baseDamage = weapon.single_shot_damage || 0
            for (let i = 0; i < buffAmounts.length; i++) {
                baseDamage = baseDamage * (1 + parseFloat(buffAmounts[i]))
            }

            let highestDebuffAmount = 0
            let bestDebuff = null
            for (let i = 0; i < debuffAmounts.length; i++) {
                if (parseFloat(debuffAmounts[i]) > highestDebuffAmount) {
                    highestDebuffAmount = parseFloat(debuffAmounts[i])
                    bestDebuff = weaponDebuffs[i]
                }
            }

            let totalDamage = baseDamage * weapon.reserves * (1 + highestDebuffAmount)
            
            let totalTime = 0
            if (weapon.rounds_per_min && weapon.mag_size && weapon.reload_time) {
                const fireTime = weapon.reserves / weapon.rounds_per_min * 60
                
                const numReloads = Math.ceil(weapon.reserves / weapon.mag_size) - 1
                
                const reloadTime = numReloads * weapon.reload_time
                
                totalTime = fireTime + reloadTime
            } else {
                totalTime = 100
            }
            
            let swapDamage = 0
            let swapTime = 0
            if (weapon.rounds_per_min && weapon.mag_size) {
                const roundsInMag = Math.min(weapon.reserves, weapon.mag_size)
                swapDamage = baseDamage * roundsInMag * (1 + highestDebuffAmount)
                
                swapTime = roundsInMag / weapon.rounds_per_min * 60
            } else {
                swapDamage = totalDamage
                swapTime = totalTime
            }
            
            const dps = totalTime > 0 ? (totalDamage / totalTime).toFixed(0) : '0'
            const swapDps = swapTime > 0 ? (swapDamage / swapTime).toFixed(0) : '0'
            
            return {
                ...weapon,
                buff_name: buffNames || 'None',
                debuff_name: debuffNames || 'None',
                total_damage: totalDamage.toString(),
                dps: dps,
                swap_damage: swapDamage.toString(),
                swap_dps: swapDps,
                swap_time: swapTime.toFixed(1) + 's',
                total_time: totalTime.toFixed(1) + 's',
            } as CombinedBossDamageData
        })
    }, [legendaryWeapons, weaponDamageBuffs, bossDebuffs, selectedBuffs, selectedDebuffs])

    const filteredData = combinedData.filter((item) => {
        const searchFields = [item.name, item.type, item.frame]

        return searchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }).sort((a, b) => {
        const damageA = parseFloat(a.dps || '0')
        const damageB = parseFloat(b.dps || '0')
        return damageB - damageA
    })

    function getActualColor(value: string) {
        const numValue = parseFloat(value)
        if (numValue >= 10000) return 'bg-emerald-900/50'
        if (numValue >= 1000) return 'bg-green-900/50'
        if (numValue >= 100) return 'bg-yellow-900/50'
        if (numValue >= 10) return 'bg-orange-900/50'
        return 'bg-red-900/50'
    }

    const handleBuffToggle = (buffName: string) => {
        setSelectedBuffs(prev => 
            prev.includes(buffName) 
                ? prev.filter(buff => buff !== buffName)
                : [...prev, buffName]
        )
    }

    const handleDebuffToggle = (debuffName: string) => {
        setSelectedDebuffs(prev => 
            prev.includes(debuffName) 
                ? prev.filter(debuff => debuff !== debuffName)
                : [...prev, debuffName]
        )
    }

    const clearAllFilters = () => {
        setSelectedBuffs([])
        setSelectedDebuffs([])
    }

    const columns = [
        { key: 'icon_url', label: 'Icon', always: true, className: 'w-[48px]' },
        {
            key: 'name',
            label: 'Name',
            always: true,
            className: 'min-w-[120px]',
        },
        {
            key: 'type',
            label: 'Type',
            always: false,
            className: 'min-w-[120px]',
        },
        {
            key: 'frame',
            label: 'Frame',
            always: false,
            className: 'min-w-[120px]',
        },
        {
            key: 'single_shot_damage',
            label: 'Single Shot Damage',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'buff_name',
            label: 'Buffs',
            always: true,
            className: 'min-w-[150px] max-w-[300px] break-words',
        },
        {
            key: 'debuff_name',
            label: 'Debuffs',
            always: true,
            className: 'min-w-[150px] max-w-[300px] break-words',
        },
        {
            key: 'total_damage',
            label: 'Total Damage',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'dps',
            label: 'Total DPS',
            always: true,
            className: 'min-w-[100px]',
        },
        {
            key: 'swap_damage',
            label: 'Swap Damage',
            always: false,
            className: 'min-w-[100px]',
        },
        {
            key: 'swap_dps',
            label: 'Swap DPS',
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

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`${lusitana.className} text-xl md:text-2xl text-white`}
                >
                    Boss Damage Data
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
                placeholder="Search by weapon name, type, ability..."
                onSearch={setSearchTerm}
            />

            {/* Filter Section */}
            <div className="mt-4 p-4 bg-primary-dark rounded-md">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">Filters</h3>
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-gray-300 hover:text-white"
                    >
                        Clear All
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Buff Filters */}
                    <div>
                        <h4 className="text-white text-sm font-medium mb-2">Buffs</h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                            {uniqueBuffs.map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedBuffs.includes(buffName)}
                                        onChange={() => handleBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Debuff Filters */}
                    <div>
                        <h4 className="text-white text-sm font-medium mb-2">Debuffs</h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                            {uniqueDebuffs.map(debuffName => (
                                <label key={debuffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedDebuffs.includes(debuffName)}
                                        onChange={() => handleDebuffToggle(debuffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {debuffName}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

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
                                            key={item.name}
                                            className="group hover:bg-primary-hover"
                                        >
                                            {columns.map((column) => {
                                                const value = item[column.key as keyof CombinedBossDamageData]

                                                if (
                                                    !column.always &&
                                                    !showAllColumns
                                                )
                                                    return null

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
                                                                        item.name
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
                                                            'total_damage'
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
