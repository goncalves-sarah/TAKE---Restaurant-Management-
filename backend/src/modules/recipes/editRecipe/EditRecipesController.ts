import { Request, Response } from "express";
import { EditRecipesModel } from "./EditRecipesModel";

export class EditRecipesController {
    async handle(req: Request, res: Response) {

        const { id_recipe } = req.params;
        const { name, recipe_ingredients } = req.body;
        const { id_restaurant } = req;

        const editRecipesModel = new EditRecipesModel();
        const recipe = await editRecipesModel.execute({ id_recipe, name, id_restaurant, recipe_ingredients });

        return res.status(200).json(recipe);
    }
}
