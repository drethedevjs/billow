import inboxSlice from "@/store/inbox";
import { BsEnvelopeArrowDown, BsEnvelopeArrowUpFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
const EnvelopeIcons = ({ id, read }: { id: number; read: boolean }) => {
  const dispatch = useDispatch();
  const { markRead, markUnread } = inboxSlice.actions;
  return (
    <>
      {read ? (
        <button
          title="Mark unread"
          onClick={() => dispatch(markUnread(id))}
          className="font-medium text-error hover:underline dark:text-error"
        >
          <BsEnvelopeArrowDown />
        </button>
      ) : (
        <button
          title="Mark read"
          onClick={() => dispatch(markRead(id))}
          className="font-bold text-accent hover:underline dark:text-cyan-500"
        >
          <BsEnvelopeArrowUpFill fontWeight="fill" />
        </button>
      )}
    </>
  );
};

export default EnvelopeIcons;
