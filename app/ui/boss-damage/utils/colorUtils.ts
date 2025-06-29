export function getActualColor(value: string, column: string, combinedData: any[]) {
    const numValue = parseFloat(value)
    
    const allValues = combinedData
        .map(item => {
            const itemValue = item[column] as string
            return itemValue === '∞' ? null : parseFloat(itemValue || '0')
        })
        .filter(value => value !== null) as number[]
    
    if (allValues.length === 0) {
        return value === '∞' ? 'bg-emerald-900/50' : 'bg-red-900/50'
    }
    
    const maxValue = Math.max(...allValues)
    const minValue = Math.min(...allValues)
    const range = maxValue - minValue
    
    const threshold1 = minValue + range * 0.2
    const threshold2 = minValue + range * 0.4
    const threshold3 = minValue + range * 0.6
    const threshold4 = minValue + range * 0.8
    
    if (value === '∞') return 'bg-emerald-900/50'
    
    if (numValue >= threshold4) return 'bg-emerald-900/50'
    if (numValue >= threshold3) return 'bg-green-900/50'
    if (numValue >= threshold2) return 'bg-yellow-900/50'
    if (numValue >= threshold1) return 'bg-orange-900/50'
    return 'bg-red-900/50'
} 