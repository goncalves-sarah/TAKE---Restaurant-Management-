import { Request, Response } from "express";
import { DeleteRestaurantModel } from "./DeleteRestaurantModel";

export class DeleteRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const deleteRestaurantModel = new DeleteRestaurantModel();
        await deleteRestaurantModel.execute(id_restaurant);

        return res.status(204).send();
    }
}