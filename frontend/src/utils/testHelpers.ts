import { faker } from '@faker-js/faker';
import { convertToMs } from './time';
export const mockPost = () => {
  return {
    by: faker.person.fullName(),
    id: faker.number.int(),
    score: faker.number.int(),
    time: convertToMs(faker.date.past().getTime()),
    title: faker.lorem.sentence(5),
    url: faker.internet.url(),
    kids: faker.helpers.multiple(faker.number.int, { count: faker.number.int({ max: 20 }) }),
  };
};
export const mockPosts = (count = 20) => {
  return faker.helpers.multiple(mockPost, { count: count });
};
export const mockComment = () => {
  return {
    by: faker.person.fullName(),
    id: faker.number.int(),
    kids: faker.helpers.multiple(faker.number.int, { count: faker.number.int({ min: 1, max: 2 }) }),
    parent: faker.number.int(),
    text: faker.lorem.words({ min: 2, max: 20 }),
    time: convertToMs(faker.date.past().getTime()),
  };
};
export const mockComments = (count = 20) => {
  return faker.helpers.multiple(mockComment, { count: faker.number.int({ min: 1, max: count }) });
};
