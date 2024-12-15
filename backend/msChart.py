
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point
import matplotlib.pyplot as plt
import json
import io
import matplotlib
matplotlib.use('agg')

def generate_chart():
    with open('resources.json', 'r') as file:
        resource_data = json.load(file)

    base_map = gpd.GeoDataFrame.from_features(resource_data["features"])
    
    with open('monsters.json', 'r') as file:
        monster_data = json.load(file)
        
    monster_df = pd.DataFrame(monster_data["monsters"])
    monster_geometry = [Point(xy) for xy in zip(monster_df['lon'], monster_df['lat'])]
    monsters_gdf = gpd.GeoDataFrame(monster_df, geometry=monster_geometry, crs="EPSG:4326")  
    
    with open('survivors.json', 'r') as file:
        survivor_data = json.load(file)
    survivor_df = pd.DataFrame(survivor_data)
    survivor_geometry = [Point(xy) for xy in zip(survivor_df['lon'], survivor_df['lat'])]
    survivors_gdf = gpd.GeoDataFrame(survivor_df, geometry=survivor_geometry, crs="EPSG:4326")
    
    
    
    # Step 4: Plot the base map, monsters, and survivors
    fig, ax = plt.subplots(1, 1, figsize=(12, 10))
    fig.patch.set_facecolor('black')
    ax.set_facecolor('black')
    
    
    # Plot the base map
    if base_map is not None:
        base_map.plot(ax=ax, color='black', edgecolor='green')
        
    # Plot the monsters
    monsters_gdf.plot(ax=ax, color='red', markersize=50, label="Monsters")
    
    survivors_gdf.plot(ax=ax, color='blue', markersize=50, label="Survivors")
    
    
    # Add a legend and title
    plt.legend()
    plt.title("Monsters and Survivors on the Map")
    
    
    
    
    # Optionally, add labels for survivors and monsters
    # for x, y, label in zip(survivors_gdf.geometry.x, survivors_gdf.geometry.y, survivors_gdf["survivor_id"]):
    #     ax.text(x, y, label, fontsize=8, color='blue', ha='right')

    for x, y, label in zip(monsters_gdf.geometry.x, monsters_gdf.geometry.y, monsters_gdf["monster_id"]):
        ax.text(x, y, label, fontsize=8, color='red', ha='left')
    
    
    
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    return img

    
    
    
    
    
    
    
    

    
    
    
    