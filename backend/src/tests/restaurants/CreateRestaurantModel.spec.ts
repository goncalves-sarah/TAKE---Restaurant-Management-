/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Create Restaurant', () => {

    it('should create new restaurant ', async () => {

        const user = {
            name: 'Rich',
            email: 'email@email.com',
            password: 'senha',
            state: 'PR',
            city: 'Curitiba',
            admin_password: 'senhaAdmin'
        }

        const response = await request(app)
            .post('/restaurants')
            .send(user);

        expect(response.body).toHaveProperty("id");

    });

    it('should not be able to create existing restaurant ', async () => {

        const user = {
            name: 'Rich-Existing',
            email: 'existing-email@email.com',
            password: 'senha',
            state: 'PR',
            city: 'Curitiba',
            admin_password: 'senhaAdmin'
        }

        await request(app)
            .post('/restaurants')
            .send(user);

        const response = await request(app)
            .post('/restaurants')
            .send(user);


        expect(response.status).toBe(400);

    });

});