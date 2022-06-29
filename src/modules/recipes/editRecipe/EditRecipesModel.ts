import { prisma } from "../../../database/prismaClient";

interface IEditRecipe {
    id_recipe: string;
    name: string;
    id_restaurant: string;
    recipe_ingredients: [
        {
            id: string;
            amount: number;
            unit: string;
        }
    ]
}

export class EditRecipesModel {
    async execute({ id_recipe, name, id_restaurant, recipe_ingredients }: IEditRecipe) {

        const recipeExist = await prisma.recipes.findFirst({
            where: {
                id: {
                    equals: id_recipe
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            },
            include: {
                ingredients: true
            }
        });

        if (!recipeExist) {
            throw new Error("Receita não cadastrada!")
        }

        await prisma.recipes.update({
            where: {
                id: recipeExist.id
            },
            data: {
                name
            }
        })


        recipe_ingredients.map(async ingredient => {
            const ingredientPresent = recipeExist.ingredients.filter(i => {
                return i.id_ingredient === ingredient.id
            });
            if (ingredientPresent) {
                await prisma.recipes_Ingredients.update({
                    where: {
                        id_recipe_id_ingredient: {
                            id_recipe,
                            id_ingredient: ingredient.id
                        }
                    },
                    data: {
                        amount: ingredient.amount,
                        unit: ingredient.unit
                    }
                })
            } else {
                await prisma.recipes.update({
                    where: {
                        id: recipeExist.id
                    },
                    data: {
                        ingredients: {
                            create: {
                                id_ingredient: ingredient.id,
                                amount: ingredient.amount,
                                unit: ingredient.unit
                            }
                        }
                    }
                })
            }
        });

    }
}
