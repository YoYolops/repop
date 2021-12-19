import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';
import dbPopulator from '../utils/dbPopulator';
import clearDatabase from '../utils/clearDatabase';
import supertest from 'supertest';

describe('GET /exams', () => {

    beforeAll(async () => {
        await init();
        await dbPopulator();
    })

    afterAll(async () => {
        await clearDatabase();
        await getConnection().close();
    });

    it('GET /exams/teacher return an array of teachers objects with their exams', async () => {
        const result = await supertest(app).get('/exams/teacher');
        expect(result.status).toEqual(200);
        expect(result.body[0]).toHaveProperty('id')
        expect(result.body[0]).toHaveProperty('name')
        expect(result.body[0]).toHaveProperty('exams')
    })

    it('GET /exams/discipline return an array of disciplines with their exams', async () => {
        const result = await supertest(app).get("/exams/discipline")
        expect(result.status).toEqual(200);
        expect(result.body[0]).toHaveProperty('id')
        expect(result.body[0]).toHaveProperty('name')
        expect(result.body[0]).toHaveProperty('semesterId')
        expect(result.body[0]).toHaveProperty('semester')
        expect(result.body[0]).toHaveProperty('teachers')
        expect(result.body[0]).toHaveProperty('exams')
    })

})