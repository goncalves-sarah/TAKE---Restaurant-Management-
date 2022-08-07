/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients, Orders, Recipes } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Create Order', () => {

    var token = '' as string;
    var info = {
        id_recipe: '' as string,
        portion_id: '' as string
    }

    beforeAll(async () => {

        let ingredients = []

        const user = {
            name: 'Rich',
            email: 'emailForOrder@email.com',
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

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Order Ingredient 0` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Order Ingredient 1` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        const recipe = {
            name: 'Recipe To Be Ordered',
            recipe_ingredients: [
                {
                    id_ingredient: ingredients.at(0)?.id,
                    amount: 100,
                    unit: 'g'
                },
                {
                    id_ingredient: ingredients.at(1)?.id,
                    amount: 200,
                    unit: 'g'
                }
            ]
        }

        info.id_recipe = (await request(app)
            .post('/recipes')
            .send(recipe)
            .set('Authorization', `Bearer ${token}`)).body.id;

        info.portion_id = (await request(app)
            .post('/portionsizes')
            .send({ name: 'Portion Size From Order' })
            .set('Authorization', `Bearer ${token}`)).body.id;
    });

    it('should create order', async () => {

        const order = {
            priority: 2,
            id_recipe: info.id_recipe,
            portion_id: info.portion_id
        }

        const response = await request(app)
            .post('/orders')
            .send(order)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);

    });
});