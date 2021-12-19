import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'dev' ? '.env' : '.env.test';

dotenv.config({
    path: envFile,
});