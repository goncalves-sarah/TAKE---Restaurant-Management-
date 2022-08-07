import axios from 'axios';
import prisma from '../../../database/prismaClient';

interface Data {
    forecastday: [
        {
            date: string;
            day: {
                avgtemp_c: number;
                totalprecip_mm: number;
            }
        }
    ]
}

export class GetWeatherForecastModel {
    async execute(days: number, id_restaurant: string) {

        const restaurant = await prisma.restaurants.findFirst({
            where: {
                id: id_restaurant
            }
        });

        try {
            const weatherAPIKEY = process.env.weatherAPIKEY;

            const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKEY}&q=${restaurant ? restaurant.city : 'Curitiba'}&days=${days}&aqi=no&alerts=no`
            const data = await axios.get(url).then(res => {
                return res.data.forecast
            }) as Data;

            let info = [] as unknown as [{}]

            data.forecastday.map(i => {

                const d = {
                    date: i.date,
                    temperature: i.day.avgtemp_c,
                    precipitation: i.day.totalprecip_mm
                }

                info.push(d)
            })

            return info;
        } catch (err) {
            throw new Error("Houve um problema, tente novamente")
        }

    }
}
