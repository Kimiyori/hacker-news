import { faker } from '@faker-js/faker';

export const mockPost = (type?: string) => {
  return {
    by: faker.person.fullName(),
    descendants: faker.number.int(),
    id: faker.number.int(),
    score: faker.number.int(),
    time: Math.floor(faker.date.past().getTime() / 1000),
    title: faker.lorem.sentence(5),
    url: faker.internet.url(),
    kids: faker.helpers.multiple(faker.number.int, {
      count: faker.number.int({ max: 20 }),
    }),
    type: type ? type : faker.string.sample(5),
  };
};
export const mockPosts = (count = 20) => {
  return faker.helpers.multiple(mockPost, { count: count });
};
