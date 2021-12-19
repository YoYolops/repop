import { Router } from 'express';
import disciplineController from '../controllers/disciplineController';
import examController from '../controllers/examController';
import teacherController from '../controllers/teacherController';

const routes = Router();

routes.get('/teacher', teacherController.getExamsGroupedByTeacher);
routes.get('/discipline', disciplineController.getExamsGroupedByDiscipline);
routes.post('', examController.examRegistration);

export default routes;
