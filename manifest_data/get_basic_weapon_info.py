import sqlite3
import json
import csv

conn = sqlite3.connect("./world_sql_content_1b6c4f6472504c5968a0523f37ed3508.content")
cursor = conn.cursor()

cursor.execute("SELECT id, json FROM DestinyInventoryItemDefinition;")
rows = cursor.fetchall()

legendary_items = []

for item_id, json_str in rows:
    item_data = json.loads(json_str)
    name = item_data.get("displayProperties", {}).get("name")
    item_hash = item_data.get("hash")
    icon_url = item_data.get("displayProperties", {}).get("icon")
    item_type = item_data.get("itemTypeAndTierDisplayName")
    mag_size = item_data.get("stats", {}).get("stats", {}).get("3871231066", {}).get("value")
    rounds_per_min = item_data.get("stats", {}).get("stats", {}).get("4284893193", {}).get("value")
    ammo_type = item_data.get("equippingBlock", {}).get("ammoType")
    element = item_data.get("defaultDamageType")

    socket_entries = item_data.get("sockets", {}).get("socketEntries", [])
    frame = socket_entries[0].get("singleInitialItemHash") if socket_entries else None
    third_column_perk_hash = socket_entries[3].get("randomizedPlugSetHash") if len(socket_entries) > 3 else None
    fourth_column_perk_hash = socket_entries[4].get("randomizedPlugSetHash") if len(socket_entries) > 4 else None
    origin_trait_hash = socket_entries[8].get("singleInitialItemHash") if len(socket_entries) > 8 else None
    
    collectible_hash = item_data.get("collectibleHash")
    weapon_types = [
        "Legendary Machine Gun",
        "Legendary Shotgun",
        "Legendary Sniper Rifle",
        "Legendary Trace Rifle",
        "Legendary Fusion Rifle",
        "Legendary Glaive",
        "Legendary Sword",
        "Legendary Linear Fusion Rifle",
        "Legendary Rocket Launcher",
        "Legendary Breach Grenade Laucnher",
        "Legendary Heavy Grenade Launcher",
        "Legendary Sidearm",
    ]
    if item_type in weapon_types and collectible_hash:
        excluded_strings = ["Adept", "Timelost", "Harrowed"]
        if not any(x in name for x in excluded_strings):
            legendary_items.append({
                "bungie_item_hash": item_hash,
                "name": name,
                "icon_url": icon_url,
                "mag_size": mag_size,
                "rounds_per_min": rounds_per_min,
                "ammo_type": ammo_type,
                "element": element,
                "frame": frame,
                "third_column_perk_hash": third_column_perk_hash,
                "fourth_column_perk_hash": fourth_column_perk_hash,
                "origin_trait_hash": origin_trait_hash,
            })

unique_plug_set_hashes = set()
for item in legendary_items:
    if item["third_column_perk_hash"]:
        unique_plug_set_hashes.add(item["third_column_perk_hash"])
    if item["fourth_column_perk_hash"]:
        unique_plug_set_hashes.add(item["fourth_column_perk_hash"])

cursor.execute("SELECT id, json FROM DestinyPlugSetDefinition;")
rows = cursor.fetchall()

plug_set_data = {}
for plug_set_id, json_str in rows:
    plug_set_data_json = json.loads(json_str)
    plug_set_hash = plug_set_data_json.get("hash")
    if plug_set_hash in unique_plug_set_hashes:
        perk_hashes = [plug_item.get("plugItemHash") for plug_item in plug_set_data_json.get("reusablePlugItems", [])]
        plug_set_data[plug_set_hash] = {
            "perk_hashes": perk_hashes,
            "hash": plug_set_hash
        }

for item in legendary_items:
    item["third_column_perks"] = plug_set_data.get(item["third_column_perk_hash"], {}).get("perk_hashes", [])
    item["fourth_column_perks"] = plug_set_data.get(item["fourth_column_perk_hash"], {}).get("perk_hashes", [])


with open("legendary_items.csv", "w", newline='') as f:
    if legendary_items:
        fieldnames = legendary_items[0].keys()
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        
        writer.writeheader()
        
        writer.writerows(legendary_items)