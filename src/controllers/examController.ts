import { Request, Response, NextFunction } from 'express';
import UnformattedRequestBody from '../errors/UnformattedRequestBody';
import helpers from './helpers';
import examService from '../services/examService';

async function examRegistration(req: Request, res: Response, next: NextFunction) {
    const expectedKeys = [
        'name',
        'examLink',
        'disciplineId',
        'teacherId',
        'categoryId',
    ];
    try {
        expectedKeys.forEach((expectedKey) => {
            if (!req.body[expectedKey]) throw new UnformattedRequestBody('Missing one or more values');
        });

        const response = await examService.registerExam(req.body);
        return res.send(response);
    } catch (error) {
        if (helpers.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    examRegistration,
};
