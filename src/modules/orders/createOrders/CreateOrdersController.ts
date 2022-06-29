import { Request, Response } from "express";
import { CreateOrdersModel } from "./CreateOrdersModel";

export class CreateOrdersController {
    async handle(req: Request, res: Response) {

        const { priority, id_recipe, portion_id } = req.body;
        const { id_restaurant } = req;

        const createOrdersModel = new CreateOrdersModel();
        const result = await createOrdersModel.execute({ priority, id_recipe, portion_id, id_restaurant });

        return res.status(201).json(result);
    }
}