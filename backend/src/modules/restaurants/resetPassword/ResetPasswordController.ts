import { Request, Response } from "express";
import { ResetPasswordModel } from "./ResetPasswordModel";

export class ResetPasswordController {
    async handle(req: Request, res: Response) {

        const { password, newPassword } = req.body;

        const { id_restaurant } = req;

        const resetPasswordModel = new ResetPasswordModel();
        await resetPasswordModel.execute({ id_restaurant, password, newPassword });

        return res.status(200).json({ "message": "Senha alterada com sucesso!" });
    }
}