import { Request, Response } from "express";
import { GetPortionSizesByRestaurantModel } from "./GetPortionSizesByRestaurantModel";

export class GetPortionSizesByRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const getPortionSizesByRestaurantModel = new GetPortionSizesByRestaurantModel();
        const portionSizes = await getPortionSizesByRestaurantModel.execute(id_restaurant);

        return res.status(200).json(portionSizes);
    }
}