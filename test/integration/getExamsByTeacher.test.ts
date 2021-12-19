import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';
import dbPopulator from '../utils/dbPopulator';
import clearDatabase from '../utils/clearDatabase';

describe('GET /exams/teacher', () => {
    let baseDbPopulation;

    beforeAll(async () => {
        await init();
        baseDbPopulation = await dbPopulator();
    })

    afterAll(async () => {
        await clearDatabase();
        await getConnection().close();
    });

    it('must return ')

})