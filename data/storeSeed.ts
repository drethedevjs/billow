import { InboxItem } from "@/interfaces/InboxItem";
import { faker } from "@faker-js/faker";

function generateInboxItems(): InboxItem[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.number.int(),
    subject: faker.lorem.words(),
    sender: faker.internet.email(),
    date: faker.date.recent({ days: 30 }),
    message: faker.lorem.paragraph(),
    read: false,
    archived: false,
    important: false
  })).sort((a, b) => b.date.getTime() - a.date.getTime());
}

const inboxSeedData = generateInboxItems();

export default inboxSeedData;
