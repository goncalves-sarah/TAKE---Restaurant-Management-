import sys
import pickle
import pandas as pd
import requests
import pathlib
import numpy as np
import warnings
import json

path = pathlib.Path(__file__).parent.resolve().parents[1]

days_to_be_forecasted = int(sys.argv[1])
ingredients = sys.argv[2].split("-")
restaurant_id = sys.argv[3]

weather = requests.get("http://localhost:3000/weather",json = {
            "days" : days_to_be_forecasted,
        }).json()

days = []
temperature = []
precipitation = []

for e in weather: 
   days.append(e['date'])
   temperature.append(e['temperature'])
   precipitation.append(e['precipitation'])


df = pd.DataFrame()
df['Date'] = pd.Series(days)
df['Temperature'] = pd.Series(temperature)
df['Precipitation'] = pd.Series(precipitation)
df = df.set_index('Date')

days_to_be_forecasted = len(temperature)

df_exogenous = df[['Temperature','Precipitation']]
df_exogenous.index = pd.DatetimeIndex(df.index).to_period('D')

results = {}

for ingredient in ingredients: 
    filename = f'{path}\models\\{restaurant_id}_{ingredient}Model.sav'
    
    model = pickle.load(open(filename, 'rb'))
    warnings.filterwarnings('ignore')
    prediction = model.forecast(steps = days_to_be_forecasted, exog = df_exogenous).reset_index(drop = True)
    
    df[ingredient] = np.round(prediction.values,2)

for d in days:
    element = df[d == df.index]
    
    info = {}
    for i in ingredients:
        info[i] = element[ingredient].values[0]

    results[d] = info

results = json.dumps(results)
print(results)
