export interface InboxItem {
  id: number;
  subject: string;
  sender: string;
  date: Date | string;
  message: string;
  read: boolean; // passed tense (pronounced "red")
  archived: boolean;
  important: boolean;
}
