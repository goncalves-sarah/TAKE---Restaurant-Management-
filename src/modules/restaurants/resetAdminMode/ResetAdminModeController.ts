import { Request, Response } from "express";
import { ResetAdminModeModel } from "./ResetAdminModeModel";

export class ResetAdminModeController {
    async handle(req: Request, res: Response) {

        const { id_restaurant } = req;

        const resetAdminModeModel = new ResetAdminModeModel();
        const status = await resetAdminModeModel.execute({ id_restaurant });

        return res.status(200).json(status);
    }
}