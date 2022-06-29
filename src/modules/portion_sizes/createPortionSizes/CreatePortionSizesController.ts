import { Request, Response } from "express";
import { CreatePortionSizesModel } from "./CreatePortionSizesModel";

export class CreatePortionSizesController {
    async handle(req: Request, res: Response) {

        const { name } = req.body;
        const { id_restaurant } = req;

        const createPortionSizesModel = new CreatePortionSizesModel();
        const result = await createPortionSizesModel.execute({ name, id_restaurant });

        return res.status(201).json(result);
    }
}