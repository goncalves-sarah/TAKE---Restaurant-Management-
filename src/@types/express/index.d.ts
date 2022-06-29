declare namespace Express {
    export interface Request {
        id_restaurant: string;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        SALT: string;
        weatherAPIKEY: string;
    }
}