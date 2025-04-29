import InboxActions from "@/interfaces/InboxActions";

const inboxTypes: InboxActions = {
  DELETE_MESSAGE: "DELETE_MESSAGE",
  ARCHIVE_MESSAGE: "ARCHIVE_MESSAGE",
  MARK_READ: "MARK_READ",
  MARK_UNREAD: "MARK_UNREAD",
  MARK_IMPORTANT: "MARK_IMPORTANT",
  MARK_UNIMPORTANT: "MARK_UNIMPORTANT"
} as const;

export default inboxTypes;
