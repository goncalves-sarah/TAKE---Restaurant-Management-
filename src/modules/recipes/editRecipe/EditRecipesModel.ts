import { Recipes_Ingredients } from "@prisma/client";
import { prisma } from "../../../database/prismaClient";

interface IEditRecipe {
    id_recipe: string;
    name: string;
    id_restaurant: string;
    recipe_ingredients: Recipes_Ingredients[]
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
                name,
                ingredients: {
                    deleteMany: {
                        id_recipe: {
                            equals: recipeExist.id
                        }
                    },
                    createMany: {
                        data: recipe_ingredients
                    }
                }
            }
        })

    }
}
