import { prisma } from "../../../database/prismaClient";

interface ICreateIngredient {
    name: string;
    id_restaurant: string;
}

export class CreateIngredientsModel {
    async execute({ name, id_restaurant }: ICreateIngredient) {

        const ingredientExist = await prisma.ingredients.findFirst({
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

        if (ingredientExist) {
            throw new Error("Ingrediente já cadastrado")
        }

        const ingredient = await prisma.ingredients.create({
            data: {
                name,
                id_restaurant
            }
        });

        return ingredient;

    }
}
