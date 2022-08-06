import { join } from "path";
import { readdir } from 'fs';


export class GetIngredientsWithTrainedModelsModel {
    async execute(id_restaurant: string) {

        const path = join(__dirname, '..', '..', '..', '/models');
        const ingredients = [] as string[]

        return new Promise((resolve, reject) => {
            readdir(path, function (err, files) {
                //handling error
                if (err) {
                    console.log('estamos aqui')
                    reject('Something went wrong. Try Again');
                }
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    if (file.split("_")[0] = id_restaurant) {
                        const ingredient = file.split("_")[1].split("Model")[0];
                        ingredients.push(ingredient)
                    }
                });

                resolve(ingredients)

            });
        });
    }
}
