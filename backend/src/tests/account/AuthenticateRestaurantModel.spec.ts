/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Authenticate Restaurant', () => {

    var user = {}

    beforeAll(async () => {

        user = {
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

    });

    it('should authenticate restaurant ', async () => {

        const response = await request(app)
            .post('/authenticate')
            .send(user);

        expect(response.status).toBe(200);

    });

    it('should not authenticate restaurant with incorrect email', async () => {

        const response = await request(app)
            .post('/authenticate')
            .send({ ...user, email: 'emailIncorrect@email.com' });

        expect(response.status).toBe(400);

    });

    it('should not authenticate restaurant with incorrect password', async () => {

        const response = await request(app)
            .post('/authenticate')
            .send({ ...user, password: 123 });

        expect(response.status).toBe(400);

    });
});