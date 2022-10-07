declare namespace Express {
    export interface Request {
        id_restaurant: string;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        SALT: string;
        SALT_RESET_PASSWORD: string;
        SALT_REFRESH_TOKEN: string;
        weatherAPIKEY: string;
        DATABASE_URL: string;
        expires_in: string;
        expires_in_refresh_token: string;
        expires_in_refresh_token_days: string;
        API_URL: string;
        FRONT_URL: string;
        MAILTRAP_HOST: string;
        MAILTRAP_PORT: string;
        MAILTRAP_USER: string;
        MAILTRAP_PASSWORD: string;
    }
}