import { Request, Response } from "express";
import { GetForecastedDataModel } from "./GetForecastedDataModel";

export class GetForecastedDataController {
    async handle(req: Request, res: Response) {

        const { ingredients, days_to_be_forecasted } = req.query;
        const { id_restaurant } = req;

        const getForecastedDataModel = new GetForecastedDataModel();
        const forecast = await getForecastedDataModel.execute({ ingredients, days_to_be_forecasted, id_restaurant });

        return res.status(200).json(forecast);
    }
}