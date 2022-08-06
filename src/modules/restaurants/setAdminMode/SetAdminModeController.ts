import { Request, Response } from "express";
import { SetAdminModeModel } from "./SetAdminModeModel";

export class SetAdminModeController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;
        const { admin_password } = req.body;

        const setAdminModeModel = new SetAdminModeModel();
        const status = await setAdminModeModel.execute({ id_restaurant, admin_password });

        return res.status(200).json(status);
    }
}