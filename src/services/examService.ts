import { getRepository } from 'typeorm';
import helper from './helpers';
import UnformattedRequestBody from '../errors/UnformattedRequestBody';
import TeacherEntity from '../entities/TeacherEntity';
import DisciplineEntity from '../entities/DisciplineEntity';
import CategoryEntity from '../entities/CategorieEntity';
import UnexistentReference from '../errors/UnexistentReference';

async function verifyTeacherIdExistance(teacherId: number): Promise<boolean> {
    const teacherRepository = getRepository(TeacherEntity);
    return !!(await teacherRepository.find({ id: teacherId })).length;
}

async function verifyDisciplineIdExistance(disciplineId: number): Promise<boolean> {
    const disciplineRepository = getRepository(DisciplineEntity);
    return !!(await disciplineRepository.find({ id: disciplineId })).length;
}

async function verifyCategoryIdExistance(categoryId: number): Promise<boolean> {
    const categoryRepository = getRepository(CategoryEntity);
    return !!(await categoryRepository.find({ id: categoryId })).length;
}

async function registerExam(examBody: any) {
    if (!helper.isValidRequestExamBody(examBody)) throw new UnformattedRequestBody('You must format the request body');
    const {
        teacherId,
        disciplineId,
        categoryId,
    } = examBody;

    const dataConsistenceVerifications = await Promise.all([
        verifyTeacherIdExistance(teacherId),
        verifyCategoryIdExistance(categoryId),
        verifyDisciplineIdExistance(disciplineId),
    ]);

    dataConsistenceVerifications.forEach((data) => {
        if (!data) throw new UnexistentReference('One of the relations referenced does not exist');
    });
}

export default {
    registerExam,
};
