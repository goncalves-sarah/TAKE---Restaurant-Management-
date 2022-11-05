import { sign } from "jsonwebtoken";
import prisma from "../../../database/prismaClient";
import transport from "../../../mail/Mail";


export class SendPasswordResetMailModel {
    async execute(email: string) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                email
            }
        });
        if (restaurant) {

            const link = `${process.env.FRONT_URL}/password-reset/${restaurant.id}`;

            const mailOptions = {
                from: "tcc@tcc2022.com",
                to: restaurant.email,
                subject: "Reset de Senha",
                template: 'index',
                context: { link, restaurant }
            }

            transport.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log(error)
                    throw new Error("Houve um problema no envio do email")
                } else {
                    return "E-mail enviado com sucesso!";
                }
            });

        }
    }
}
