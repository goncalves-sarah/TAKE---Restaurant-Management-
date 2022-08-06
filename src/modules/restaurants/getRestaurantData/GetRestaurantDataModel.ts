import prisma from "../../../database/prismaClient";

export class GetRestaurantDataModel {
    async execute(id_restaurant: string) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                id: true,
                name: true,
                email: true,
                state: true,
                city: true
            }
        });

        return restaurant;

    }
}
