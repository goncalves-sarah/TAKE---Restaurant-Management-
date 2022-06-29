import { prisma } from "../../../database/prismaClient";

export class DeleteRestaurantModel {
    async execute(id_restaurant: string) {
        try {
            await prisma.restaurants.delete({
                where: {
                    id: id_restaurant
                }
            });
        } catch (err) {
            throw new Error('Houve um problema na solicitação')
        }

    }
}
