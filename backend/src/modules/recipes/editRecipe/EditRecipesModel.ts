import { Recipes_Ingredients } from "@prisma/client";
import prisma from "../../../database/prismaClient";

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

        if (name != recipeExist.name) {
            const nameAlreadyBeingUsed = await prisma.recipes.findFirst({
                where: {
                    id_restaurant,
                    name
                }
            });

            if (nameAlreadyBeingUsed) {
                throw new Error("Este nome de receita já está sendo utilizado")
            }
        }

        const recipe = await prisma.recipes.update({
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
            },
            include: {
                ingredients: true
            }
        });

        return recipe;

    }
}
