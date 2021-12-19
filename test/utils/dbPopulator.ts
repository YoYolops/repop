import createCategory from '../factories/createCategory';
import createDiscipline from '../factories/createDiscipline';
import createSemester from '../factories/createSemester';
import createTeacher from '../factories/createTeacher';
import { getRepository, InsertResult } from 'typeorm';
import CategoryEntity from '../../src/entities/CategoryEntity';
import DisciplineEntity from '../../src/entities/DisciplineEntity';
import SemesterEntity from '../../src/entities/SemesterEntity';
import TeacherEntity from '../../src/entities/TeacherEntity';
import TeachersGroupEntity from '../../src/entities/TeachersGroupEntity';
import ExamEntity from '../../src/entities/ExamEntity';
import createExam, { ExamRegistrationBody } from '../factories/createExam';

export default async function dbPopulator(): Promise<ExamRegistrationBody> {
    const getId = (insertionObject: InsertResult) => insertionObject.raw[0].id;

    const [
        categoryRepository,
        disciplineRepository,
        semesterRepository,
        teacherRepository,
        teachersGroupRepository,
        examRepository,
    ] = [
        getRepository(CategoryEntity),
        getRepository(DisciplineEntity),
        getRepository(SemesterEntity),
        getRepository(TeacherEntity),
        getRepository(TeachersGroupEntity),
        getRepository(ExamEntity),
    ];

    const semesterData = createSemester();
    const teacherData = createTeacher();
    const categoryData = createCategory();

    const [ semesterId, teacherId, categoryId ] = (await Promise.all([
       semesterRepository.insert(semesterData),
       teacherRepository.insert(teacherData),
       categoryRepository.insert(categoryData),
    ])).map((insertedObject) => getId(insertedObject));

    const disciplineData = createDiscipline(semesterId);
    const disciplineId = getId((await disciplineRepository.insert(disciplineData)));

    await teachersGroupRepository.insert({
        disciplineId,
        teacherId
    })

    const examData = createExam({
        disciplineId,
        teacherId,
        categoryId,
    })
    await examRepository.insert(examData)

    return examData;
}