import { Request, Response } from "express";
import { DeleteRecipesModel } from "./DeleteRecipesModel";

export class DeleteRecipesController {
    async handle(req: Request, res: Response) {

        const { id_recipe } = req.params;
        const { id_restaurant } = req;

        const deleteRecipesModel = new DeleteRecipesModel();
        await deleteRecipesModel.execute(id_recipe, id_restaurant);

        return res.status(204).send();
    }
}