import { Request, Response } from "express";
import { CreateRestaurantModel } from "./CreateRestaurantModel";

export class CreateRestaurantController {

    async handle(req: Request, res: Response) {

        const { name, email, password, state, city, admin_password } = req.body;

        const createRestaurantModel = new CreateRestaurantModel();
        const result = await createRestaurantModel.execute({ name, email, password, state, city, admin_password });

        return res.status(201).json(result);
    }
}