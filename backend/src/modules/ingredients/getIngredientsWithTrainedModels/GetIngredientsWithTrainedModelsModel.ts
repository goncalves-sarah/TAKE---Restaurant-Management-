import axios from "axios";

export class GetIngredientsWithTrainedModelsModel {
    async execute(id_restaurant: string) {

        try {
            const url = `http://localhost:5000/ingredients?id_restaurant=${id_restaurant}`;
            const ingredients = await (await axios.get(url)).data;

            return ingredients;

        } catch (err) {
            throw new Error("Houve um problema, tente novamente")
        }

    }
}
