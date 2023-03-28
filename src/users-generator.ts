import { User } from './Components/types'
import { faker } from '@faker-js/faker'

export const mockArr: User[] = []

export const racersCount: number = 500;

for (let i = 0; i < racersCount; i += 1) {
  const date = new Date(faker.datatype.datetime())
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    speed: faker.random.numeric(2),
    rating: i + 1,
    time: `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
    penaltyTime: faker.random.numeric(2),
    avatar: faker.image.avatar(),
  }
  mockArr.push(user)
}
