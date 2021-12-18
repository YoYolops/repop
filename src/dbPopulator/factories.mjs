import faker from 'faker';

export function createTeacher() {
    return {
        name: faker.name.firstName() +  ' ' + faker.name.lastName(),
    }
}