import { Request, Response } from "express";
import { GetFilteredOrdersByRestaurantModel } from "./GetFilteredOrdersByRestaurantModel";

export class GetFilteredOrdersByRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;
        const status = req.query.status as string;

        const getFilteredOrdersByRestaurantModel = new GetFilteredOrdersByRestaurantModel();
        const orders = await getFilteredOrdersByRestaurantModel.execute(id_restaurant, status);

        return res.status(200).json(orders);
    }
}