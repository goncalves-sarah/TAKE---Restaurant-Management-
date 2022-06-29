import { Request, Response } from "express";
import { CreateRecipesModel } from "./CreateRecipesModel";

export class CreateRecipesController {
    async handle(req: Request, res: Response) {

        const { name, recipe_ingredients } = req.body;
        const { id_restaurant } = req;

        const createRecipesModel = new CreateRecipesModel();
        await createRecipesModel.execute({ name, id_restaurant, recipe_ingredients });

        return res.status(201).send();
    }
}
