import { Request, Response } from "express";
import { EditOrdersModel } from "./EditOrdersModel";

export class EditOrdersController {
    async handle(req: Request, res: Response) {

        const { id_order } = req.params;
        const { priority, portion_id, status } = req.body;
        const { id_restaurant } = req;

        const editOrdersModel = new EditOrdersModel();
        const order = await editOrdersModel.execute({ priority, portion_id, status, id_restaurant, id_order });

        return res.status(200).json(order);
    }
}
