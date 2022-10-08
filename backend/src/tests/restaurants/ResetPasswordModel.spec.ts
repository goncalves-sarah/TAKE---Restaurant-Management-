/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    state: string;
    city: string;
    admin_password: string;
}

describe('Reset Password', () => {

    var user = {} as User;

    beforeAll(async () => {

        user = {
            name: 'Rich',
            email: 'email@email.com',
            password: 'senha',
            state: 'PR',
            city: 'Curitiba',
            admin_password: 'senhaAdmin'
        }

        const res = await request(app)
            .post('/restaurants')
            .send(user);

        user = res.body;

    });

    it('should reset password ', async () => {
        const id_restaurant = user.id;
        console.log(user)
        const password = 'senha2'
        const response = await request(app)
            .post('/reset-password')
            .send({ id_restaurant, password });

        expect(response.status).toBe(200);

    });

});