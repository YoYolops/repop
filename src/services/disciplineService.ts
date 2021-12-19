import { getRepository } from 'typeorm';
import DisciplineEntity from '../entities/DisciplineEntity';
import Discipline from '../entities/interfaces/Discipline';

async function getExamsByDiscipline(): Promise<Discipline[]> {
    const disciplineRepository = getRepository(DisciplineEntity);
    const examsByDiscipline = await disciplineRepository.find({});
    return examsByDiscipline.map((data) => data.getClearedData());
}

export default {
    getExamsByDiscipline,
};
