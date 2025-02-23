UPDATE dps_sustained ds
SET exotic_weapon_id = ew.id
FROM exotic_weapons ew
WHERE ds.name ILIKE '%' || ew.name || '%';