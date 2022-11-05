import prisma from "../../../database/prismaClient";

export class GetFilteredOrdersByRestaurantModel {
    async execute(id_restaurant: string, status?: string) {

        const orders = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                orders: {
                    where: {
                        status: status ? status : undefined,
                        created_at: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)) // gte -> greater than
                        }
                    },
                    select: {
                        id: true,
                        created_at: true,
                        end_at: true,
                        priority: true,
                        status: true,
                        recipe: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        portion_size: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return orders;

    }
}
