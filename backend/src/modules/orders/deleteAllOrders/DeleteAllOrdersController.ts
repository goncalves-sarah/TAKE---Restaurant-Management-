import { Request, Response } from "express";
import { DeleteAllOrdersModel } from "./DeleteAllOrdersModel";

export class DeleteAllOrdersController {
    async handle(req: Request, res: Response) {

        const status = req.query.status as string;
        const { id_restaurant } = req;

        const deleteAllOrdersModel = new DeleteAllOrdersModel();
        await deleteAllOrdersModel.execute(id_restaurant, status);

        return res.status(204).send();
    }
}
