import prisma from "../../../database/prismaClient";

export class GetIngredientsByRestaurantModel {
    async execute(id_restaurant: string) {

        const ingredients = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            },
            select: {
                ingredients: true
            }
        });

        return ingredients;

    }
}
