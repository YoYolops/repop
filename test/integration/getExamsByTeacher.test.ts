import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';

describe('GET /exams/teacher', () => {

    beforeAll(async () => { await init(); })

    afterAll(async () => {
        await getConnection().close();
    });

    it('must return ')

})