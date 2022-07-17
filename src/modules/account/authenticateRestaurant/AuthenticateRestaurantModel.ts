import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateRestaurant {
    email: string;
    password: string;
}

export class AuthenticateRestaurantModel {
    async execute({ email, password }: IAuthenticateRestaurant) {
        const restaurant = await prisma.restaurants.findFirst({
            where: {
                email
            }
        });

        if (!restaurant) {
            throw new Error("Email ou senha inválido!")
        }

        const passwordMatch = await compare(password, restaurant.password);

        if (!passwordMatch) {
            throw new Error("Email ou senha inválido!")
        }

        const token = sign({ email }, process.env.SALT, {
            subject: restaurant.id,
            expiresIn: "1d"
        });

        return token;

    }
}
