import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const {
    DB_HOST = process.env.DB_HOST || '124.222.0.245',
    DB_PORT = Number(process.env.DB_PORT) || 3306,
    DB_USER = process.env.DB_USER || 'root',
    DB_PASSWORD = process.env.DB_PASSWORD || '',
    DB_DATABASE = process.env.DB_NAME || 'crm_system',
} = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    namedPlaceholders: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

export default pool;
