/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Edit Restaurant', () => {

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

    it('should edit restaurant ', async () => {

        const updatedUser = {
            name: 'Rich Edited',
            email: 'emailEdited@email.com',
            state: 'PR',
            city: 'Londrina',
        }

        const response = await request(app)
            .put('/restaurants')
            .send(updatedUser)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.email).toBe(updatedUser.email);
    });

    it('should not be able to change email to one from an existing restaurant ', async () => {

        const existingUser = {
            name: 'Rich',
            email: 'existingEmail@email.com',
            password: 'senha',
            state: 'PR',
            city: 'Curitiba',
            admin_password: 'senhaAdmin'
        }

        await request(app)
            .post('/restaurants')
            .send(existingUser);

        const updatedUser = {
            name: 'Rich',
            email: 'existingEmail@email.com',
            state: 'PR',
            city: 'Curitiba',
        }

        const response = await request(app)
            .put('/restaurants')
            .send(updatedUser)
            .set('Authorization', `Bearer ${token}`);;


        expect(response.status).toBe(400);

    });

});