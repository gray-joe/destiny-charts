import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface FilterSectionProps {
    combinedBuffs: Record<string, string[]>
    uniqueDebuffs: Record<string, string[]>
    selectedBuffs: string[]
    selectedDebuffs: string[]
    selectedSurgeBuff: string
    selectedElementalBuff: string
    selectedWeakenDebuff: string
    selectedAmmoBuffs: string[]
    expandedSections: Record<string, boolean>
    setExpandedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    handleBuffToggle: (buffName: string) => void
    handleDebuffToggle: (debuffName: string) => void
    handleSurgeBuffToggle: (surgeBuffName: string) => void
    handleElementalBuffToggle: (elementalBuffName: string) => void
    handleWeakenDebuffToggle: (weakenDebuffName: string) => void
    clearAllFilters: () => void
}

export default function FilterSection({
    combinedBuffs,
    uniqueDebuffs,
    selectedBuffs,
    selectedDebuffs,
    selectedSurgeBuff,
    selectedElementalBuff,
    selectedWeakenDebuff,
    selectedAmmoBuffs,
    expandedSections,
    setExpandedSections,
    handleBuffToggle,
    handleDebuffToggle,
    handleSurgeBuffToggle,
    handleElementalBuffToggle,
    handleWeakenDebuffToggle,
    clearAllFilters
}: FilterSectionProps) {
    return (
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Weapon Perk Buffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Weapon Perks</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    weaponPerks: !(prev['weaponPerks'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['weaponPerks'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['weaponPerks'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(combinedBuffs["Weapon Perk"] || []).map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedBuffs.includes(buffName) || selectedAmmoBuffs.includes(buffName)}
                                        onChange={() => handleBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ability Buffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Ability Buffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    abilityBuffs: !(prev['abilityBuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['abilityBuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['abilityBuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(combinedBuffs["Ability"] || []).map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedBuffs.includes(buffName) || selectedAmmoBuffs.includes(buffName)}
                                        onChange={() => handleBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Exotic Buffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Exotic Buffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    exoticBuffs: !(prev['exoticBuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['exoticBuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['exoticBuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(combinedBuffs["Exotic"] || []).map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedBuffs.includes(buffName) || selectedAmmoBuffs.includes(buffName)}
                                        onChange={() => handleBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Elemental Buffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Elemental Buffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    elementalBuffs: !(prev['elementalBuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['elementalBuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['elementalBuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(combinedBuffs["Elemental"] || []).map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedElementalBuff === buffName}
                                        onChange={() => handleElementalBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Surge Buffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Surge Buffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    surgeBuffs: !(prev['surgeBuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['surgeBuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['surgeBuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(combinedBuffs["Surge"] || []).map(buffName => (
                                <label key={buffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedSurgeBuff === buffName}
                                        onChange={() => handleSurgeBuffToggle(buffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {buffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Weaken Debuffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Weaken Debuffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    weakenDebuffs: !(prev['weakenDebuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['weakenDebuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['weakenDebuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {(uniqueDebuffs["Weaken"] || []).map(debuffName => (
                                <label key={debuffName} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedWeakenDebuff === debuffName}
                                        onChange={() => handleWeakenDebuffToggle(debuffName)}
                                        className="mr-2 rounded border-gray-600 bg-primary-light text-primary-dark focus:ring-primary-dark"
                                    />
                                    {debuffName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Other Debuffs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Other Debuffs</h4>
                        <button
                            type="button"
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    otherDebuffs: !(prev['otherDebuffs'] ?? true),
                                }))
                            }
                            className="text-primary-light hover:text-white"
                        >
                            {expandedSections['otherDebuffs'] ?? true ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {(expandedSections['otherDebuffs'] ?? true) && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {Object.entries(uniqueDebuffs)
                                .filter(([type]) => type !== "Weaken")
                                .map(([type, debuffs]) => (
                                    <div key={type}>
                                        <h5 className="text-white text-xs font-medium mt-2 mb-1">{type}</h5>
                                        {debuffs.map(debuffName => (
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
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 