import { fetchTierList } from '@/app/lib/data';
import WeaponsTable from '@/app/ui/weapons-tier-list/table';
import { notFound } from 'next/navigation';

// Map route parameters to weapon types and display names
const weaponTypes = {
  'lfrs': {
    type: 'Linear Fusion Rifle',
    display: 'Linear Fusion Rifles'
  },
  'shotguns': {
    type: 'Shotgun',
    display: 'Shotguns'
  },
  'heavy-gls': {
    type: 'Heavy Grenade Launcher',
    display: 'Heavy Grenade Launchers'
  },
  'rocket-sidearms': {
    type: 'Rocket Sidearm',
    display: 'Rocket Sidearms'
  },
  'rockets': {
    type: 'Rocket',
    display: 'Rockets'
  },  
  'swords': {
    type: 'Sword',
    display: 'Swords'
  },
  'breach-gls': {
    type: 'Breach Grenade Launcher',
    display: 'Breach Grenade Launchers'
  },
  'glaives': {
    type: 'Glaive',
    display: 'Glaives'
  },
  'fusions': {
    type: 'Fusion Rifle',
    display: 'Fusion Rifles'
  },
  'trace-rifles': {
    type: 'Trace Rifle',
    display: 'Trace Rifles'
  },
  'snipers': {
    type: 'Sniper',
    display: 'Snipers'
  },
  'mgs': {
    type: 'Machine Gun',
    display: 'Machine Guns'
  },
} as const;

// Type safety for our route parameters
export function generateStaticParams() {
  const params = Object.keys(weaponTypes).map((type) => ({
    type,
  }));
  return params;
}

export default async function Page({ params }: { params: { type: string } }) {
  const weaponType = weaponTypes[params.type as keyof typeof weaponTypes];
  
  if (!weaponType) {
    notFound();
  }

  const weapons = await fetchTierList(weaponType.type);
  
  return (
    <>
      <h1>{weaponType.display}</h1>
      <WeaponsTable weapons={weapons} />
    </>
  );
}