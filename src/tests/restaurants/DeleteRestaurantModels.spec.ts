/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Delete Restaurant', () => {

    var token = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailDelete@email.com',
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

    it('should delete restaurant ', async () => {

        const response = await request(app)
            .delete('/restaurants')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);

    });
});