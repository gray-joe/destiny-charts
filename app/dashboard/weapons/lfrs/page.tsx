import { fetchLfrTierList } from '@/app/lib/data';
import WeaponsTable from '@/app/ui/weapons-tier-list/table';

export default async function Page() {
  const weapons = await fetchLfrTierList();
  const filteredWeapons = weapons.filter(weapon => weapon.tier !== 'F');
  return (
    <>
      <h1>LFRs</h1>
      <WeaponsTable weapons={filteredWeapons} />
    </>
  );
}