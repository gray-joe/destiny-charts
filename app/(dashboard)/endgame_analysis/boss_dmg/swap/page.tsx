import SwapDamageTable from "@/app/ui/boss_damage_table/swap_table";
import { fetchSwapBossDamageData } from "@/app/lib/data";

export default async function Page() {
  const data = await fetchSwapBossDamageData();
  
  return (
    <>
      <SwapDamageTable data={data} />
    </>
  );
}