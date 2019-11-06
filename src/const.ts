require('dotenv').config();

// SERVER
export const SERVER_PORT = process.env.SERVER_PORT || 4000;

// JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// DB
export const DB_SERVER = process.env.DB_SERVER || 'localhost';
export const DB_USER = process.env.DB_USER || 'sa';
export const DB_PASS = process.env.DB_PASS || '123456';
export const DB_DATABASE_PARADISE = process.env.DB_DATABASE_PARADISE || 'Paradise';

// APOLLO ENGINE
export const AE_API_KEY = process.env.ENGINE_API_KEY;
