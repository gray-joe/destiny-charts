export type Weapon = {
  id: string;
  type: string;
  icon_url: string;
  name: string;
  affinity: string;
  frame: string;
  enhanced: boolean;
  reserves: number;
  perk_one: string;
  perk_two: string;
  origin_trait: string;
  rank_in_type: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
};

export type SuperRegen = {
  time: string;
  chore_of_one: number;
  ergo_sum: number;
  microcosm: number;
  outbreak_perfected: number;
  rat_king: number;
  retrofit_escapade: number;
  riskrunner: number;
  rufus_fury: number;
  scatter_signal: number;
  tarrabah: number;
  thunderlord: number;
  tommys_mathcbook: number;
  touch_of_malice: number;
  wardens_law: number;
  witherhoard_chill_inhibitor: number;
}

export type SustainedBossDamage = {
  id: string;
  name: string;
  type: string;
  count: number;
  notes: string;
  distribution: string;
  rate: string;
  time: string;
  base: string;
  perk: string;
  surge: string;
  buff: string;
  debuff: string;
  single: string;
  total: string;
  burst: string;
  sustained: string;
}

export type Abilities = {
  id: string;
  icon_url: string;
  updated_at: string;
  type: string;
  subtype: string;
  modifiers: string;
  wipe: string;
  count: number;
  percentage: string;
  actual: string;
  ratio: string;
  deviation: string;
}

export type SwapBossDamage = {
  id: string;
  updated_at: string;
  name: string;
  type: string;
  icon_url: string;
  base: string;
  perk: string;
  surge: string;
  buff: string;
  debuff: string;
  total: string;
  ready: string;
  fire: string;
  stow: string;
  swap_time: string;
  total_time: string;
  swap_dps: string;
  true_dps: string;
}
