import { getRepository } from 'typeorm';
import DisciplineEntity from '../entities/DisciplineEntity';

async function getExamsByDiscipline() {
    const disciplineRepository = getRepository(DisciplineEntity);
    const examsByDiscipline = await disciplineRepository.find({});
    return examsByDiscipline.map((data) => data.getClearedData());
}

export default {
    getExamsByDiscipline,
};
