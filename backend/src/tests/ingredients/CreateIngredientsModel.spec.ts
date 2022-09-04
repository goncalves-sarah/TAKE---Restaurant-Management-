/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Create Ingredient', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailForIngredient@email.com',
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

    it('should create ingredient', async () => {

        const response = await request(app)
            .post('/ingredients')
            .send({ name: 'Ingredient 1' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);

    });

    it('should not create ingredient with existing name', async () => {

        await request(app)
            .post('/ingredients')
            .send({ name: 'Ingredient 2' })
            .set('Authorization', `Bearer ${token}`);;

        const response = await request(app)
            .post('/ingredients')
            .send({ name: 'Ingredient 2' })
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(400);

    });

    // it('should not create ingredient without admin mode set', async () => {

    //     await request(app)
    //         .patch('/restaurants/reset/admin')
    //         .send()
    //         .set('Authorization', `Bearer ${token}`);

    //     const response = await request(app)
    //         .post('/ingredients')
    //         .send({ name: 'Ingredient 3' })
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(401);

    // });

});