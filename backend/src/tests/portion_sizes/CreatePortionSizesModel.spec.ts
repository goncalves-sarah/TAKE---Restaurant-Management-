/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Create Portion Size', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailForPortionSize@email.com',
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

        await request(app)
            .patch('/restaurants/admin')
            .send({ admin_password: user.admin_password })
            .set('Authorization', `Bearer ${token}`);
    });

    it('should create portion size', async () => {

        const response = await request(app)
            .post('/portionsizes')
            .send({ name: 'Portion Size 1' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);

    });

    it('should not create portion size with existing name', async () => {

        await request(app)
            .post('/portionsizes')
            .send({ name: 'Existing Portion Size' })
            .set('Authorization', `Bearer ${token}`);;

        const response = await request(app)
            .post('/portionsizes')
            .send({ name: 'Existing Portion Size' })
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(400);

    });

    it('should not create portion size without admin mode set', async () => {

        await request(app)
            .patch('/restaurants/reset/admin')
            .send()
            .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
            .post('/portionsizes')
            .send({ name: 'Valid Portion Size' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);

    });

});