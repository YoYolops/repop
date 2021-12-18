import { Request, Response, NextFunction } from 'express';
import helpers from './helpers';
import teacherService from '../services/teacherService';

async function getExamsGroupedByTeacher(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await teacherService.getExamsByTeacher();
        return res.send(response);
    } catch (error) {
        if (helpers.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    getExamsGroupedByTeacher,
};
