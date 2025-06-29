interface PresetButtonsProps {
    currentPreset: 'total-damage' | 'total-dps' | 'swap-dps'
    onPresetChange: (preset: 'total-damage' | 'total-dps' | 'swap-dps') => void
}

export default function PresetButtons({ currentPreset, onPresetChange }: PresetButtonsProps) {
    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={() => onPresetChange('total-damage')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    currentPreset === 'total-damage'
                        ? 'bg-primary-light text-white'
                        : 'bg-primary-dark text-gray-300 hover:text-white hover:bg-primary-hover'
                }`}
            >
                Total Damage
            </button>
            <button
                onClick={() => onPresetChange('total-dps')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    currentPreset === 'total-dps'
                        ? 'bg-primary-light text-white'
                        : 'bg-primary-dark text-gray-300 hover:text-white hover:bg-primary-hover'
                }`}
            >
                Total DPS
            </button>
            <button
                onClick={() => onPresetChange('swap-dps')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    currentPreset === 'swap-dps'
                        ? 'bg-primary-light text-white'
                        : 'bg-primary-dark text-gray-300 hover:text-white hover:bg-primary-hover'
                }`}
            >
                Swap DPS
            </button>
        </div>
    )
} 