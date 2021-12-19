import examSchema from '../schemas/examSchema';
import DisciplineEntity from '../entities/DisciplineEntity';
import TeacherEntity from '../entities/TeacherEntity';

function isValidRequestExamBody(examBody: any): boolean {
    if (examSchema.validate(examBody).error) return false;
    return true;
}

function manageTeacherDisciplineRelationConsistence(
    teacher: TeacherEntity,
    discipline: DisciplineEntity,
): boolean {
    const teacherId = teacher.id;
    const disciplineTeachersMatch = discipline.teacher.find((teacherData) => (
        teacherData.id === teacherId
    ));
    return !!disciplineTeachersMatch;
}

export default {
    isValidRequestExamBody,
    manageTeacherDisciplineRelationConsistence,
};
