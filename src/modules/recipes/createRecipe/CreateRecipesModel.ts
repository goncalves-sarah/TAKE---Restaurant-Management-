import { prisma } from "../../../database/prismaClient";

interface ICreateRecipe {
    name: string;
    id_restaurant: string;
    recipe_ingredients: [
        {
            id_ingredient: string;
            amount: number;
            unit: string;
        }
    ]
}

export class CreateRecipesModel {
    async execute({ name, id_restaurant, recipe_ingredients }: ICreateRecipe) {

        const recipeExist = await prisma.recipes.findFirst({
            where: {
                name: {
                    mode: "insensitive",
                    equals: name
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (recipeExist) {
            throw new Error("Receita já cadastrada")
        }

        const { id } = await prisma.recipes.create({
            data: {
                name,
                id_restaurant,
            }
        });

        try {
            recipe_ingredients.map(async ingredient => {
                await prisma.recipes.update({
                    where: {
                        id
                    },
                    data: {
                        ingredients: {
                            create: {
                                id_ingredient: ingredient.id_ingredient,
                                amount: ingredient.amount,
                                unit: ingredient.unit
                            }
                        }
                    }
                })
            });
        } catch (err) {
            await prisma.recipes.delete({
                where: {
                    id
                }
            });
            throw new Error("Houve um problma, tente novamente")
        }


    }
}
