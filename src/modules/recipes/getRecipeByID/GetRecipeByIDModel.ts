import prisma from "../../../database/prismaClient";

export class GetRecipeByIDModel {
    async execute(id_recipe: string, id_restaurant: string) {
        const recipe = await prisma.recipes.findFirst({
            where: {
                id: {
                    equals: id_recipe
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            },
            select: {
                id: true,
                name: true,
                ingredients: {
                    select: {
                        ingredient: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        amount: true,
                        unit: true
                    }
                }
            }
        });

        return recipe;

    }
}
