import sqlite3
import json
import csv

conn = sqlite3.connect("./world_sql_content_1b6c4f6472504c5968a0523f37ed3508.content")
cursor = conn.cursor()

cursor.execute("SELECT id, json FROM DestinyInventoryItemDefinition;")
rows = cursor.fetchall()

frame_names = []

for item_id, json_str in rows:
    item_data = json.loads(json_str)
    name = item_data.get("displayProperties", {}).get("name")
    item_hash = item_data.get("hash")
    icon_url = item_data.get("displayProperties", {}).get("icon")
    if item_data.get("itemTypeAndTierDisplayName") == "Legendary Intrinsic":
        frame_names.append({
            "bungie_item_hash": item_hash,
            "name": name,
            "icon_url": icon_url,
        })


with open("frame_names.csv", "w", newline='') as f:
    if frame_names:
        fieldnames = frame_names[0].keys()
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        
        writer.writeheader()
        
        writer.writerows(frame_names)