'use client'

import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/Search'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LegendaryWeaponForBossDamage, WeaponDamageBuff, BossDebuff, WeaponAmmoBuff } from '@/app/lib/definitions'
import { useBossDamageData } from './hooks/useBossDamageData'
import { getActualColor } from './utils/colorUtils'
import FilterSection from './components/FilterSection'
import PresetButtons from './components/PresetButtons'
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
    buffs?: string
}

export default function BossDamageTable({ legendaryWeapons, weaponDamageBuffs, bossDebuffs, weaponAmmoBuffs }: {
    legendaryWeapons: (LegendaryWeaponForBossDamage & { perk_one?: string | null, perk_two?: string | null })[],
    weaponDamageBuffs: WeaponDamageBuff[],
    bossDebuffs: BossDebuff[],
    weaponAmmoBuffs: WeaponAmmoBuff[]
}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showDetailsToggle, setShowDetailsToggle] = useState(false)
    const [selectedBuffs, setSelectedBuffs] = useState<string[]>([])
    const [selectedDebuffs, setSelectedDebuffs] = useState<string[]>([])
    const [selectedSurgeBuff, setSelectedSurgeBuff] = useState<string>('')
    const [selectedElementalBuff, setSelectedElementalBuff] = useState<string>('')
    const [selectedWeakenDebuff, setSelectedWeakenDebuff] = useState<string>('')
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
    const [currentPreset, setCurrentPreset] = useState<'total-damage' | 'total-dps' | 'swap-dps'>('total-dps')
    const [colorColumn, setColorColumn] = useState<'total_damage' | 'dps' | 'swap_dps'>('dps')
    const [selectedAmmoBuffs, setSelectedAmmoBuffs] = useState<string[]>([])

    const { uniqueBuffs, uniqueDebuffs, uniqueAmmoBuffs, combinedBuffs, combinedData } = useBossDamageData(
        legendaryWeapons,
        weaponDamageBuffs,
        bossDebuffs,
        weaponAmmoBuffs,
        selectedBuffs,
        selectedDebuffs,
        selectedSurgeBuff,
        selectedElementalBuff,
        selectedWeakenDebuff,
        selectedAmmoBuffs
    )

    const filteredData = combinedData.filter((item) => {
        const searchFields = [item.name, item.type, item.frame]
        return searchFields.some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }).sort((a, b) => {
        let sortColumn: keyof CombinedBossDamageData
        switch (currentPreset) {
            case 'total-damage':
                sortColumn = 'total_damage'
                break
            case 'total-dps':
                sortColumn = 'dps'
                break
            case 'swap-dps':
                sortColumn = 'swap_dps'
                break
            default:
                sortColumn = 'dps'
        }
        
        const valueA = a[sortColumn] as string
        const valueB = b[sortColumn] as string
        
        const damageA = valueA === '∞' ? Infinity : parseFloat(valueA || '0')
        const damageB = valueB === '∞' ? Infinity : parseFloat(valueB || '0')
        
        return damageB - damageA
    })

    const handleBuffToggle = (buffName: string) => {
        const isAmmoBuff = weaponAmmoBuffs.some(buff => buff.name === buffName)
        
        if (isAmmoBuff) {
            setSelectedAmmoBuffs(prev => 
                prev.includes(buffName) 
                    ? prev.filter(buff => buff !== buffName)
                    : [...prev, buffName]
            )
        } else {
            setSelectedBuffs(prev => 
                prev.includes(buffName) 
                    ? prev.filter(buff => buff !== buffName)
                    : [...prev, buffName]
            )
        }
    }

    const handleDebuffToggle = (debuffName: string) => {
        setSelectedDebuffs(prev => 
            prev.includes(debuffName) 
                ? prev.filter(debuff => debuff !== debuffName)
                : [...prev, debuffName]
        )
    }

    const handleSurgeBuffToggle = (surgeBuffName: string) => {
        setSelectedSurgeBuff(prev => 
            prev === surgeBuffName ? '' : surgeBuffName
        )
    }

    const handleElementalBuffToggle = (elementalBuffName: string) => {
        setSelectedElementalBuff(prev => 
            prev === elementalBuffName ? '' : elementalBuffName
        )
    }

    const handleWeakenDebuffToggle = (weakenDebuffName: string) => {
        setSelectedWeakenDebuff(prev => 
            prev === weakenDebuffName ? '' : weakenDebuffName
        )
    }

    const clearAllFilters = () => {
        setSelectedBuffs([])
        setSelectedDebuffs([])
        setSelectedSurgeBuff('')
        setSelectedElementalBuff('')
        setSelectedWeakenDebuff('')
        setSelectedAmmoBuffs([])
    }

    const handlePresetChange = (preset: 'total-damage' | 'total-dps' | 'swap-dps') => {
        setCurrentPreset(preset)
        
        switch (preset) {
            case 'total-damage':
                setColorColumn('total_damage')
                break
            case 'total-dps':
                setColorColumn('dps')
                break
            case 'swap-dps':
                setColorColumn('swap_dps')
                break
        }
    }

    const columns = [
        { key: 'icon_url', label: 'Icon', always: true, className: 'w-[48px]' },
        { key: 'name', label: 'Name', always: true, className: 'min-w-[120px]' },
        { key: 'type', label: 'Type', always: false, className: 'min-w-[120px]' },
        { key: 'frame', label: 'Frame', always: false, className: 'min-w-[120px]' },
        { key: 'single_shot_damage', label: 'Single Shot Damage', always: false, className: 'min-w-[100px]' },
        { key: 'buffs', label: 'Buffs', always: true, className: 'min-w-[200px] max-w-[300px] break-words' },
        { key: 'debuff_name', label: 'Debuffs', always: true, className: 'min-w-[150px] max-w-[300px] break-words' },
        { key: 'total_damage', label: 'Total Damage', always: currentPreset === 'total-damage' || currentPreset === 'total-dps', className: 'min-w-[100px]' },
        { key: 'dps', label: 'Total DPS', always: currentPreset === 'total-damage' || currentPreset === 'total-dps', className: 'min-w-[100px]' },
        { key: 'total_time', label: 'Total Time', always: currentPreset === 'total-damage' || currentPreset === 'total-dps', className: 'min-w-[100px]' },
        { key: 'swap_damage', label: 'Swap Damage', always: currentPreset === 'swap-dps', className: 'min-w-[100px]' },
        { key: 'swap_dps', label: 'Swap DPS', always: currentPreset === 'swap-dps', className: 'min-w-[100px]' },
        { key: 'swap_time', label: 'Swap Time', always: currentPreset === 'swap-dps', className: 'min-w-[100px]' },
    ]

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className={`${lusitana.className} text-xl md:text-2xl text-white`}>
                    Boss Damage Data (Legendary & Exotic Weapons)
                </h1>
                <button
                    onClick={() => setShowDetailsToggle(!showDetailsToggle)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-light rounded-md hover:bg-primary-hover"
                >
                    {showDetailsToggle ? (
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

            <PresetButtons 
                currentPreset={currentPreset}
                onPresetChange={handlePresetChange}
            />

            <Search
                placeholder="Search by weapon name, type, ability..."
                onSearch={setSearchTerm}
            />

            <FilterSection
                combinedBuffs={combinedBuffs}
                uniqueDebuffs={uniqueDebuffs}
                selectedBuffs={selectedBuffs}
                selectedDebuffs={selectedDebuffs}
                selectedSurgeBuff={selectedSurgeBuff}
                selectedElementalBuff={selectedElementalBuff}
                selectedWeakenDebuff={selectedWeakenDebuff}
                selectedAmmoBuffs={selectedAmmoBuffs}
                expandedSections={expandedSections}
                setExpandedSections={setExpandedSections}
                handleBuffToggle={handleBuffToggle}
                handleDebuffToggle={handleDebuffToggle}
                handleSurgeBuffToggle={handleSurgeBuffToggle}
                handleElementalBuffToggle={handleElementalBuffToggle}
                handleWeakenDebuffToggle={handleWeakenDebuffToggle}
                clearAllFilters={clearAllFilters}
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
                                                    showDetailsToggle) && (
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
                                                    !showDetailsToggle
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
                                                                    src={value as string}
                                                                    alt={item.name}
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
                                                            column.key === colorColumn
                                                                ? getActualColor(
                                                                      value as string,
                                                                      column.key,
                                                                      combinedData
                                                                  )
                                                                : ''
                                                        }`}
                                                    >
                                                        {column.key === 'updated_at'
                                                            ? new Date(value as string).toLocaleDateString()
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