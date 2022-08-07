import { Recipes_Ingredients } from "@prisma/client";
import prisma from "../../../database/prismaClient";

interface ICreateRecipe {
    name: string;
    id_restaurant: string;
    recipe_ingredients: Recipes_Ingredients[]
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

        const recipe = await prisma.recipes.create({
            data: {
                name,
                id_restaurant,
                ingredients: {
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
