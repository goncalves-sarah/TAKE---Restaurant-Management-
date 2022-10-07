import { hash } from "bcrypt";
import prisma from "../../../database/prismaClient";

interface IResetPassword {
    id_restaurant: string;
    password: string;
}

export class ResetPasswordModel {
    async execute({ id_restaurant, password }: IResetPassword) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        if (restaurant) {

            const hashPassword = await hash(password, 10);

            await prisma.restaurants.update({
                where: {
                    id: id_restaurant
                },
                data: {
                    password: hashPassword
                }
            });

            return restaurant.admin;
        }

    }
}
