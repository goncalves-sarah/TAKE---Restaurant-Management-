/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Edit Recipe', () => {

    var token = '' as string;
    var ingredients = [] as Ingredients[]
    var recipe = {}
    var recipe_id = '' as string;

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailForRecipeToEdit@email.com',
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
            .send({ name: `Recipe To be Edited Ingredient 0` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Recipe To be Edited Ingredient 1` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        recipe = {
            name: 'Recipe To Be Edited',
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

        recipe_id = (await request(app)
            .post('/recipes')
            .send(recipe)
            .set('Authorization', `Bearer ${token}`)).body.id;

    });

    it('should edit recipe ', async () => {

        const updatedRecipe = {
            name: 'Recipe Edited',
            recipe_ingredients: [
                {
                    id_ingredient: ingredients.at(0)?.id,
                    amount: 200,
                    unit: 'g'
                },
                {
                    id_ingredient: ingredients.at(1)?.id,
                    amount: 2,
                    unit: 'L'
                }
            ]
        }

        const response = await request(app)
            .put(`/recipes/${recipe_id}`)
            .send(updatedRecipe)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.name).toBe(updatedRecipe.name);
        expect(response.body).toHaveProperty("id");
    });

    it('should not be able to change name to one from an existing recipe ', async () => {

        const existingRecipe = {
            name: 'Existing Recipe',
            recipe_ingredients: [
                {
                    id_ingredient: ingredients.at(0)?.id,
                    amount: 200,
                    unit: 'g'
                },
                {
                    id_ingredient: ingredients.at(1)?.id,
                    amount: 2,
                    unit: 'L'
                }
            ]
        }

        await request(app)
            .post('/recipes')
            .send(existingRecipe)
            .set('Authorization', `Bearer ${token}`)


        const updatedRecipe = {
            name: existingRecipe.name,
            recipe_ingredients: [
                {
                    id_ingredient: ingredients.at(0)?.id,
                    amount: 200,
                    unit: 'g'
                },
                {
                    id_ingredient: ingredients.at(1)?.id,
                    amount: 2,
                    unit: 'L'
                }
            ]
        }

        const response = await request(app)
            .put(`/recipes/${recipe_id}`)
            .send(updatedRecipe)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(400);

    });

    it('should not edit recipe without admin mode set', async () => {

        const updatedRecipe = {
            name: 'Valid Name',
            recipe_ingredients: [
                {
                    id_ingredient: ingredients.at(0)?.id,
                    amount: 200,
                    unit: 'g'
                },
                {
                    id_ingredient: ingredients.at(1)?.id,
                    amount: 2,
                    unit: 'L'
                }
            ]
        }

        await request(app)
            .patch('/restaurants/reset/admin')
            .send()
            .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
            .put(`/recipes/${recipe_id}`)
            .send(updatedRecipe)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);

    });

});