//To create a faker data
export function fakerPerson() {
    const Faker = require('faker');
    return {
        email: Faker.internet.email(),
        name: Faker.name.findName(),
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        userName: Faker.internet.userName(),
        password: Faker.internet.password()
    };
}