import { getRepository } from 'typeorm';
import Teacher from '../entities/interfaces/Teacher';
import TeacherEntity from '../entities/TeacherEntity';

async function getExamsByTeacher(): Promise<Teacher[]> {
    const teacherRepository = getRepository(TeacherEntity);
    const examsByTeacher = await teacherRepository.find({
        relations: ['exams'],
    });
    return examsByTeacher.map((exam) => exam.getClearedData());
}

export default {
    getExamsByTeacher,
};
