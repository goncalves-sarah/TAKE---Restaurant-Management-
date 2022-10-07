import { Request, Response } from "express";
import { ResetPasswordModel } from "./ResetPasswordModel";

export class ResetPasswordController {
    async handle(req: Request, res: Response) {

        const { id_restaurant, password } = req.body;

        const resetPasswordModel = new ResetPasswordModel();
        await resetPasswordModel.execute({ id_restaurant, password });

        return res.status(200).json({ "message": "Senha alterada com sucesso!" });
    }
}