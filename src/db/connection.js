import { createConnection } from 'typeorm';
import entities from '../db/entities';

const createDbConnection = async () => {
    return await createConnection({
        type: process.env.DB_DRIVER || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'db_wallet',
        dropSchema: (process.env.DB_DROP === 'true'),
        synchronize: process.env.DB_SYNC || 'true',
        logging: process.env.DB_LOGGING || 'true' ,
        entities
    });
}

export default createDbConnection;