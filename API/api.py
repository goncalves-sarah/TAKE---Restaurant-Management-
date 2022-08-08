from flask import Flask, jsonify, request 
from forecastingModel import forecast
from getIngredientsWithModels import get_ingredients

app = Flask(__name__)

@app.route('/forecast', methods=['GET'])
def get_prediction():
    args = request.args

    ingredients = args.get("ingredients")
    days_to_be_forecasted = args.get("days_to_be_forecasted")
    id_restaurant = args.get("id_restaurant")
    
    predictions = forecast(id_restaurant, ingredients, days_to_be_forecasted)
    
    return predictions

@app.route('/ingredients', methods=['GET'])
def get_ingredients_with_models():
    args = request.args
    
    id_restaurant = args.get("id_restaurant")
    ingredients = get_ingredients(id_restaurant)

    return ingredients

@app.route('/', methods=['GET'])
def index():
    return "<h1>This is the API that has the trained models</h1>"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')