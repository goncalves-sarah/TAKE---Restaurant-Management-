from os import listdir
import pathlib
from os.path import isfile, join
import json

def get_ingredients(id_restaurant):

    path = pathlib.Path(__file__).parent.resolve()

    path = f'{path}\models'

    files = [f for f in listdir(path) if isfile(join(path, f))]   
    ingredients = []

    for f in files:
        if(f.split("_")[0] == id_restaurant):
            ingredient = f.split("_")[1].split("Model")[0]
            ingredients.append(ingredient) 

    return json.dumps(ingredients)