import { Request, Response } from "express";
import { GetCityByUFModel } from "./GetCityByUFModel";

export class GetCityByUFController {
    async handle(req: Request, res: Response) {

        const { UF } = req.params;

        const getCityByUFModel = new GetCityByUFModel();
        const cities = await getCityByUFModel.execute(UF);

        return res.status(200).json(cities);
    }
}