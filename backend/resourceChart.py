import matplotlib.pyplot as plt
import io
import geopandas as gpd
import json
import matplotlib
matplotlib.use('agg')

def generate_chart():
    with open('resources.json', 'r') as file:
        json_data = json.load(file)

    geo_df = gpd.GeoDataFrame.from_features(json_data["features"])
    color_map = {
        "3": 'green',
        "2": 'yellow',
        "1": 'red',
        
    }
    #giveScores()
    
    # Dynamically create a 'color' column based on the property
    if 'camp_exists' in geo_df.columns:
        geo_df['color'] = geo_df['camp_exists'].map(color_map)
    else:
        raise KeyError("The column 'district_type' does not exist in the data.")

    
    # Plot with the dynamically assigned colors
    fig, ax = plt.subplots(1, 1, figsize=(10, 8))
    fig.patch.set_facecolor('black')
    ax.set_facecolor('black')
    geo_df.plot(ax=ax, color=geo_df['color'],edgecolor='black')
    plt.title("Districts Colored by Property")
    
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    #plt.show()
    return img

def giveScores():
    

    # File paths
    input_file = "resources.json"   # The file containing the original JSON data
    output_file = "resources.json" # The file to save the updated JSON data

    # Read JSON data from a file
    with open(input_file, "r") as file:
        data = json.load(file)

   
    metrics = ["water", "food_rations", "medkits", "ammo"]
    weights = {"water": 0.4, "food_rations": 0.3, "medkits": 0.2, "ammo": 0.1}

    totals = {metric: 0 for metric in metrics}
    for feature in data["features"]:
        for metric in metrics:
            if feature["properties"][metric] != None:
                totals[metric] += feature["properties"][metric]

    averages = {metric: totals[metric] / len(data["features"]) for metric in metrics}

    
    for feature in data["features"]:
        properties = feature["properties"]
        score = 0
        
        
        for metric in metrics:
            if properties[metric] != None:
                normalized_score = properties[metric] / averages[metric]
                score += normalized_score * weights[metric]
        
        
        if properties["camp_exists"]:
            score += 0.1
        
        
        if score > 2.8:
            properties["camp_exists"] = "3"
        elif score > 1.5:
            properties["camp_exists"] = "2"
        else:
            properties["camp_exists"] = "1"

    
    with open(output_file, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Updated JSON data has been saved to {output_file}.")


    # Sort districts by score
    #district_scores.sort(key=lambda x: x["score"], reverse=True)

