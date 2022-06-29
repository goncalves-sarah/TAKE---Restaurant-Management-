import { Request, Response } from "express";
import { GetRecipeByIDModel } from "./GetRecipeByIDModel";

export class GetRecipeByIDController {
    async handle(req: Request, res: Response) {

        const { id_recipe } = req.params;
        const { id_restaurant } = req;

        const getRecipeByIDModel = new GetRecipeByIDModel();
        const recipes = await getRecipeByIDModel.execute(id_recipe, id_restaurant);

        return res.status(200).json(recipes);
    }
}