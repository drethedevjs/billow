import { InboxItem } from "@/interfaces/InboxItem";
import { InboxAction } from "@/types/InboxAction";
import { Action, Reducer } from "redux";
import types from "./actions";

const reducer: Reducer<InboxItem | [], Action<InboxAction>> = (
  state: InboxItem | [] = [],
  action: Action<InboxAction>
) => {
  switch (action.type) {
    case types.ARCHIVE_MESSAGE:
      console.log("Message archived!");
      return state;
    case types.DELETE_MESSAGE:
      console.log("Message deleted!");
      return state;
    case types.MARK_READ:
      console.log("Message marked read!");
      return state;
    case types.MARK_UNREAD:
      console.log("Message marked unread!");
      return state;
    default:
      return state;
  }
};

export default reducer;
