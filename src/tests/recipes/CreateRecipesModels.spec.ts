/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Create Recipe', () => {

    var token = '' as string;
    var ingredients = [] as Ingredients[]
    var recipe = {}

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailForRecipe@email.com',
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
            .send({ name: `Recipe Ingredient 0` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Recipe Ingredient 1` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        recipe = {
            name: 'Recipe 01',
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

    });

    it('should create recipe', async () => {

        const response = await request(app)
            .post('/recipes')
            .send(recipe)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);

    });

    it('should not create recipe with existing name', async () => {

        await request(app)
            .post('/recipes')
            .send({ ...recipe, name: 'Recipe X' })
            .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
            .post('/recipes')
            .send({ ...recipe, name: 'Recipe X' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);

    });

    it('should not create ingredient without admin mode set', async () => {

        await request(app)
            .patch('/restaurants/reset/admin')
            .send()
            .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
            .post('/recipes')
            .send({ ...recipe, name: 'Recipe Y' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);

    });

});