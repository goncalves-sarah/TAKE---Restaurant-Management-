import { Request, Response } from "express";
import { CollectWeatherPeopleDataModel } from "./CollectWeatherPeopleDataModel";

export class CollectWeatherPeopleDataController {
    async handle(req: Request, res: Response) {

        const { customer_amount } = req.body;
        const { id_restaurant } = req;

        const collectWeatherPeopleDataModel = new CollectWeatherPeopleDataModel();
        await collectWeatherPeopleDataModel.execute({ id_restaurant, customer_amount });

        return res.status(201).json({ "message": "Dados Coletados com Sucesso" });
    }
}