import { Request, Response } from "express";
import { GetIngredientsDataCollectedTodayModel } from "./GetIngredientsDataCollectedTodayModel";

export class GetIngredientsDataCollectedTodayController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getIngredientsDataCollectedTodayModel = new GetIngredientsDataCollectedTodayModel();
        const result = await getIngredientsDataCollectedTodayModel.execute(id_restaurant);

        return res.status(200).json(result);
    }
}