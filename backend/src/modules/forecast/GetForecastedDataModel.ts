import axios from "axios";

interface IGetForecastedData {
    ingredients: string,
    days_to_be_forecasted: string;
    id_restaurant: string;
}

export class GetForecastedDataModel {
    async execute({ ingredients, days_to_be_forecasted, id_restaurant }: IGetForecastedData) {

        try {
            const url = `${process.env.API_URL}/forecast?id_restaurant=${id_restaurant}&ingredients=${ingredients}&days_to_be_forecasted=${days_to_be_forecasted}`;
            const predictions = await (await axios.get(url)).data;

            return predictions;
        } catch (err) {
            throw new Error("Houve um problema, tente novamente")
        }

    }
}
