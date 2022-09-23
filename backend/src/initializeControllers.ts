import { AuthenticateRestaurantController } from "./modules/account/authenticateRestaurant/AuthenticateRestaurantController";
import { CollectIngredientsDataController } from "./modules/dataGathering/collectIngredientData/CollectIngredientsDataController";
import { CollectWeatherPeopleDataController } from "./modules/dataGathering/collectWeatherPeopleData/CollectWeatherPeopleDataController";
import { GetIngredientsDataCollectedTodayController } from "./modules/dataGathering/geIngredientDataCollectedToday/GetIngredientsDataCollectedTodayController";
import { GetCityByUFController } from "./modules/external_API/IBGE_Localidades/GetCityByUFController";
import { GetWeatherForecastController } from "./modules/external_API/weatherAPI/GetWeatherForecastController";
import { GetForecastedDataController } from "./modules/forecast/GetForecastedDataController";
import { CreateIngredientsController } from "./modules/ingredients/createIngredient/CreateIngredientsController";
import { DeleteIngredientsController } from "./modules/ingredients/deleteIngredient/DeleteIngredientsController";
import { GetIngredientsByRestaurantController } from "./modules/ingredients/getIngredientsByRestaurant/GetIngredientsByRestaurantController";
import { GetIngredientsWithTrainedModelsController } from "./modules/ingredients/getIngredientsWithTrainedModels/GetIngredientsWithTrainedModelsController";
import { CreateOrdersController } from "./modules/orders/createOrders/CreateOrdersController";
import { DeleteAllOrdersController } from "./modules/orders/deleteAllOrders/DeleteAllOrdersController";
import { EditOrdersController } from "./modules/orders/editOrders/EditOrdersController";
import { GetFilteredOrdersByRestaurantController } from "./modules/orders/getFilteredOrdersByRestaurant/GetFilteredOrdersByRestaurantController";
import { CreatePortionSizesController } from "./modules/portion_sizes/createPortionSizes/CreatePortionSizesController";
import { DeletePortionSizesController } from "./modules/portion_sizes/deletePortionSizes/DeletePortionSizesController";
import { GetPortionSizesByRestaurantController } from "./modules/portion_sizes/getPortionSizesByRestaurant/GetPortionSizesByRestaurantController";
import { CreateRecipesController } from "./modules/recipes/createRecipe/CreateRecipesController";
import { DeleteRecipesController } from "./modules/recipes/deleteRecipe/DeleteRecipesController";
import { EditRecipesController } from "./modules/recipes/editRecipe/EditRecipesController";
import { GetRecipeByIDController } from "./modules/recipes/getRecipeByID/GetRecipeByIDController";
import { GetRecipesByRestaurantController } from "./modules/recipes/getRecipesByRestaurant/GetRecipesByRestaurantController";
import { CreateRestaurantController } from "./modules/restaurants/createRestaurant/CreateRestaurantController";
import { DeleteRestaurantController } from "./modules/restaurants/deleteRestaurant/DeleteRestaurantController";
import { EditRestaurantController } from "./modules/restaurants/editRestaurant/EditRestaurantController";
import { GetRestaurantDataController } from "./modules/restaurants/getRestaurantData/GetRestaurantDataController";
import { ResetAdminModeController } from "./modules/restaurants/resetAdminMode/ResetAdminModeController";
import { SetAdminModeController } from "./modules/restaurants/setAdminMode/SetAdminModeController";

class InitializeControllers {

    createRestaurantController() {
        return new CreateRestaurantController();
    }

    editRestaurantController() {
        return new EditRestaurantController();
    }

    deleteRestaurantController() {
        return new DeleteRestaurantController();
    }

    getRestaurantDataController() {
        return new GetRestaurantDataController();
    }

    resetAdminModeController() {
        return new ResetAdminModeController();
    }

    setAdminModeController() {
        return new SetAdminModeController();
    }

    authenticateRestaurantController() {
        return new AuthenticateRestaurantController();
    }

    getCityByUFController() {
        return new GetCityByUFController();
    }

    // INGREDIENTS

    createIngredientController() {
        return new CreateIngredientsController();
    }

    deleteIngredientController() {
        return new DeleteIngredientsController();
    }

    getIngredientsByRestaurantDataController() {
        return new GetIngredientsByRestaurantController();
    }

    getIngredientsWithTrainedModelsController() {
        return new GetIngredientsWithTrainedModelsController();
    }

    // RECIPES

    createRecipesController() {
        return new CreateRecipesController();
    }

    editRecipeController() {
        return new EditRecipesController();
    }

    deleteRecipesController() {
        return new DeleteRecipesController();
    }

    getRecipesByRestaurantDataController() {
        return new GetRecipesByRestaurantController();
    }

    getRecipeByIDController() {
        return new GetRecipeByIDController();
    }

    // PORTION SIZES

    createPortionSizesController() {
        return new CreatePortionSizesController();
    }

    deletePortionSizesController() {
        return new DeletePortionSizesController();
    }

    getPortionSizesByRestaurantDataController() {
        return new GetPortionSizesByRestaurantController();
    }

    // ORDERS

    createOrdersController() {
        return new CreateOrdersController();
    }

    editOrdersController() {
        return new EditOrdersController();
    }

    getFileteredOrdersByRestaurantDataController() {
        return new GetFilteredOrdersByRestaurantController();
    }

    deleteAllRestaurantOrdersController() {
        return new DeleteAllOrdersController();
    }


    // COLLECT INGREDIENT DATA

    collectIngredientDataController() {
        return new CollectIngredientsDataController();
    }

    getIngredientDataCollectedController() {
        return new GetIngredientsDataCollectedTodayController();
    }

    // COLLECT WEATHER/PEOPLE DATA

    collectWeatherPeopleDataController() {
        return new CollectWeatherPeopleDataController();
    }

    // FORECAST - PREDICTION

    getForecastedDataController() {
        return new GetForecastedDataController();
    }

    // WEATHER API FORECAST

    getWeatherForecastController() {
        return new GetWeatherForecastController();
    }

}


export { InitializeControllers }

