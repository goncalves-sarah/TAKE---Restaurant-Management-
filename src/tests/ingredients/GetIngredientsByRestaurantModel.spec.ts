/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Get Ingredients From Restaurant', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailToGetIngredients@email.com',
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


        await request(app)
            .post('/ingredients')
            .send({ name: `Ingredient Number 0` })
            .set('Authorization', `Bearer ${token}`);

        await request(app)
            .post('/ingredients')
            .send({ name: `Ingredient Number 1` })
            .set('Authorization', `Bearer ${token}`);


    });

    it('should get all ingredients from restaurant', async () => {

        const response = await request(app)
            .get('/ingredients')
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.body.ingredients).toHaveLength(2);

    });

});