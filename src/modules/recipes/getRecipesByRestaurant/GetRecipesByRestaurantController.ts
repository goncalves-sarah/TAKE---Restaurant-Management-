import { Request, Response } from "express";
import { GetRecipesByRestaurantModel } from "./GetRecipesByRestaurantModel";

export class GetRecipesByRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getRecipesByRestaurantModel = new GetRecipesByRestaurantModel();
        const recipes = await getRecipesByRestaurantModel.execute(id_restaurant);

        return res.status(200).json(recipes);
    }
}