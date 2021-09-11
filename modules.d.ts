declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        DATABASE_CONNECTION: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
    }
}
