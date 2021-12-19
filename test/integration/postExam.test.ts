import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';
import dbPopulator from '../utils/dbPopulator';
import clearDatabase from '../utils/clearDatabase';
import supertest from 'supertest';
import createExam, { ExamRegistrationBody, ConfigExamRegistrationBody } from '../factories/createExam';
import insertTeacherIntoDatabase from '../utils/insertTeacherIntoDatabase';

describe('POST /exams', () => {

    let examData: ExamRegistrationBody;
    let configBody: ConfigExamRegistrationBody;

    beforeAll(async () => {
        await init();
    })

    beforeEach(async () => {
        examData = await dbPopulator();
        configBody = {
            disciplineId: examData.disciplineId,
            teacherId: examData.teacherId,
            categoryId: examData.categoryId,
        }
    })

    afterAll(async () => {
        await getConnection().close();
    });

    afterEach(async () => {
        await clearDatabase();
    })

    it('must create new exam, returning its id, when sending proper data', async () => {
        const properBody = createExam(configBody);

        const result = await supertest(app)
            .post('/exams')
            .send(properBody)
        
        expect(result.status).toEqual(201);
        expect(result.body).toHaveProperty('id');
    })

    it('must return 400 for missing properties on body', async () => {
        const examBody = createExam(configBody);
        delete examBody.categoryId;

        const result = await supertest(app)
            .post('/exams')
            .send(examBody)
        
        expect(result.status).toEqual(400);
    })

    it('must return 400 for wrong propertie type', async () => {
        const examBody: any = createExam(configBody);
        examBody.examLink = 1;

        const result = await supertest(app)
            .post('/exams')
            .send(examBody)
        
        expect(result.status).toEqual(400);
    })

    it('must return 404 when informing any unexistent id', async () => {
        const examBody = createExam(configBody);
        examBody.categoryId = 399;

        const result = await supertest(app)
            .post('/exams')
            .send(examBody)
        
        expect(result.status).toEqual(404);
    })

    it('must return 406 when informing invalid teacher/discipline relation', async () => {
        const examBody = createExam(configBody);
        const teacherWithoutDisciplineRelations = await insertTeacherIntoDatabase();
        examBody.teacherId = teacherWithoutDisciplineRelations.id;

        const result = await supertest(app)
            .post('/exams')
            .send(examBody)
        
        expect(result.status).toEqual(406);
    })

    it('must return 409 when informing an alreay registered examLink', async () => {
        const examBody = createExam(configBody);
        examBody.examLink = examData.examLink;

        const result = await supertest(app)
            .post('/exams')
            .send(examBody)
        
        expect(result.status).toEqual(409);
    })

})