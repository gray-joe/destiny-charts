export type Weapon = {
    id: string
    name: string
    affinity: string
    frame: string
    reserves: number
    mag_size: number
    reload_speed: number
    rounds_per_min: number
    perks_third: string
    perks_fourth: string
    origin_trait: string
    icon_url: string
    type: string
    tier: string
    rank: number
}

export type SuperRegen = {
    time: string
    chore_of_one: number
    ergo_sum: number
    microcosm: number
    outbreak_perfected: number
    rat_king: number
    retrofit_escapade: number
    riskrunner: number
    rufus_fury: number
    scatter_signal: number
    tarrabah: number
    thunderlord: number
    tommys_mathcbook: number
    touch_of_malice: number
    wardens_law: number
    witherhoard_chill_inhibitor: number
}

export type SustainedBossDamage = {
    id: string
    name: string
    type: string
    count: number
    notes: string
    distribution: string
    rate: string
    time: string
    base: string
    perk: string
    surge: string
    buff: string
    debuff: string
    single: string
    total: string
    burst: string
    sustained: string
}

export type Abilities = {
    id: string
    icon_url: string
    updated_at: string
    type: string
    name: string
    modifiers: string
    wipe: string
    count: number
    percentage: string
    actual: string
    ratio: string
    deviation: string
}

export type SwapBossDamage = {
    id: string
    updated_at: string
    name: string
    type: string
    icon_url: string
    base: string
    perk: string
    surge: string
    buff: string
    debuff: string
    total: string
    ready: string
    fire: string
    stow: string
    swap_time: string
    total_time: string
    swap_dps: string
    true_dps: string
}

export type LegendaryWeaponForBossDamage = {
    id: string,
    name: string,
    icon_url: string,
    type: string,
    frame: string,
    reserves: number,
    single_shot_damage?: number,
    perk_one?: string,
    perk_two?: string,
    rounds_per_min?: number,
    mag_size?: number,
    reload_time?: number,
}

export type WeaponDamageByType = {
    type: string,
    frame: string,
    single_shot_damage: number,
}

export type WeaponDamageBuff = {
    id: string,
    updated_at: string,
    weapon_type: string,
    weapon_frame: string,
    buff_amount: string,
    buff_type: string,
    priority: string,
    name: string,
}

export type BossDebuff = {
    id: number,
    updated_at: string,
    name: string,
    debuff_type: string,
    debuff_amount: string,
    priority: string,
}

export type WeaponAmmoBuff = {
    id: string,
    updated_at: string,
    weapon_type: string,
    weapon_frame: string,
    buff_amount: string,
    buff_type: string,
    name: string,
    weapon_element: string,
    buff_requirement_hits: string,
    buff_requirement_time: string,
    buff_function: string,
}

export type ExoticWeapon = {
    id: string
    name: string
    icon_url: string
    description?: string
}

export type ExoticTierListItem = {
    exotic_weapon_id?: string
    exotic_armor_id?: string
    name: string
    icon_url: string
    ad_clear: number
    champions: number
    survivability: number
    movement: number
    dps: number
    support: number
}

export type ExoticArmor = {
    id: string
    name: string
    icon_url: string
    description?: string
}

export type AspectData = {
    name: string
    icon_url: string
}

export type FragmentData = {
    name: string
    icon_url: string
}

export type ActivityData = {
    name: string
    icon_url: string
    type: string
}

export type Build = {
    id: string
    updated_at: string
    name: string
    class: string
    subclass: string
    background_image: string
    description?: string
    exotic_armor: string[]
    exotic_weapon: string[]
    legendary_weapons: string
    aspects: AspectData[]
    fragments: FragmentData[]
    super_ability: string[]
    exotic_armor_id?: string
    exotic_weapon_id?: string
    super_ability_id?: string
    activity_ids?: string[]
    activities: ActivityData[]
    aspect_ids?: string[]
    fragment_ids?: string[]
}

export type Activity = {
    id: string
    name: string
    icon_url: string
    type: string
}

export type Aspect = {
    id: string
    icon_url: string
    name: string
    description: string
}

export type Fragment = {
    id: string
    icon_url: string
    name: string
    description: string
}

export type Ability = {
    id: string
    icon_url: string
    name: string
    description: string
}

export type Subclass = {
    id: string
    name: string
    icon_url: string
}

export type ArtifactPerk = {
    season: number
    column_number: number
    row: number
    name: string
    description: string
    icon_url: string
}

export type BaseActivity = {
    id: string
    name: string
    imageUrl?: string
    iconUrl?: string
    subActivities?: BaseActivity[]
}

export type EncounterActivity = BaseActivity

export type SubActivity = BaseActivity & {
    subActivities?: EncounterActivity[]
}

export type MainActivity = BaseActivity & {
    subActivities?: SubActivity[]
}

export type SubclassVerb = {
    id: string
    updated_at: string
    name: string
    icon_url: string
    description: string
}
