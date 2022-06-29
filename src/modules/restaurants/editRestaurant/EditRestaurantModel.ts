import { prisma } from "../../../database/prismaClient";

interface IRestaurant {
    id_restaurant: string;
    name?: string;
    email?: string;
    state?: string;
    city?: string;
}

export class EditRestaurantModel {
    async execute({ id_restaurant, name, email, state, city }: IRestaurant) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        if (restaurant) {

            if (restaurant.email !== email) {
                const restaurantExists = await prisma.restaurants.findFirst({
                    where: {
                        email
                    }
                });

                if (restaurantExists) {
                    throw new Error("Email já cadastrado")
                }
            }

            const updated_restaurant = await prisma.restaurants.update({
                where: {
                    id: id_restaurant
                },
                data: {
                    name,
                    email,
                    state,
                    city
                },
                select: {
                    name: true,
                    email: true,
                    state: true,
                    city: true
                }
            });

            return updated_restaurant;
        }

    }
}
