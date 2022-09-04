from os import listdir
import pathlib
from os.path import isfile, join
import json
import platform

def get_ingredients(id_restaurant):

    path = pathlib.Path(__file__).parent.resolve()

    my_os = platform.system()
    path = f'{path}\\models'
    path = path if my_os == 'Windows' else path.replace("\\","/")

    files = [f for f in listdir(path) if isfile(join(path, f))]   
    ingredients = []

    for f in files:
        ingredient = f.split("Model")[0]
        ingredients.append(ingredient) 

    return json.dumps(ingredients)