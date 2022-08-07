import { hash } from "bcrypt";
import prisma from "../../../database/prismaClient";

interface ICreateRestaurant {
    name: string;
    email: string;
    password: string;
    state: string;
    city: string;
    admin_password: string;
}

export class CreateRestaurantModel {
    async execute({ name, email, password, state, city, admin_password }: ICreateRestaurant) {

        const restaurantExist = await prisma.restaurants.findFirst({
            where: {
                email: {
                    mode: "insensitive",
                    equals: email
                }
            }
        });

        if (restaurantExist) {
            throw new Error("Email já cadastrado")
        }

        const hashPassword = await hash(password, 10);
        const hashAdminPassword = await hash(admin_password, 10);

        const restaurant = await prisma.restaurants.create({
            data: {
                name,
                email,
                password: hashPassword,
                state,
                city,
                admin_password: hashAdminPassword
            }
        });

        return restaurant;

    }
}
