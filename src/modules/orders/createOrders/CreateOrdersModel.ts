import { prisma } from "../../../database/prismaClient";

interface ICreateOrder {
    priority: number;
    id_recipe: string;
    portion_id: string;
    id_restaurant: string;
}

export class CreateOrdersModel {
    async execute({ priority, id_recipe, portion_id, id_restaurant }: ICreateOrder) {

        const order = await prisma.orders.create({
            data: {
                priority,
                id_recipe,
                portion_id,
                id_restaurant,
                status: "Em Progresso",
                created_at: new Date()
            }
        });

        return order;

    }
}
