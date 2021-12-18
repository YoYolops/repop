import { Router } from 'express';
import disciplineController from '../controllers/disciplineController';
import teacherController from '../controllers/teacherController';

const routes = Router();

routes.get('/teacher', teacherController.getExamsGroupedByTeacher);
routes.get('/discipline', disciplineController.getExamsGroupedByDiscipline);

export default routes;
