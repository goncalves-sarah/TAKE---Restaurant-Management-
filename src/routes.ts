import { Router } from "express";
import { InitializeControllers } from "./initializeControllers";
import { ensureAuthenticateAdminMode } from "./middlewares/ensureAuthenticateAdminMode";
import { ensureAuthenticateRestaurant } from "./middlewares/ensureAuthenticateRestaurant";

const routes = Router();

const {
    createRestaurantController,
    editRestaurantController,
    deleteRestaurantController,
    getRestaurantDataController,
    resetAdminModeController,
    setAdminModeController,
    authenticateRestaurantController,
    getCityByUFController,
    createIngredientController,
    deleteIngredientController,
    getIngredientsByRestaurantDataController,
    getIngredientsWithTrainedModelsController,
    createRecipesController,
    editRecipeController,
    deleteRecipesController,
    getRecipesByRestaurantDataController,
    getRecipeByIDController,
    createPortionSizesController,
    deletePortionSizesController,
    getPortionSizesByRestaurantDataController,
    createOrdersController,
    editOrdersController,
    getFileteredOrdersByRestaurantDataController,
    collectIngredientDataController,
    getIngredientDataCollectedController,
    collectWeatherPeopleDataController,
    getForecastedDataController,
    getWeatherForecastController
} = new InitializeControllers();

routes.post('/restaurants', createRestaurantController().handle);
routes.post('/authenticate', authenticateRestaurantController().handle);
routes.post('/ingredients', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, createIngredientController().handle);
routes.post('/recipes', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, createRecipesController().handle);
routes.post('/portionsizes', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, createPortionSizesController().handle);
routes.post('/orders', ensureAuthenticateRestaurant, createOrdersController().handle);
routes.post('/data/collect/ingredients', ensureAuthenticateRestaurant, collectIngredientDataController().handle);
routes.post('/data/collect/additional', ensureAuthenticateRestaurant, collectWeatherPeopleDataController().handle);

routes.put('/restaurants', ensureAuthenticateRestaurant, editRestaurantController().handle);
routes.put('/recipes/:id_recipe', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, editRecipeController().handle);

routes.patch('/restaurants/admin', ensureAuthenticateRestaurant, setAdminModeController().handle);
routes.patch('/restaurants/reset/admin', ensureAuthenticateRestaurant, resetAdminModeController().handle);
routes.patch('/orders/:id_order', ensureAuthenticateRestaurant, editOrdersController().handle);

routes.get('/restaurants', ensureAuthenticateRestaurant, getRestaurantDataController().handle);
routes.get('/ingredients', ensureAuthenticateRestaurant, getIngredientsByRestaurantDataController().handle);
routes.get('/ingredients/trained_models', ensureAuthenticateRestaurant, getIngredientsWithTrainedModelsController().handle);
routes.get('/recipes/:id_recipe', ensureAuthenticateRestaurant, getRecipeByIDController().handle);
routes.get('/recipes', ensureAuthenticateRestaurant, getRecipesByRestaurantDataController().handle);
routes.get('/portionsizes', ensureAuthenticateRestaurant, getPortionSizesByRestaurantDataController().handle);
routes.get('/orders', ensureAuthenticateRestaurant, getFileteredOrdersByRestaurantDataController().handle);
routes.get('/data/today', ensureAuthenticateRestaurant, getIngredientDataCollectedController().handle);
routes.get('/:UF/cities', getCityByUFController().handle);
routes.get('/weather', getWeatherForecastController().handle);
routes.get('/forecast', ensureAuthenticateRestaurant, getForecastedDataController().handle);

routes.delete('/restaurants', ensureAuthenticateRestaurant, deleteRestaurantController().handle)
routes.delete('/ingredients/:id_ingredient', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, deleteIngredientController().handle);
routes.delete('/recipes/:id_recipe', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, deleteRecipesController().handle);
routes.delete('/portionsizes/:portion_id', ensureAuthenticateRestaurant, ensureAuthenticateAdminMode, deletePortionSizesController().handle);

export { routes };