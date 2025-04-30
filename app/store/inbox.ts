import { BillowAction } from "@/interfaces/BillowAction";
import { InboxItem } from "@/interfaces/InboxItem";
import { InboxAction } from "@/types/InboxAction";

// Action Types
const DELETE_MESSAGE = "DELETE_MESSAGE";
const ARCHIVE_MESSAGE = "ARCHIVE_MESSAGE";
const MARK_READ = "MARK_READ";
const MARK_UNREAD = "MARK_UNREAD";
const MARK_IMPORTANT = "MARK_IMPORTANT";
const MARK_UNIMPORTANT = "MARK_UNIMPORTANT";

// Actions
const inboxActions = {
  markRead: (messageId: number) => {
    return {
      type: MARK_READ as InboxAction,
      payload: messageId
    };
  },
  markUnread: (messageId: number) => {
    return {
      type: MARK_UNREAD as InboxAction,
      payload: messageId
    };
  },
  markImportant: (messageId: number) => {
    return {
      type: MARK_IMPORTANT as InboxAction,
      payload: messageId
    };
  },
  markUnimportant: (messageId: number) => {
    return {
      type: MARK_UNIMPORTANT as InboxAction,
      payload: messageId
    };
  },
  deleteMessage: (messageId: number) => {
    return {
      type: DELETE_MESSAGE as InboxAction,
      payload: messageId
    };
  },
  archiveMessage: (messageId: number) => {
    return {
      type: ARCHIVE_MESSAGE as InboxAction,
      payload: messageId
    };
  }
};

export { inboxActions };

// Reducer
export default function reducer(
  state: InboxItem[] | [] = [],
  action: BillowAction<InboxAction, number>
) {
  switch (action.type) {
    case ARCHIVE_MESSAGE as InboxAction:
      throw new Error("Operation not functional at this time.");
      return state;
    case DELETE_MESSAGE as InboxAction:
      console.log("Message deleted!");
      return state.filter(
        (message: InboxItem) => (action.payload as number) !== message.id
      );
    case MARK_READ as InboxAction:
      console.log("Message marked read!");
      return state.map((message: InboxItem) => {
        if (action.payload === message.id) {
          return { ...message, read: true };
        }

        return message;
      });
    case MARK_IMPORTANT as InboxAction:
      console.log("Message marked important!");
      return state.map((message: InboxItem) => {
        if (action.payload === message.id) {
          return { ...message, important: true };
        }

        return message;
      });
    case MARK_UNIMPORTANT as InboxAction:
      console.log("Message marked unimportant!");
      return state.map((message: InboxItem) => {
        if (action.payload === message.id) {
          return { ...message, important: false };
        }

        return message;
      });
    case MARK_UNREAD as InboxAction:
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
}
