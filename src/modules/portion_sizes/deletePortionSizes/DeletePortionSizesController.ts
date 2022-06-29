import { Request, Response } from "express";
import { DeletePortionSizesModel } from "./DeletePortionSizesModel";

export class DeletePortionSizesController {
    async handle(req: Request, res: Response) {

        const { portion_id } = req.params;
        const { id_restaurant } = req;

        const deletePortionSizesModel = new DeletePortionSizesModel();
        await deletePortionSizesModel.execute(portion_id, id_restaurant);

        return res.status(204).send();
    }
}