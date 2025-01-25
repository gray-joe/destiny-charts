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
