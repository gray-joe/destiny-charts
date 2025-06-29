import BossDamageTable from '@/app/ui/boss-damage/Table'
import { fetchLegendaryWeaponsForBossDamage, fetchWeaponDamageBuffs, fetchBossDebuffs } from '@/app/lib/data'

export default async function Page() {
    const legendaryWeapons = await fetchLegendaryWeaponsForBossDamage()
    const weaponDamageBuffs = await fetchWeaponDamageBuffs()
    const bossDebuffs = await fetchBossDebuffs()

    return (
        <>
             <BossDamageTable 
                legendaryWeapons={legendaryWeapons} 
                weaponDamageBuffs={weaponDamageBuffs} 
                bossDebuffs={bossDebuffs} 
             />
        </>
    )
}

