import prisma from "../../../database/prismaClient";

interface ICreateIngredientPredictionData {
    id_restaurant: string;
    ingredients_data: [
        {
            id_ingredient: string;
            initial_amount: number;
            final_amount?: number;
            unit: string;
        }
    ]
}

export class CollectIngredientsDataModel {
    async execute({ ingredients_data, id_restaurant }: ICreateIngredientPredictionData) {

        await prisma.restaurants.update({
            where: {
                id: id_restaurant
            },
            data: {
                ingredients_data: {
                    deleteMany: {
                        date: {
                            equals: new Date(new Date().setUTCHours(0, 0, 0, 0))
                        }
                    }
                }
            }
        });

        ingredients_data.map(async ingredient => {

            await prisma.ingredient_Prediction_Data.create({
                data: {
                    id_restaurant,
                    id_ingredient: ingredient.id_ingredient,
                    date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                    initial_amount: ingredient.initial_amount,
                    final_amount: ingredient.final_amount ? ingredient.final_amount : null,
                    unit: ingredient.unit
                }
            });


        })


    }
}
