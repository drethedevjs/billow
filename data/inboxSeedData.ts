import { InboxItem } from "@/interfaces/InboxItem";
import { faker } from "@faker-js/faker";

function generateInboxItems(): InboxItem[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.number.int({ min: 100, max: 9999 }),
    subject: faker.book.title(),
    sender: faker.internet.email({ provider: "billow.com" }),
    date: faker.date.recent({ days: 30 }).toString(),
    message: faker.lorem.sentences(),
    read: false,
    archived: false,
    important: false
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const inboxSeedData = generateInboxItems();

export default inboxSeedData;
