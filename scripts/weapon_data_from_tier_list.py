import pandas as pd
import ast

def convert_csv_format(input_file, output_file, type):
    # Read the input CSV, skipping the first row (which contains "WEAPON,,INFO,,,,PERKS,,,TIER,")
    df = pd.read_csv(input_file, skiprows=1)
    
    # Rename columns to match target format
    df = df.rename(columns={
        'Name': 'name',
        'Affinity': 'affinity',
        'Frame': 'frame',
        'Enhance': 'enhanceable',
        'Reserves': 'reserves',
        'Column 1': 'perk_one',
        'Column 2': 'perk_two',
        'Origin Trait': 'origin_trait',
        'Icon': 'icon_url',
        'Tier': 'tier',
        'Rank': 'rank_in_type'
    })
    
    # Add type column
    df['type'] = type
    
    # Convert perk columns from newline-separated to comma-separated
    df['perk_one'] = df['perk_one'].str.replace('\n', ', ')
    df['perk_two'] = df['perk_two'].str.replace('\n', ', ')
    
    # Select and reorder columns to match target format
    columns = ['name', 'affinity', 'frame', 'enhanceable', 'reserves', 
              'perk_one', 'perk_two', 'origin_trait', 'icon_url', 'type', 'tier', 'rank_in_type']
    df = df[columns]
    
    # Save to new CSV
    df.to_csv(output_file, index=False)

# Example usage
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Rockets.csv', 'rockets.csv', 'Rocket Sidearm')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - LFRs.csv', 'lfrs.csv', 'Linear Fusion Rifle')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Swords.csv', 'swords.csv', 'Sword')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - HGLs-2.csv', 'hgl.csv', 'Heavy Grenade Launcher')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - LMGs.csv', 'lmg.csv', 'Machine Gun')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Rocket Sidearms.csv', 'rocket_sidearms.csv', 'Rocket Sidearm')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Glaives.csv', 'glaives.csv', 'Glaive')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - BGLs.csv', 'bgl.csv', 'Breach Grenade Launcher')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Fusions.csv', 'fusions.csv', 'Fusion Rifle')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Snipers.csv', 'snipers.csv', 'Sniper Rifle')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Shotguns.csv', 'shotguns.csv', 'Shotgun')
convert_csv_format('../../Downloads/Destiny 2_ Endgame Analysis - Traces.csv', 'traces.csv', 'Trace Rifle')