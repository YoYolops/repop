import { getRepository } from 'typeorm';
import helper from './helpers';
import UnformattedRequestBody from '../errors/UnformattedRequestBody';
import TeacherEntity from '../entities/TeacherEntity';
import DisciplineEntity from '../entities/DisciplineEntity';
import CategoryEntity from '../entities/CategoryEntity';
import UnexistentReference from '../errors/UnexistentReference';
import * as Request from '../controllers/interfaces/Request';
import ExamEntity from '../entities/ExamEntity';
import * as Response from './interfaces/Response';
import NotFound from '../errors/NotFound';
import Conflict from '../errors/Conflict';

async function verifyIdExistance(entity: any, id: number): Promise<any> {
    const repository = getRepository(entity);
    const found = (await repository.find({ id }));
    if (found.length) return found[0];
    return false;
}

async function isExamLinkAlreadyRegistered(examLink: string): Promise<boolean> {
    const examRepository = getRepository(ExamEntity);
    return !!(await examRepository.find({ examLink })).length;
}

async function registerExam(examBody: Request.Exam): Promise<Response.Exam> {
    if (!helper.isValidRequestExamBody(examBody)) throw new UnformattedRequestBody('You must format the request body');
    const {
        examLink,
        teacherId,
        disciplineId,
        categoryId,
    } = examBody;

    const dataFound = await Promise.all([
        verifyIdExistance(TeacherEntity, teacherId),
        verifyIdExistance(CategoryEntity, categoryId),
        verifyIdExistance(DisciplineEntity, disciplineId),
    ]);

    dataFound.forEach((data) => {
        if (!data) throw new NotFound('One of the ids provided does not exist');
    });

    const teacherDataFound = dataFound[0];
    const disciplineDataFound = dataFound[2];

    const relationsConsistence = helper.isTeacherDisciplineRelationConsistent(
        teacherDataFound,
        disciplineDataFound,
    );

    if (!relationsConsistence) throw new UnexistentReference('One or more of the relations provided does not exist');

    const isExamLinkRegistered = await isExamLinkAlreadyRegistered(examLink);
    if (isExamLinkRegistered) throw new Conflict('The examLink provided is already registered');

    const examRepository = getRepository(ExamEntity);
    const registeredExam = await examRepository.insert(examBody);
    return registeredExam.raw[0];
}

export default {
    registerExam,
};
