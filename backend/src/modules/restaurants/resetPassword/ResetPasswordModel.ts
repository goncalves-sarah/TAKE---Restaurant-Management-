import { compare, hash } from "bcrypt";
import prisma from "../../../database/prismaClient";

interface IResetPassword {
    id_restaurant: string;
    newPassword: string;
}

export class ResetPasswordModel {
    async execute({ id_restaurant, newPassword }: IResetPassword) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        if (restaurant) {

            const hashNewPassword = await hash(newPassword, 10);

            await prisma.restaurants.update({
                where: {
                    id: id_restaurant
                },
                data: {
                    password: hashNewPassword
                }
            });

        }

    }
}
