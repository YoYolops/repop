import faker from 'faker';

interface TeacherRegistrationBody {
    name: string,
};

export default function createTeacher(): TeacherRegistrationBody {
    return {
        name: faker.name.firstName() +  ' ' + faker.name.lastName(),
    }
}
