import { Request, Response } from "express";
import { SendPasswordResetMailModel } from "./SendPasswordResetMailModel";

export class SendPasswordResetMailController {
    async handle(req: Request, res: Response) {

        const { email } = req.body;

        const sendPasswordResetMailModel = new SendPasswordResetMailModel();
        await sendPasswordResetMailModel.execute(email);

        return res.status(204).send();
    }
}