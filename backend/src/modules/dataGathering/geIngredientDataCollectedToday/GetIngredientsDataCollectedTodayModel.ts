import prisma from "../../../database/prismaClient";


export class GetIngredientsDataCollectedTodayModel {
    async execute(id_restaurant: string) {

        const ingredientData = await prisma.ingredient_Prediction_Data.findMany({
            where: {
                id_restaurant,
                date: new Date(new Date().setHours(0, 0, 0, 0))
            },
            include: {
                ingredient: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        return ingredientData;

    }
}
