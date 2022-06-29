import { prisma } from "../../../database/prismaClient";

interface ICreateIngredientPredictionData {
    id_restaurant: string;
    ingredients_data: [
        {
            id_ingredient: string;
            initial_amount: number;
            final_amount: number;
            unit: string;
        }
    ]
}

export class CollectIngredientsDataModel {
    async execute({ ingredients_data, id_restaurant }: ICreateIngredientPredictionData) {

        ingredients_data.map(async ingredient => {
            const collectedIngredientExist = await prisma.ingredient_Prediction_Data.findFirst({
                where: {
                    date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                    id_restaurant: {
                        equals: id_restaurant
                    },
                    id_ingredient: ingredient.id_ingredient
                }
            });

            if (collectedIngredientExist) {
                await prisma.ingredient_Prediction_Data.update({
                    where: {
                        id: collectedIngredientExist.id
                    },
                    data: {
                        initial_amount: ingredient.initial_amount,
                        final_amount: ingredient.final_amount,
                        unit: ingredient.unit
                    }
                })
            } else {

                await prisma.ingredient_Prediction_Data.create({
                    data: {
                        id_restaurant,
                        id_ingredient: ingredient.id_ingredient,
                        date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                        initial_amount: ingredient.initial_amount,
                        unit: ingredient.unit
                    }
                });

            }
        })


    }
}
