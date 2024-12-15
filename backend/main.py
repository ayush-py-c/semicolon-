from flask import Flask, send_file
import matplotlib.pyplot as plt
import matplotlib
import io
import requests
import geopandas as gpd
import pandas as pd
import json

import resourceChart
import msChart

app = Flask(__name__)
matplotlib.use('agg')
@app.route('/resources', methods=['GET'])
def display_resource_chart():
    
    # Return the image as a response
    return send_file(resourceChart.generate_chart(), mimetype='image/png')


@app.route('/monster_survivors', methods=['GET'])
def display_monster_survivor_chart():
    return send_file(msChart.generate_chart(), mimetype='image/png')    
    
    

def loadData():
    r = requests.get('https://api.mlsakiit.com/resources')
    if r.status_code == 200:
        
        json_data = r.json()
        with open('resources.json','w') as f:
            json.dump(json_data,f)
    r = requests.get('https://api.mlsakiit.com/monsters')
    if r.status_code == 200: 
       
        json_data = r.json()
        with open('monsters.json','w') as f:
            json.dump(json_data,f)
    r = requests.get('https://api.mlsakiit.com/survivors')
    if r.status_code == 200:  
        
        json_data = r.json()
        with open('survivors.json','w') as f:
            json.dump(json_data,f)

#FETCH and Store all the json files 
# We call it before Server is ran
# loadData()
# resourceChart.giveScores()             
app.run(port=5000)
#display_resource_chart()

