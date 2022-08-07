import axios from 'axios';

interface City {
    nome: string;
}

export class GetCityByUFModel {
    async execute(UF: string) {

        try {
            const cities = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`).then(res => {
                const data = res.data as City[]
                return data.map(city => city.nome);
            });

            return cities;
        } catch (err) {
            throw new Error("Houve um problema, tente novamente")
        }

    }
}
