import { Request, Response } from "express";
import { EditRestaurantModel } from "./EditRestaurantModel";

export class EditRestaurantController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;
        const { name, email, state, city } = req.body;

        const editRestaurantModel = new EditRestaurantModel();
        const result = await editRestaurantModel.execute({ id_restaurant, name, email, state, city });

        return res.status(200).json(result);
    }
}