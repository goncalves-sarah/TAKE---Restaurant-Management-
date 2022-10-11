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
    var token = '' as string;

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

        const response = await request(app)
            .post('/authenticate')
            .send(user);

        user = res.body;

        token = response.body;

    });

    it('should reset password from forgot password', async () => {

        const newPassword = 'senha2'
        const response = await request(app)
            .patch('/reset-password')
            .send({ newPassword })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);

    });

    it('should reset password using current password', async () => {

        const password = 'senha2';
        const newPassword = 'senha3'
        const response = await request(app)
            .patch('/reset-password')
            .send({ password, newPassword })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);

    });

    it('should not reset password using incorrect current password', async () => {

        const password = 'senha4';
        const newPassword = 'senha2'
        const response = await request(app)
            .patch('/reset-password')
            .send({ password, newPassword })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);

    });

});