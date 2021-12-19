import faker from 'faker';

interface SemesterRegistrationBody {
    semester: string,
};

export default function createSemester(): SemesterRegistrationBody {
    return {
        semester: faker.commerce.department(),
    }
}
