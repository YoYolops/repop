import { Request, Response, NextFunction } from 'express';
import helpers from './helpers';
import disciplineService from '../services/disciplineService';

async function getExamsGroupedByDiscipline(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await disciplineService.getExamsByDiscipline();
        return res.send(response);
    } catch (error) {
        if (helpers.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    getExamsGroupedByDiscipline,
};
