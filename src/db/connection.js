import { createConnection as connect } from 'typeorm';
import entities from '../db/entities';

const createConnection = async () => {
    const connection = await connect({
        type: process.env.DB_DRIVER,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.DB_SYNC,
        logging: process.env.DB_LOGGING,
        entities
    });

    return connection;
}

export default createConnection;