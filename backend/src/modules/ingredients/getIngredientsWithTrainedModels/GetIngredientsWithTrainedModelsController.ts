import { Request, Response } from "express";
import { GetIngredientsWithTrainedModelsModel } from "./GetIngredientsWithTrainedModelsModel";

export class GetIngredientsWithTrainedModelsController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getIngredientsWithTrainedModelsModel = new GetIngredientsWithTrainedModelsModel();
        const ingredients = await getIngredientsWithTrainedModelsModel.execute(id_restaurant);

        return res.status(200).json(ingredients);
    }
}