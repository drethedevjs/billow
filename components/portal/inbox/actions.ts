import { InboxAction } from "@/types/InboxAction";
import inboxTypes from "./actionsTypes";

const inboxActions = {
  markRead: (messageId: number) => {
    return {
      type: inboxTypes.MARK_READ as InboxAction,
      payload: messageId
    };
  },
  markUnread: (messageId: number) => {
    return {
      type: inboxTypes.MARK_UNREAD as InboxAction,
      payload: messageId
    };
  },
  markImportant: (messageId: number) => {
    return {
      type: inboxTypes.MARK_IMPORTANT as InboxAction,
      payload: messageId
    };
  },
  markUnimportant: (messageId: number) => {
    return {
      type: inboxTypes.MARK_UNIMPORTANT as InboxAction,
      payload: messageId
    };
  },
  deleteMessage: (messageId: number) => {
    return {
      type: inboxTypes.DELETE_MESSAGE as InboxAction,
      payload: messageId
    };
  }
};

export default inboxActions;
