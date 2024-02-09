require('dotenv').config();

export const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
export const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

export const MARVEL_API_URL = process.env.MARVEL_API_URL;
export const MARVEL_API_PUBLIC_KEY = process.env.MARVEL_API_PUBLIC_KEY;
export const MARVEL_API_PRIVATE_KEY = process.env.MARVEL_API_PRIVATE_KEY;
export const MARVEL_MAX_LIMIT = Number(process.env.MARVEL_MAX_LIMIT ?? 100);
