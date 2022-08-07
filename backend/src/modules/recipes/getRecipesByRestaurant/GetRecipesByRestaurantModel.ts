import prisma from "../../../database/prismaClient";

export class GetRecipesByRestaurantModel {
    async execute(id_restaurant: string) {

        const recipes = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                recipes: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return recipes;

    }
}
