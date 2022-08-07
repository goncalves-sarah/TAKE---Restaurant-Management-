import { spawn } from "child_process";
import { join } from 'path';

interface IGetForecastedData {
    ingredients: string,
    days_to_be_forecasted: string;
    id_restaurant: string;
}

export class GetForecastedDataModel {
    async execute({ ingredients, days_to_be_forecasted, id_restaurant }: IGetForecastedData) {

        let predictions = {}

        return new Promise((resolve, reject) => {
            try {
                const path = join(__dirname, '/runForecastModel.py');

                const child = spawn('python', [path, days_to_be_forecasted, ingredients, id_restaurant]);

                child.stdout.setEncoding('utf8');

                child.stdout.on('data', (data) => {
                    predictions = JSON.parse(data)
                });

                child.on('close', (data) => {
                    resolve(predictions)
                });

                child.on('error', (err) => {
                    console.log(err);
                })

            } catch (e) {
                reject(e);
            }
        })

    }
}
