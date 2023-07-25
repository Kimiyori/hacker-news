import { faker } from '@faker-js/faker';
const mockPost = () => {
  return {
    by: faker.person.fullName(),
    id: faker.number.int(),
    score: faker.number.int(),
    time: faker.date.past().getTime(),
    title: faker.lorem.lines(),
    url: faker.internet.url(),
  };
};
export const mockPosts = (count: number = 20) => {
  return faker.helpers.multiple(mockPost, { count: count });
};
