/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Get Portion Sizes From Restaurant', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailToGetPortionSizes@email.com',
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
            .post('/portionsizes')
            .send({ name: `Portion Size Number 0` })
            .set('Authorization', `Bearer ${token}`);

        await request(app)
            .post('/portionsizes')
            .send({ name: `Portion Size Number 1` })
            .set('Authorization', `Bearer ${token}`);


    });

    it('should get all portion sizes from restaurant', async () => {

        const response = await request(app)
            .get('/portionsizes')
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.body.portion_sizes).toHaveLength(2);

    });

});