import { Router } from "express";
import { InitializeControllers } from "./initializeControllers";
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
    deleteAllRestaurantOrdersController,
    collectIngredientDataController,
    getIngredientDataCollectedController,
    collectWeatherPeopleDataController,
    getForecastedDataController,
    getWeatherForecastController,
    sendPasswordResetMailController,
    resetPassword
} = new InitializeControllers();

routes.post('/restaurants', createRestaurantController().handle);
routes.post('/authenticate', authenticateRestaurantController().handle);
routes.post('/forgot-password', sendPasswordResetMailController().handle);
routes.post('/ingredients', ensureAuthenticateRestaurant, createIngredientController().handle);
routes.post('/recipes', ensureAuthenticateRestaurant, createRecipesController().handle);
routes.post('/portionsizes', ensureAuthenticateRestaurant, createPortionSizesController().handle);
routes.post('/orders', ensureAuthenticateRestaurant, createOrdersController().handle);
routes.post('/data/collect/ingredients', ensureAuthenticateRestaurant, collectIngredientDataController().handle);
routes.post('/data/collect/additional', ensureAuthenticateRestaurant, collectWeatherPeopleDataController().handle);

routes.put('/restaurants', ensureAuthenticateRestaurant, editRestaurantController().handle);
routes.put('/recipes/:id_recipe', ensureAuthenticateRestaurant, editRecipeController().handle);

routes.patch('/reset-password', ensureAuthenticateRestaurant, resetPassword().handle);
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
routes.delete('/orders', ensureAuthenticateRestaurant, deleteAllRestaurantOrdersController().handle)
routes.delete('/ingredients/:id_ingredient', ensureAuthenticateRestaurant, deleteIngredientController().handle);
routes.delete('/recipes/:id_recipe', ensureAuthenticateRestaurant, deleteRecipesController().handle);
routes.delete('/portionsizes/:portion_id', ensureAuthenticateRestaurant, deletePortionSizesController().handle);

export { routes };