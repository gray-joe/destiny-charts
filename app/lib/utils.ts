import React from 'react'

export function to_snake_case(str: string): string {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase()
        .replace(/^_+|_+$/g, '')
}

export function highlightText(text: string): React.ReactNode[] {
    const colorMap: Record<string, string> = {
        // General
        '↑': 'text-emerald-600 font-semibold',
        '↓': 'text-red-600 font-semibold',

        // Arc status effects
        'Arc': 'text-cyan-400 font-semibold',
        'arc': 'text-cyan-400 font-semibold',
        'Bolt': 'text-cyan-400 font-semibold',
        'bolt': 'text-cyan-400 font-semibold',
        'Charge': 'text-cyan-400 font-semibold',
        'charge': 'text-cyan-400 font-semibold',
        'Ionic': 'text-cyan-400 font-semibold',
        'ionic': 'text-cyan-400 font-semibold',
        'Traces': 'text-cyan-400 font-semibold',
        'Trace': 'text-cyan-400 font-semibold',
        'traces': 'text-cyan-400 font-semibold',
        'trace': 'text-cyan-400 font-semibold',
        'Jolt': 'text-cyan-400 font-semibold',
        'jolt': 'text-cyan-400 font-semibold',
        'Jolted': 'text-cyan-400 font-semibold',
        'jolted': 'text-cyan-400 font-semibold',
        'Blind': 'text-cyan-400 font-semibold',
        'blind': 'text-cyan-400 font-semibold',
        'Blinded': 'text-cyan-400 font-semibold',
        'blinded': 'text-cyan-400 font-semibold',
        'Amplified': 'text-cyan-400 font-semibold',
        'amplified': 'text-cyan-400 font-semibold',
        
        // Solar status effects
        'Solar': 'text-yellow-600 font-semibold',
        'solar': 'text-yellow-600 font-semibold',
        'Cure': 'text-yellow-600 font-semibold',
        'cure': 'text-yellow-600 font-semibold',
        'Ignite': 'text-yellow-600 font-semibold',
        'ignite': 'text-yellow-600 font-semibold',
        'Ignition': 'text-yellow-600 font-semibold',
        'ignition': 'text-yellow-600 font-semibold',
        'Restoration': 'text-yellow-600 font-semibold',
        'restoration': 'text-yellow-600 font-semibold',
        'Burn': 'text-yellow-600 font-semibold',
        'burn': 'text-yellow-600 font-semibold',
        'Scorch': 'text-yellow-600 font-semibold',
        'scorch': 'text-yellow-600 font-semibold',
        'Radiant': 'text-yellow-600 font-semibold',
        'radiant': 'text-yellow-600 font-semibold',
        'Firesprite': 'text-yellow-600 font-semibold',
        'firesprite': 'text-yellow-600 font-semibold',
        'Firesprites': 'text-yellow-600 font-semibold',
        'firesprites': 'text-yellow-600 font-semibold',

        // Void status effects
        'Void': 'text-purple-400 font-semibold',
        'void': 'text-purple-400 font-semibold',
        'Weaken': 'text-purple-400 font-semibold',
        'weaken': 'text-purple-400 font-semibold',
        'Weakened': 'text-purple-400 font-semibold',
        'weakened': 'text-purple-400 font-semibold',
        'Weakening': 'text-purple-400 font-semibold',
        'weakening': 'text-purple-400 font-semibold',
        'Suppress': 'text-purple-400 font-semibold',
        'suppress': 'text-purple-400 font-semibold',
        'Suppressed': 'text-purple-400 font-semibold',
        'suppressed': 'text-purple-400 font-semibold',
        'Suppressing': 'text-purple-400 font-semibold',
        'suppressing': 'text-purple-400 font-semibold',
        'Suppression': 'text-purple-400 font-semibold',
        'suppression': 'text-purple-400 font-semibold',
        'Overshield': 'text-purple-400 font-semibold',
        'overshield': 'text-purple-400 font-semibold',
        'Volatile': 'text-purple-400 font-semibold',
        'volatile': 'text-purple-400 font-semibold',
        'Breach': 'text-purple-400 font-semibold',
        'breach': 'text-purple-400 font-semibold',
        'Invisible': 'text-purple-400 font-semibold',
        'invisible': 'text-purple-400 font-semibold',
        'Invisibility': 'text-purple-400 font-semibold',
        'invisibility': 'text-purple-400 font-semibold',
        'Devour': 'text-purple-400 font-semibold',
        'devour': 'text-purple-400 font-semibold',

        // Stasis status effects
        'Stasis': 'text-blue-400 font-semibold',
        'stasis': 'text-blue-400 font-semibold',
        'Crystals': 'text-blue-400 font-semibold',
        'crystals': 'text-blue-400 font-semibold',
        'Shards': 'text-blue-400 font-semibold',
        'shards': 'text-blue-400 font-semibold',
        'Slow': 'text-blue-400 font-semibold',
        'slow': 'text-blue-400 font-semibold',
        'Slowed': 'text-blue-400 font-semibold',
        'slowed': 'text-blue-400 font-semibold',
        'Frozen': 'text-blue-400 font-semibold',
        'frozen': 'text-blue-400 font-semibold',
        'Freeze': 'text-blue-400 font-semibold',
        'freeze': 'text-blue-400 font-semibold',
        'Freezing': 'text-blue-400 font-semibold',
        'freezing': 'text-blue-400 font-semibold',
        'Freezes': 'text-blue-400 font-semibold',
        'freezes': 'text-blue-400 font-semibold',
        'Frost': 'text-blue-400 font-semibold',
        'frost': 'text-blue-400 font-semibold',
        'Shatter': 'text-blue-400 font-semibold',
        'shatter': 'text-blue-400 font-semibold',
        'Shattered': 'text-blue-400 font-semibold',
        'shattered': 'text-blue-400 font-semibold',
        'Shattering': 'text-blue-400 font-semibold',
        'shattering': 'text-blue-400 font-semibold',
        'Shatters': 'text-blue-400 font-semibold',
        'shatters': 'text-blue-400 font-semibold',
        
        // Strand status effects
        'Strand': 'text-emerald-400 font-semibold',
        'strand': 'text-emerald-400 font-semibold',
        'Sever': 'text-emerald-400 font-semibold',
        'sever': 'text-emerald-400 font-semibold',
        'Severing': 'text-emerald-400 font-semibold',
        'severing': 'text-emerald-400 font-semibold',
        'Tangle': 'text-emerald-400 font-semibold',
        'Tangles': 'text-emerald-400 font-semibold',
        'tangle': 'text-emerald-400 font-semibold',
        'tangles': 'text-emerald-400 font-semibold',
        'Tear': 'text-emerald-400 font-semibold',
        'tear': 'text-emerald-400 font-semibold',
        'Threadling': 'text-emerald-400 font-semibold',
        'threadling': 'text-emerald-400 font-semibold',
        'Threadlings': 'text-emerald-400 font-semibold',
        'threadlings': 'text-emerald-400 font-semibold',
        'Woven': 'text-emerald-400 font-semibold',
        'woven': 'text-emerald-400 font-semibold',
        'mail': 'text-emerald-400 font-semibold',
        'Mail': 'text-emerald-400 font-semibold',
        'Suspend': 'text-emerald-400 font-semibold',
        'suspend': 'text-emerald-400 font-semibold',
        'Suspended': 'text-emerald-400 font-semibold',
        'suspended': 'text-emerald-400 font-semibold',
        'Unravel': 'text-emerald-400 font-semibold',
        'unravel': 'text-emerald-400 font-semibold',
        'Unraveled': 'text-emerald-400 font-semibold',
        'unraveled': 'text-emerald-400 font-semibold',
        'Unraveling': 'text-emerald-400 font-semibold',
        'unraveling': 'text-emerald-400 font-semibold',

        // Prismatic status effects
        'Prismatic': 'text-pink-400 font-semibold',
        'prismatic': 'text-pink-400 font-semibold',
        'Transcend': 'text-pink-400 font-semibold',
        'transcend': 'text-pink-400 font-semibold',
        'Transcendence': 'text-pink-400 font-semibold',
        'transcendence': 'text-pink-400 font-semibold',
        'Transcended': 'text-pink-400 font-semibold',
        'transcended': 'text-pink-400 font-semibold',
    }

    const parts = text.split(/(\s+)/)
    
    return parts.map((part, index) => {
        const trimmedPart = part.trim()
        if (!trimmedPart || /^\s+$/.test(part)) {
            return part
        }
        
        const cleanWord = trimmedPart.replace(/[^\w]/g, '')
        const colorClass = colorMap[cleanWord]
        
        if (colorClass) {
            return React.createElement('span', {
                key: index,
                className: colorClass
            }, part)
        }
        
        return part
    })
}
