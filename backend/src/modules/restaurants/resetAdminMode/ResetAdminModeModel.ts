import prisma from "../../../database/prismaClient";

interface IResetAdminMode {
    id_restaurant: string;
}

export class ResetAdminModeModel {
    async execute({ id_restaurant }: IResetAdminMode) {

        const restaurantAlreadyExists = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        if (restaurantAlreadyExists) {

            const restaurant = await prisma.restaurants.update({
                where: {
                    id: id_restaurant
                },
                data: {
                    admin: false
                }
            });

            return restaurant.admin;
        }

    }
}
