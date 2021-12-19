import { getRepository } from 'typeorm';
import TeacherEntity from '../../src/entities/TeacherEntity';
import createTeacher from '../factories/createTeacher';

export default async function insertTeacherIntoDatabase() {
    const teacherBody = createTeacher();
    const teacherRepository = getRepository(TeacherEntity);
    const insertedTeacherObject = await teacherRepository.insert(teacherBody);
    return {
        ...teacherBody,
        id: insertedTeacherObject.raw[0].id,
    };
}