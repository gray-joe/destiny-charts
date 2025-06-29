import { useMemo } from 'react'
import { LegendaryWeaponForBossDamage, WeaponDamageBuff, BossDebuff, WeaponAmmoBuff } from '@/app/lib/definitions'

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

export function useBossDamageData(
    legendaryWeapons: (LegendaryWeaponForBossDamage & { perk_one?: string | null, perk_two?: string | null })[],
    weaponDamageBuffs: WeaponDamageBuff[],
    bossDebuffs: BossDebuff[],
    weaponAmmoBuffs: WeaponAmmoBuff[],
    selectedBuffs: string[],
    selectedDebuffs: string[],
    selectedSurgeBuff: string,
    selectedElementalBuff: string,
    selectedWeakenDebuff: string,
    selectedAmmoBuffs: string[]
) {
    const uniqueBuffs = useMemo(() => {
        const buffsByType = weaponDamageBuffs.reduce((acc, buff) => {
            if (!acc[buff.buff_type]) {
                acc[buff.buff_type] = []
            }
            if (!acc[buff.buff_type].includes(buff.name)) {
                acc[buff.buff_type].push(buff.name)
            }
            return acc
        }, {} as Record<string, string[]>)
        
        Object.keys(buffsByType).forEach(type => {
            buffsByType[type].sort()
        })
        
        return buffsByType
    }, [weaponDamageBuffs])

    const uniqueDebuffs = useMemo(() => {
        const debuffsByType = bossDebuffs.reduce((acc, debuff) => {
            if (!acc[debuff.debuff_type]) {
                acc[debuff.debuff_type] = []
            }
            if (!acc[debuff.debuff_type].includes(debuff.name)) {
                acc[debuff.debuff_type].push(debuff.name)
            }
            return acc
        }, {} as Record<string, string[]>)
        
        Object.keys(debuffsByType).forEach(type => {
            debuffsByType[type].sort()
        })
        
        return debuffsByType
    }, [bossDebuffs])

    const uniqueAmmoBuffs = useMemo(() => {
        const ammoBuffsByType = weaponAmmoBuffs.reduce((acc, buff) => {
            if (!acc[buff.buff_type]) {
                acc[buff.buff_type] = []
            }
            if (!acc[buff.buff_type].includes(buff.name)) {
                acc[buff.buff_type].push(buff.name)
            }
            return acc
        }, {} as Record<string, string[]>)
        
        Object.keys(ammoBuffsByType).forEach(type => {
            ammoBuffsByType[type].sort()
        })
        
        return ammoBuffsByType
    }, [weaponAmmoBuffs])

    const combinedBuffs = useMemo(() => {
        const combined = { ...uniqueBuffs }
        
        Object.entries(uniqueAmmoBuffs).forEach(([type, buffs]) => {
            if (combined[type]) {
                buffs.forEach(buff => {
                    if (!combined[type].includes(buff)) {
                        combined[type].push(buff)
                    }
                })
                combined[type].sort()
            } else {
                combined[type] = [...buffs]
            }
        })
        
        return combined
    }, [uniqueBuffs, uniqueAmmoBuffs])

    const combinedData = useMemo(() => {
        return legendaryWeapons.map(weapon => {
            const selectedBuffsList = weaponDamageBuffs.filter(buff => 
                selectedBuffs.length > 0 && selectedBuffs.includes(buff.name)
            )
            
            const surgeBuff = weaponDamageBuffs.find(buff => 
                buff.buff_type === "Surge" && buff.name === selectedSurgeBuff
            )
            
            const elementalBuff = weaponDamageBuffs.find(buff => 
                buff.buff_type === "Elemental" && buff.name === selectedElementalBuff
            )
            
            const selectedAmmoBuffsList = weaponAmmoBuffs.filter(buff => 
                selectedAmmoBuffs.length > 0 && selectedAmmoBuffs.includes(buff.name)
            )
            
            const weaponPerkBuffs = selectedBuffsList.filter(buff => buff.buff_type === "Weapon Perk")
            const otherBuffs = selectedBuffsList.filter(buff => 
                !["Weapon Perk", "Elemental"].includes(buff.buff_type)
            )
            
            let bestPerkOne = null
            let bestPerkTwo = null
            let highestPerkOneAmount = 0
            let highestPerkTwoAmount = 0
            
            weaponPerkBuffs.forEach(buff => {
                const buffAmount = parseFloat(buff.buff_amount)
                
                if (weapon.perk_one && weapon.perk_one.toLowerCase().includes(buff.name.toLowerCase())) {
                    if (buffAmount > highestPerkOneAmount) {
                        highestPerkOneAmount = buffAmount
                        bestPerkOne = buff
                    }
                }
                
                if (weapon.perk_two && weapon.perk_two.toLowerCase().includes(buff.name.toLowerCase())) {
                    if (buffAmount > highestPerkTwoAmount) {
                        highestPerkTwoAmount = buffAmount
                        bestPerkTwo = buff
                    }
                }
            })
            
            const weaponBuffs = [
                ...(bestPerkOne ? [bestPerkOne] : []),
                ...(bestPerkTwo ? [bestPerkTwo] : []),
                ...otherBuffs,
                ...(surgeBuff ? [surgeBuff] : []),
                ...(elementalBuff ? [elementalBuff] : [])
            ]
            
            const weaponDebuffs = bossDebuffs.filter(debuff => 
                selectedDebuffs.length > 0 && selectedDebuffs.includes(debuff.name)
            )
            
            const weakenDebuff = bossDebuffs.find(debuff => 
                debuff.debuff_type === "Weaken" && debuff.name === selectedWeakenDebuff
            )
            
            const allWeaponDebuffs = [
                ...weaponDebuffs,
                ...(weakenDebuff ? [weakenDebuff] : [])
            ]
            
            const weaponPerkBuffsDisplay = weaponBuffs.filter(buff => buff.buff_type === "Weapon Perk")
            const abilityBuffsDisplay = weaponBuffs.filter(buff => buff.buff_type === "Ability")
            const exoticBuffsDisplay = weaponBuffs.filter(buff => buff.buff_type === "Exotic")
            const elementalBuffsDisplay = weaponBuffs.filter(buff => buff.buff_type === "Elemental")
            const surgeBuffsDisplay = weaponBuffs.filter(buff => buff.buff_type === "Surge")
            
            const ammoPerkBuffs = selectedAmmoBuffsList.filter(buff => buff.buff_type === "Weapon Perk")
            const ammoAbilityBuffs = selectedAmmoBuffsList.filter(buff => buff.buff_type === "Ability")
            const ammoExoticBuffs = selectedAmmoBuffsList.filter(buff => buff.buff_type === "Exotic")
            const ammoElementalBuffs = selectedAmmoBuffsList.filter(buff => buff.buff_type === "Elemental")
            const ammoSurgeBuffs = selectedAmmoBuffsList.filter(buff => buff.buff_type === "Surge")
            
            const applicableAmmoPerkBuffs = ammoPerkBuffs.filter(buff => 
                (weapon.perk_one && weapon.perk_one.toLowerCase().includes(buff.name.toLowerCase())) ||
                (weapon.perk_two && weapon.perk_two.toLowerCase().includes(buff.name.toLowerCase()))
            )
            
            const weaponPerkBuffsNames = [...weaponPerkBuffsDisplay, ...applicableAmmoPerkBuffs].map(buff => buff.name).join(', ') || 'None'
            const abilityBuffsNames = [...abilityBuffsDisplay, ...ammoAbilityBuffs].map(buff => buff.name).join(', ') || 'None'
            const exoticBuffsNames = [...exoticBuffsDisplay, ...ammoExoticBuffs].map(buff => buff.name).join(', ') || 'None'
            const elementalBuffsNames = [...elementalBuffsDisplay, ...ammoElementalBuffs].map(buff => buff.name).join(', ') || 'None'
            const surgeBuffsNames = [...surgeBuffsDisplay, ...ammoSurgeBuffs].map(buff => buff.name).join(', ') || 'None'
            
            const allBuffs = [
                ...(weaponPerkBuffsNames !== 'None' ? [`Weapon Perks: ${weaponPerkBuffsNames}`] : []),
                ...(abilityBuffsNames !== 'None' ? [`Abilities: ${abilityBuffsNames}`] : []),
                ...(exoticBuffsNames !== 'None' ? [`Exotics: ${exoticBuffsNames}`] : []),
                ...(elementalBuffsNames !== 'None' ? [`Elemental: ${elementalBuffsNames}`] : []),
                ...(surgeBuffsNames !== 'None' ? [`Surge: ${surgeBuffsNames}`] : [])
            ]
            const combinedBuffs = allBuffs.length > 0 ? allBuffs.join(' | ') : 'None'
            
            const buffNames = weaponBuffs.map(buff => buff.name).join(', ')
            const buffAmounts = weaponBuffs.map(buff => buff.buff_amount)
            
            let baseDamage = weapon.single_shot_damage || 0
            for (let i = 0; i < buffAmounts.length; i++) {
                baseDamage = baseDamage * (1 + parseFloat(buffAmounts[i]))
            }

            let highestDebuffAmount = 0
            let bestDebuff = null
            for (let i = 0; i < allWeaponDebuffs.length; i++) {
                const debuffAmount = parseFloat(allWeaponDebuffs[i].debuff_amount)
                if (debuffAmount > highestDebuffAmount) {
                    highestDebuffAmount = debuffAmount
                    bestDebuff = allWeaponDebuffs[i]
                }
            }
            
            const debuffNames = bestDebuff ? bestDebuff.name : 'None'

            const isUnlimitedAmmo = weapon.reserves >= 9999
            
            let effectiveReserves = weapon.reserves
            let effectiveMagSize = weapon.mag_size || 0
            let effectiveReloadTime = weapon.reload_time || 0
            
            const applicableAmmoBuffs = selectedAmmoBuffsList.filter(ammoBuff => {
                if (ammoBuff.buff_type === "Weapon Perk") {
                    return (weapon.perk_one && weapon.perk_one.toLowerCase().includes(ammoBuff.name.toLowerCase())) ||
                           (weapon.perk_two && weapon.perk_two.toLowerCase().includes(ammoBuff.name.toLowerCase()))
                }
                return true
            })
            
            // Calculate ammo generation effects FIRST (before other magazine buffs)
            let ammoGeneratedPerMag = 0
            applicableAmmoBuffs.forEach(ammoBuff => {
                if (ammoBuff.buff_function === "Ammo Generation") {
                    const requiredHits = parseInt(ammoBuff.buff_requirement_hits) || 0
                    const requiredTime = parseFloat(ammoBuff.buff_requirement_time) || 0
                    const ammoGenerated = parseFloat(ammoBuff.buff_amount) || 0
                    
                    if (requiredHits > 0 && requiredTime > 0 && effectiveMagSize > 0) {
                        const timeToFireRequiredHits = requiredHits / (weapon.rounds_per_min || 1) * 60
                        
                        if (timeToFireRequiredHits <= requiredTime) {
                            const triggersPerMag = Math.floor(effectiveMagSize / requiredHits)
                            ammoGeneratedPerMag += triggersPerMag * ammoGenerated
                            console.log(`Weapon: ${weapon.name}, Required Hits: ${requiredHits}, Required Time: ${requiredTime}s, Ammo Generated: ${ammoGenerated}, Triggers per Mag: ${triggersPerMag}, Total Ammo Generated per Mag: ${ammoGeneratedPerMag}`)
                        }
                    }
                }
            })
            
            // Apply ammo buff effects
            applicableAmmoBuffs.forEach(ammoBuff => {
                const buffAmount = parseFloat(ammoBuff.buff_amount)
                
                switch (ammoBuff.buff_function) {
                    case "Ammo Generation":
                        // Ammo generation is handled above - we add the generated ammo to magazine size
                        effectiveMagSize += ammoGeneratedPerMag
                        break
                        
                    case "Mag Boost":
                        effectiveMagSize += Math.floor(effectiveMagSize * buffAmount)
                        break
                        
                    case "Auto Reload":
                        effectiveReloadTime = Math.max(0, effectiveReloadTime - (effectiveReloadTime * buffAmount))
                        break
                }
            })
            
            const totalDamage = baseDamage * effectiveReserves * (1 + highestDebuffAmount)
            
            let totalTime = 0
            if (weapon.rounds_per_min && effectiveMagSize && effectiveReloadTime) {
                // effectiveMagSize already includes ammo generation from above
                const numMagazines = Math.ceil(effectiveReserves / effectiveMagSize)
                
                const fireTime = effectiveReserves / weapon.rounds_per_min * 60
                
                const numReloads = Math.max(0, numMagazines - 1)
                const reloadTime = numReloads * effectiveReloadTime
                
                totalTime = fireTime + reloadTime
                
                if (ammoGeneratedPerMag > 0) {
                    console.log(`Weapon: ${weapon.name}, Final Effective Mag Size: ${effectiveMagSize}, Num Magazines: ${numMagazines}, Total Time: ${totalTime.toFixed(1)}s`)
                }
            } else {
                totalTime = 100
            }
            
            let swapDamage = 0
            let swapTime = 0
            if (weapon.rounds_per_min && effectiveMagSize) {
                // effectiveMagSize already includes ammo generation from above
                const roundsInMag = Math.min(effectiveReserves, effectiveMagSize)
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
                buffs: combinedBuffs,
                total_damage: isUnlimitedAmmo ? '∞' : totalDamage.toString(),
                dps: dps,
                swap_damage: swapDamage.toString(),
                swap_dps: swapDps,
                swap_time: swapTime.toFixed(1) + 's',
                total_time: isUnlimitedAmmo ? '∞' : totalTime.toFixed(1) + 's',
            } as CombinedBossDamageData
        })
    }, [legendaryWeapons, weaponDamageBuffs, bossDebuffs, selectedBuffs, selectedDebuffs, selectedSurgeBuff, selectedWeakenDebuff, selectedElementalBuff, selectedAmmoBuffs])

    return {
        uniqueBuffs,
        uniqueDebuffs,
        uniqueAmmoBuffs,
        combinedBuffs,
        combinedData
    }
} 