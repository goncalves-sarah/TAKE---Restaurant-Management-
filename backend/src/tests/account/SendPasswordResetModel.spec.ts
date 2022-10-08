/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Send Password Reset Mail', () => {

    var user = {};

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

    it('should send email to reset password ', async () => {
        const email = 'email@email.com';
        const response = await request(app)
            .post('/forgot-password')
            .send({ email });

        expect(response.status).toBe(204);

    });

    it('should not send emil with incorrect email', async () => {
        const email = 'emailIncorrect@email.com';
        const response = await request(app)
            .post('/forgot-password')
            .send({ email });

        expect(response.status).toBe(204);

    });

});