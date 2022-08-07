import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateRestaurant(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, process.env.SALT) as IPayload;

        req.id_restaurant = sub;

        return next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }


}