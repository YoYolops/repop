import { getConnectionManager } from 'typeorm';
import './setup';

export default async function connect() {
    const connectionManager = await getConnectionManager();
    const connection = connectionManager.create({
        name: 'default',
        type: 'postgres',
        url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        entities: ['src/entities/*.ts'],
    });
    await connection.connect();
    return connection;
}
