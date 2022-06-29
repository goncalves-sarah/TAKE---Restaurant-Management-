import { prisma } from "../../../database/prismaClient";

interface IEditOrder {
    priority: number;
    portion_id: string;
    status: string;
    id_restaurant: string;
    id_order: string;
}

export class EditOrdersModel {
    async execute({ priority, portion_id, status, id_restaurant, id_order }: IEditOrder) {

        const orderExist = await prisma.orders.findFirst({
            where: {
                id: {
                    equals: id_order
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (!orderExist) {
            throw new Error("Pedido não cadastrado!")
        }

        await prisma.orders.update({
            where: {
                id: id_order
            },
            data: {
                priority,
                portion_id,
                status,
                end_at: status == 'Concluído' ? new Date : null
            }
        });

    }
}
