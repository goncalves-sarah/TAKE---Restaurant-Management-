import { Request, Response } from "express";
import { AuthenticateRestaurantModel } from "./AuthenticateRestaurantModel";

export class AuthenticateRestaurantController {
    async handle(req: Request, res: Response) {

        const { email, password } = req.body;

        const authenticateRestaurantModel = new AuthenticateRestaurantModel();
        const result = await authenticateRestaurantModel.execute({ email, password });

        return res.status(200).json(result);
    }
}