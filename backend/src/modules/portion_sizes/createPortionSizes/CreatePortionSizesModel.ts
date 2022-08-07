import prisma from "../../../database/prismaClient";

interface ICreatePortionSize {
    name: string;
    id_restaurant: string;
}

export class CreatePortionSizesModel {
    async execute({ name, id_restaurant }: ICreatePortionSize) {

        const portionSizeExist = await prisma.portion_Size.findFirst({
            where: {
                name: {
                    mode: "insensitive",
                    equals: name
                },
                id_restaurant: {
                    equals: id_restaurant
                }
            }
        });

        if (portionSizeExist) {
            throw new Error("Tamanho de Porção já cadastrado")
        }

        const portionSize = await prisma.portion_Size.create({
            data: {
                id_restaurant,
                name
            }
        });

        return portionSize;

    }
}
