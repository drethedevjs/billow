import { InboxItem } from "@/interfaces/InboxItem";
import { faker } from "@faker-js/faker";

function generateInboxItems(): InboxItem[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.number.int({ min: 100, max: 999 }),
    subject: faker.lorem.words({ min: 1, max: 3 }),
    sender: faker.internet.email({ provider: "billow.com" }),
    date: faker.date.recent({ days: 30 }).toString(),
    message: faker.lorem.paragraph(),
    read: false,
    archived: false,
    important: false
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const inboxSeedData = generateInboxItems();

export default inboxSeedData;
