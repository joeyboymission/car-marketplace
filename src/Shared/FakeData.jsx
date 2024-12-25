import { faker } from '@faker-js/faker';

// Create a random car list
function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: 'https://i.pinimg.com/1200x/06/eb/50/06eb508d2950613f694b0e92e169d1c1.jpg',
        miles: 1000,
        gearType: 'Automatic',
        price: faker.finance.amount({ min: 10000, max: 50000 }),
    }
}

const carList = faker.helpers.multiple(createRandomCarList, { count: 7 }); // Create 7 random cars

export default { carList };

