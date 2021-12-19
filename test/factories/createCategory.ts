import faker from 'faker';

interface CategoryRegistrationBody {
    name: string,
};

export default function createCategory(): CategoryRegistrationBody {
    return {
        name: faker.name.jobType(),
    }
}
