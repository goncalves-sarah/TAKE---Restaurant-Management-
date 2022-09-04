/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe('Delete Ingredient', () => {

    var token = '' as string;
    var ingredient_id = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailForIngredientToDelete@email.com',
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

        const res = await request(app)
            .post('/ingredients')
            .send({ name: 'Ingredient To Be Deleted' })
            .set('Authorization', `Bearer ${token}`);

        ingredient_id = res.body.id;
    });

    it('should delete ingredient', async () => {

        const response = await request(app)
            .delete(`/ingredients/${ingredient_id}`)
            .send()
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);

    });

    // it('should not delete ingredient without admin mode set', async () => {

    //     await request(app)
    //         .patch('/restaurants/reset/admin')
    //         .send()
    //         .set('Authorization', `Bearer ${token}`);

    //     const response = await request(app)
    //         .delete(`/ingredients/${ingredient_id}`)
    //         .send()
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(401);

    // });

});