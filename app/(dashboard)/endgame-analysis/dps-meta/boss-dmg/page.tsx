import BossDamageTable from '@/app/ui/boss-damage/Table'
import { fetchAllWeaponsForBossDamage, fetchWeaponDamageBuffs, fetchBossDebuffs, fetchWeaponAmmoBuffs } from '@/app/lib/data'

export default async function Page() {
    const weapons = await fetchAllWeaponsForBossDamage()
    const weaponDamageBuffs = await fetchWeaponDamageBuffs()
    const bossDebuffs = await fetchBossDebuffs()
    const weaponAmmoBuffs = await fetchWeaponAmmoBuffs()

    return (
        <>
             <BossDamageTable 
                legendaryWeapons={weapons} 
                weaponDamageBuffs={weaponDamageBuffs} 
                bossDebuffs={bossDebuffs} 
                weaponAmmoBuffs={weaponAmmoBuffs}
             />
        </>
    )
}

