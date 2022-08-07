import prisma from "../../../database/prismaClient";

export class DeleteRecipesModel {
    async execute(id_recipe: string, id_restaurant: string) {

        const recipeExist = await prisma.recipes.findFirst({
            where: {
                id: {
                    equals: id_recipe
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (!recipeExist) {
            throw new Error("Receita não existe")
        }

        try {
            await prisma.recipes.delete({
                where: {
                    id: id_recipe
                }
            });
        } catch (err) {
            throw new Error('Houve um problema na solicitação')
        }
    }
}
