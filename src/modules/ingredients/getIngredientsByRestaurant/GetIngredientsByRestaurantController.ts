import { Request, Response } from "express";
import { GetIngredientsByRestaurantModel } from "./GetIngredientsByRestaurantModel";

export class GetIngredientsByRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getIngredientsByRestaurantModel = new GetIngredientsByRestaurantModel();
        const ingredients = await getIngredientsByRestaurantModel.execute(id_restaurant);

        return res.status(200).json(ingredients);
    }
}