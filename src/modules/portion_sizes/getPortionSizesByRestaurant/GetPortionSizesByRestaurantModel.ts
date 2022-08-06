import prisma from "../../../database/prismaClient";

export class GetPortionSizesByRestaurantModel {
    async execute(id_restaurant: string) {

        const portionSizes = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                portion_sizes: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return portionSizes;

    }
}
