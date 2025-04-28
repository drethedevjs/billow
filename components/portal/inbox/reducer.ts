import { BillowAction } from "@/interfaces/BillowAction";
import { InboxItem } from "@/interfaces/InboxItem";
import { InboxAction } from "@/types/InboxAction";
import { Reducer } from "redux";
import inboxTypes from "./actionsTypes";

const reducer: Reducer<InboxItem[] | [], BillowAction<InboxAction, number>> = (
  state: InboxItem[] | [] = [],
  action: BillowAction<InboxAction, number>
) => {
  switch (action.type) {
    case inboxTypes.ARCHIVE_MESSAGE:
      console.log("Message archived!");
      return state;
    case inboxTypes.DELETE_MESSAGE:
      console.log("Message deleted!");
      return state.filter(
        (message: InboxItem) => (action.payload as number) !== message.id
      );
    case inboxTypes.MARK_READ:
      console.log("Message marked read!");
      return state.map((message: InboxItem) => {
        if (action.payload === message.id) {
          return { ...message, read: true };
        }

        return message;
      });
    case inboxTypes.MARK_UNREAD:
      console.log("Message marked unread!");
      return state.map((message: InboxItem) => {
        if (action.payload === message.id) {
          return { ...message, read: false };
        }

        return message;
      });
    default:
      return state;
  }
};

export default reducer;
