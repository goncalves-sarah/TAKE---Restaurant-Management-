import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export async function ensureAuthenticateAdminMode(req: Request, res: Response, next: NextFunction) {

    const { id_restaurant } = req;

    const restaurant = await prisma.restaurants.findFirst({
        where: {
            id: id_restaurant
        },
        select: {
            admin: true
        }
    });

    if (restaurant) {
        if (restaurant.admin) {
            return next();
        }
    }

    return res.status(401).json({
        message: "Operação não autorizada! Usuário deve estar no modo Admin"
    });
}