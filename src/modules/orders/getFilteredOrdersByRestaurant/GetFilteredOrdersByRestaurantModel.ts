import { prisma } from "../../../database/prismaClient";

export class GetFilteredOrdersByRestaurantModel {
    async execute(id_restaurant: string, status?: string) {

        const orders = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                orders: {
                    where: {
                        status
                    },
                    select: {
                        id: true,
                        created_at: true,
                        end_at: true,
                        priority: true,
                        status: true,
                        recipe: {
                            select: {
                                name: true
                            }
                        },
                        portion_size: {
                            select: {
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
