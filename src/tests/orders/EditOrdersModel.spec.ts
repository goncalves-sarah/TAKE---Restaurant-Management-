/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { Ingredients } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";

describe('Edit Order', () => {

    var token = '' as string;
    var order_id = '' as string;
    var edited_info = {
        id_recipe: '' as string,
        portion_id: '' as string
    }

    beforeAll(async () => {

        let ingredients = []
        let info = {
            id_recipe: '' as string,
            portion_id: '' as string
        }

        const user = {
            name: 'Rich',
            email: 'emailForEditedOrder@email.com',
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
            .send({ name: `Edited Order Ingredient 0` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        ingredients.push((await request(app)
            .post('/ingredients')
            .send({ name: `Edited Order Ingredient 1` })
            .set('Authorization', `Bearer ${token}`)).body as Ingredients)

        const recipe = {
            name: 'Recipe To Be Ordered & Edited',
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

        edited_info.id_recipe = (await request(app)
            .post('/recipes')
            .send({ ...recipe, name: 'Edited Recipe' })
            .set('Authorization', `Bearer ${token}`)).body.id;

        info.portion_id = (await request(app)
            .post('/portionsizes')
            .send({ name: 'Portion Size From Order to Be Edited' })
            .set('Authorization', `Bearer ${token}`)).body.id;

        edited_info.portion_id = (await request(app)
            .post('/portionsizes')
            .send({ name: 'Edited Portion Size From Order to Be Edited' })
            .set('Authorization', `Bearer ${token}`)).body.id;

        const order = {
            priority: 2,
            id_recipe: info.id_recipe,
            portion_id: info.portion_id
        }

        order_id = (await request(app)
            .post('/orders')
            .send(order)
            .set('Authorization', `Bearer ${token}`)).body.id;

    });

    it('should edit order ', async () => {

        const updatedOrder = {
            status: 'Concluído',
            priority: 3,
            id_recipe: edited_info.id_recipe,
            portion_id: edited_info.portion_id
        }

        const response = await request(app)
            .patch(`/orders/${order_id}`)
            .send(updatedOrder)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.priority).toBe(updatedOrder.priority);
        expect(response.body.status).toBe(updatedOrder.status);
        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(200);
    });

});