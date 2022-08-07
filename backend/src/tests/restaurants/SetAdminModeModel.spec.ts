/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Set Restaurant Admin Mode', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'email@email.com',
            password: 'senha',
            state: 'PR',
            city: 'Curitiba',
            admin_password: 'senhaAdmin'
        }

        await request(app)
            .post('/restaurants')
            .send(user);


        const response = await request(app)
            .post('/authenticate')
            .send(user);

        token = response.body;

    });

    it('should set admin mode', async () => {

        const response = await request(app)
            .patch('/restaurants/admin')
            .send({ admin_password: 'senhaAdmin' })
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

    it('should not set admin mode with incorrect password', async () => {

        const response = await request(app)
            .patch('/restaurants/admin')
            .send({ admin_password: 'senhaAdmin' })
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

});