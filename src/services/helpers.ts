import examSchema from '../schemas/examSchema';

function isValidRequestExamBody(examBody: any): boolean {
    if (examSchema.validate(examBody).error) return false;
    return true;
}

export default {
    isValidRequestExamBody,
};
