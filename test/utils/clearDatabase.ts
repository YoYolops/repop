import { getRepository } from 'typeorm';
import CategoryEntity from '../../src/entities/CategoryEntity';
import DisciplineEntity from '../../src/entities/DisciplineEntity';
import SemesterEntity from '../../src/entities/SemesterEntity';
import TeacherEntity from '../../src/entities/TeacherEntity';
import TeachersGroupEntity from '../../src/entities/TeachersGroupEntity';
import ExamEntity from '../../src/entities/ExamEntity';

export default async function clearDatabase() {
    const [
        categoryRepository,
        disciplineRepository,
        semesterRepository,
        teacherRepository,
        teachersGroupRepository,
        examRepository
    ] = await Promise.all([
        getRepository(CategoryEntity),
        getRepository(DisciplineEntity),
        getRepository(SemesterEntity),
        getRepository(TeacherEntity),
        getRepository(TeachersGroupEntity),
        getRepository(ExamEntity)
    ]);

    await Promise.all([
        teachersGroupRepository.delete({}),
        examRepository.delete({})
    ])

    await Promise.all([
        teacherRepository.delete({}),
        categoryRepository.delete({}),
        disciplineRepository.delete({})
    ])

    await semesterRepository.delete({})
}