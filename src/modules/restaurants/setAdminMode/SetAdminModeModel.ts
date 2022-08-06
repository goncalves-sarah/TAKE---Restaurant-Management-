import { compare } from "bcrypt";
import prisma from "../../../database/prismaClient";

interface ISetAdminMode {
    id_restaurant: string;
    admin_password: string;
}

export class SetAdminModeModel {
    async execute({ id_restaurant, admin_password }: ISetAdminMode) {

        const restaurantAlreadyExists = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        if (restaurantAlreadyExists) {
            const passwordMatch = await compare(admin_password, restaurantAlreadyExists.admin_password);

            if (!passwordMatch) {
                throw new Error("Senha de Admin Inválida!");
            }

            const restaurant = await prisma.restaurants.update({
                where: {
                    id: id_restaurant
                },
                data: {
                    admin: true
                }
            });

            return restaurant.admin;
        }

    }
}
