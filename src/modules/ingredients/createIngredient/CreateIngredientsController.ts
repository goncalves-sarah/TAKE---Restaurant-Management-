import { Request, Response } from "express";
import { CreateIngredientsModel } from "./CreateIngredientsModel";

export class CreateIngredientsController {
    async handle(req: Request, res: Response) {

        const { name } = req.body;
        const { id_restaurant } = req;

        const createIngredientsModel = new CreateIngredientsModel();
        const result = await createIngredientsModel.execute({ name, id_restaurant });

        return res.status(201).json(result);
    }
}