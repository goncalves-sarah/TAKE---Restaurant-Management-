import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../../database/prismaClient";
import dayjs from "dayjs";

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
        console.log(process.env.SALT)
        const token = sign({ email }, process.env.SALT, {
            subject: restaurant.id,
            expiresIn: process.env.expires_in
        });

        const refresh_token = sign({ email }, process.env.SALT_REFRESH_TOKEN, {
            subject: restaurant.id,
            expiresIn: process.env.expires_in_refresh_token
        })

        await prisma.refresh_Tokens.create({
            data: {
                id_restaurant: restaurant.id,
                refresh_token,
                expiration_date: dayjs().add(parseInt(process.env.expires_in_refresh_token_days), "days").toDate()
            }
        })

        return token;

    }
}
