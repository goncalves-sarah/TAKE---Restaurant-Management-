import { Request, Response } from "express";
import { GetForecastedDataModel } from "./GetForecastedDataModel";

interface IGetForecastedData {
    ingredients: string,
    days_to_be_forecasted: number;
    id_restaurant: string;
}

export class GetForecastedDataController {
    async handle(req: Request, res: Response) {

        const ingredients = req.query.ingredients as string;
        const days_to_be_forecasted = req.query.days_to_be_forecasted as string;
        const { id_restaurant } = req;

        const getForecastedDataModel = new GetForecastedDataModel();
        const forecast = await getForecastedDataModel.execute({ ingredients, days_to_be_forecasted, id_restaurant });

        return res.status(200).json(forecast);
    }
}