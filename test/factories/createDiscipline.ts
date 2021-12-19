import faker from 'faker';

interface DisciplineRegistrationBody {
    name: string,
    semesterId: number,
};

export default function createDiscipline(semesterId: number): DisciplineRegistrationBody {
    return {
        name: faker.name.jobArea(),
        semesterId,
    }
}
