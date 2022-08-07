import { Request, Response } from "express";
import { GetRestaurantDataModel } from "./GetRestaurantDataModel";

export class GetRestaurantDataController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getRestaurantDataModel = new GetRestaurantDataModel();
        const restaurant = await getRestaurantDataModel.execute(id_restaurant);

        return res.status(200).json(restaurant);
    }
}