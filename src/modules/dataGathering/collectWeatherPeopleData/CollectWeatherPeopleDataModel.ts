import axios from "axios";
import prisma from "../../../database/prismaClient";

interface ICreateBasicPredicitonData {
    id_restaurant: string;
    customer_amount: number;
}

interface IWeatherAPIResponse {
    temp_c: number;
    precip_mm: number;
    feelslike_c: number;
}

export class CollectWeatherPeopleDataModel {
    async execute({ id_restaurant, customer_amount }: ICreateBasicPredicitonData) {

        const basicPredictionDataExists = await prisma.basic_Prediction_Data.findFirst({
            where: {
                date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                id_restaurant: {
                    equals: id_restaurant
                },
            }
        });

        if (basicPredictionDataExists) {
            await prisma.basic_Prediction_Data.update({
                where: {
                    id: basicPredictionDataExists.id
                },
                data: {
                    customer_amount
                }
            })
        } else {
            const restaurant = await prisma.restaurants.findFirst({
                where: {
                    id: id_restaurant
                }
            });

            // https://www.weatherapi.com/api-explorer.aspx#current
            const weatherAPIKEY = process.env.weatherAPIKEY;

            const url = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIKEY}&q=${restaurant ? restaurant.city : 'Curitiba'}&aqi=no`
            const data = await axios.get(url).then(res => {
                return res.data
            });

            const { temp_c: temperature, precip_mm: precipitation } = data.current as IWeatherAPIResponse;

            await prisma.basic_Prediction_Data.create({
                data: {
                    date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                    id_restaurant,
                    customer_amount,
                    precipitation,
                    temperature
                }
            })


        }


    }
}
