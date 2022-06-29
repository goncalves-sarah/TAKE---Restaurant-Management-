import { prisma } from "../../../database/prismaClient";

export class DeletePortionSizesModel {
    async execute(portion_id: string, id_restaurant: string) {

        const portionSizeExist = await prisma.portion_Size.findFirst({
            where: {
                id: {
                    equals: portion_id
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (!portionSizeExist) {
            throw new Error("Tamanho de Porção não existe")
        }

        try {
            await prisma.portion_Size.delete({
                where: {
                    id: portion_id
                }
            });
        } catch (err) {
            throw new Error('Houve um problema na solicitação')
        }
    }
}
