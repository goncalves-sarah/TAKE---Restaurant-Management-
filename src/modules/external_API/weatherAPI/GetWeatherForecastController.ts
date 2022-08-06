import { Request, Response } from "express";
import { GetWeatherForecastModel } from "./GetWeatherForecastModel";

export class GetWeatherForecastController {
    async handle(req: Request, res: Response) {

        const { days } = req.body;
        const { id_restaurant } = req;

        const getWeatherForecastModel = new GetWeatherForecastModel();
        const weatherData = await getWeatherForecastModel.execute(days, id_restaurant);

        return res.status(200).json(weatherData);
    }
}