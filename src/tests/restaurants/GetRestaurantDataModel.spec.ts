/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Get Restaurant Data', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailGetData@email.com',
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

    it('should get data from restaurant ', async () => {

        const response = await request(app)
            .get('/restaurants')
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

});