import faker from 'faker';

export interface ConfigExamRegistrationBody {
    disciplineId: number,
    teacherId: number,
    categoryId: number,
}

export interface ExamRegistrationBody extends ConfigExamRegistrationBody {
    name: string,
    examLink: string,
};

export default function createExam(config: ConfigExamRegistrationBody): ExamRegistrationBody {
    return {
        name: faker.music.genre(),
        examLink: faker.internet.url(),
        disciplineId: config.disciplineId,
        teacherId: config.teacherId,
        categoryId: config.categoryId,
    }
}
