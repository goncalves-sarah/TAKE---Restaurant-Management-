import { Request, Response } from "express";
import { DeleteIngredientsModel } from "./DeleteIngredientsModel";

export class DeleteIngredientsController {
    async handle(req: Request, res: Response) {

        const { id_ingredient } = req.params;
        const { id_restaurant } = req;

        const deleteIngredientsModel = new DeleteIngredientsModel();
        await deleteIngredientsModel.execute(id_ingredient, id_restaurant);

        return res.status(204).send();
    }
}