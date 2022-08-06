/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Get All Recipe Data', () => {

    var token = '' as string;
    var ingredients = [] as Ingredients[]
    var recipe = {}
    var recipe_id = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailToGetRecipeDataById@email.com',
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
            .send({ name: `Recipe To Get Data Ingredient 0` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Recipe To Get Data Ingredient 1` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        recipe = {
            name: 'Recipe X1',
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

        await request(app)
            .post('/recipes')
            .send(recipe)
            .set('Authorization', `Bearer ${token}`);

        await request(app)
            .post('/recipes')
            .send({ ...recipe, name: 'Recipe X2' })
            .set('Authorization', `Bearer ${token}`);

    });

    it('should get data from all recipes ', async () => {

        const response = await request(app)
            .get(`/recipes`)
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

});