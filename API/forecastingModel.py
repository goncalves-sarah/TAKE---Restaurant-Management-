import sys
import pickle
import pandas as pd
import requests
import pathlib
import numpy as np
import warnings
import json
import platform

def forecast(id_restaurant, ingredients, days_to_be_forecasted):

    try: 
        path = pathlib.Path(__file__).parent.resolve()

        days_to_be_forecasted = int(days_to_be_forecasted)
        ingredients = ingredients.split("-")

        weather = requests.get("https://take-backend.herokuapp.com/weather",json = {
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
        ingredient_has_model = []
        my_os = platform.system()

        for ingredient in ingredients: 
            
            filename = f'{path}\models\\{ingredient}Model.sav'
            filename = filename if my_os == 'Windows' else filename.replace("\\","/")
            
            try:

                model = pickle.load(open(filename, 'rb'))
                
                warnings.filterwarnings('ignore')
                prediction = model.forecast(steps = days_to_be_forecasted, exog = df_exogenous).reset_index(drop = True)
                if isinstance(prediction, pd.DataFrame):
                    prediction = prediction[ingredient]
                df[ingredient] = np.round(prediction.values,2)
                ingredient_has_model.append(ingredient)
            
            except:
                pass

        for d in days:
            element = df[d == df.index]
            
            info = {}
            for i in ingredient_has_model:
                info[i] = element[i].values[0]

            results[d] = info

        if len(ingredient_has_model) == 0:
            results = {}
        
        results = json.dumps(results)
            
        return results
    except:
        return json.dumps({error: "Houve um problema, tente novamente"})