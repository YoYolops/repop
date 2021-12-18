import joi from 'joi';

const examSchema = joi.object({
    name: joi.string().required(),
    examLink: joi.string().uri().required(),
    disciplineId: joi.number().required(),
    teacherId: joi.number().required(),
    categoryId: joi.number().required(),
});

export default examSchema;
