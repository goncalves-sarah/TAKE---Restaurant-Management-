import { Request, Response } from "express";
import { CollectIngredientsDataModel } from "./CollectIngredientsDataModel";

export class CollectIngredientsDataController {
    async handle(req: Request, res: Response) {

        const { ingredients_data } = req.body;
        const { id_restaurant } = req;

        const collectIngredientsDataModel = new CollectIngredientsDataModel();
        await collectIngredientsDataModel.execute({ ingredients_data, id_restaurant });

        return res.status(201).json({ "message": "Dados Coletados com Sucesso" });
    }
}