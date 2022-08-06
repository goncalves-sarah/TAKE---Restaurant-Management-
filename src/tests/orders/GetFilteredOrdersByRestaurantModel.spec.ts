/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Get All Filtered Orders Data', () => {

    var token = '' as string;
    var ingredients = [] as Ingredients[]
    var info = {
        id_recipe: '' as string,
        portion_id: '' as string
    }

    beforeAll(async () => {

        const user = {
            name: 'Rich',
            email: 'emailToGetOrdersDataById@email.com',
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

        const recipe = {
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

        info.id_recipe = (await request(app)
            .post('/recipes')
            .send(recipe)
            .set('Authorization', `Bearer ${token}`)).body.id;

        info.portion_id = (await request(app)
            .post('/portionsizes')
            .send({ name: 'Portion Size From Order' })
            .set('Authorization', `Bearer ${token}`)).body.id;

        const order = {
            priority: 2,
            id_recipe: info.id_recipe,
            portion_id: info.portion_id
        }

        await request(app)
            .post('/orders')
            .send(order)
            .set('Authorization', `Bearer ${token}`);

        let order_id = (await request(app)
            .post('/orders')
            .send({ ...order, priotity: 3 })
            .set('Authorization', `Bearer ${token}`)).body.id;

        await request(app)
            .patch(`/orders/${order_id}`)
            .send({ ...order, status: 'Concluído' })
            .set('Authorization', `Bearer ${token}`);

        order_id = (await request(app)
            .post('/orders')
            .send({ ...order, priotity: 1 })
            .set('Authorization', `Bearer ${token}`)).body.id;

        await request(app)
            .patch(`/orders/${order_id}`)
            .send({ ...order, status: 'Concluído' })
            .set('Authorization', `Bearer ${token}`);

        order_id = (await request(app)
            .post('/orders')
            .send({ ...order, priotity: 5 })
            .set('Authorization', `Bearer ${token}`)).body.id;

        await request(app)
            .patch(`/orders/${order_id}`)
            .send({ ...order, status: 'Cancelado' })
            .set('Authorization', `Bearer ${token}`);

    });

    it('should get data from orders with Status Em Progresso', async () => {

        const response = await request(app)
            .get(`/orders?status=Em Progresso`)
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

    it('should get data from orders with Status Concluído', async () => {

        const response = await request(app)
            .get(`/orders?status=Concluído`)
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

    it('should get data from orders with Status Cancelado', async () => {

        const response = await request(app)
            .get(`/orders?status=Cancelado`)
            .send()
            .set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);

    });

});