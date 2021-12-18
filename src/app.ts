import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import serverErrorHandler from './middlewares/serverErrorHandler';
import examRouter from './routers/examRouter';

import connectDatabase from './database';

export async function init() {
    await connectDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/exams', examRouter);

app.use(serverErrorHandler);

export default app;
