import 'dotenv/config';
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

const ensureParams = (params) => {
    if (params === undefined || params === null) {
        return [];
    }

    const isArray = Array.isArray(params);
    const isPlainObject = typeof params === 'object' && !isArray;
    
    if (!isArray && !isPlainObject) {
        throw new Error('SQL parameters must be an array or an object');
    }
    return params;
};

export const safeExecute = async (sql, params) => {
    if (typeof sql !== 'string' || sql.trim().length === 0) {
        throw new Error('SQL query must be a non-empty string');
    }

    const validParams = ensureParams(params);
    const [result] = await db.execute(sql, validParams);
    return result;
};