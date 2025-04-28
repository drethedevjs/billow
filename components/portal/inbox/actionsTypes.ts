import InboxActions from "@/interfaces/InboxActions";

const inboxTypes: InboxActions = {
  DELETE_MESSAGE: "DELETE_MESSAGE",
  ARCHIVE_MESSAGE: "ARCHIVE_MESSAGE",
  MARK_READ: "MARK_READ",
  MARK_UNREAD: "MARK_UNREAD"
} as const;

export default inboxTypes;
