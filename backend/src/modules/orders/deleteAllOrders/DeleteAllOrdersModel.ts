import prisma from "../../../database/prismaClient";

export class DeleteAllOrdersModel {
    async execute(id_restaurant: string, status?: string) {

        try {
            if (status) {
                await prisma.orders.deleteMany({
                    where: {
                        id_restaurant,
                        status
                    }
                })
            } else {
                await prisma.orders.deleteMany({
                    where: {
                        id_restaurant
                    }
                })
            }

        } catch (err) {
            throw new Error('Houve um problema na solicitação')
        }
    }
}
