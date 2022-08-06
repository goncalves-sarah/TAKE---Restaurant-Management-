import prisma from "../../../database/prismaClient";

export class DeleteIngredientsModel {
    async execute(id_ingredient: string, id_restaurant: string) {

        const ingredientExist = await prisma.ingredients.findFirst({
            where: {
                id: {
                    equals: id_ingredient
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (!ingredientExist) {
            throw new Error("Ingrediente não existe")
        }

        try {
            await prisma.ingredients.delete({
                where: {
                    id: id_ingredient
                }
            });
        } catch (err) {
            throw new Error('Houve um problema na solicitação')
        }
    }
}
