import { BsEnvelopeArrowDown, BsEnvelopeArrowUpFill } from "react-icons/bs";

const EnvelopeIcons = ({
  id,
  read,
  markRead,
  markUnread
}: {
  id: number;
  read: boolean;
  markRead: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  markUnread: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}) => {
  return (
    <>
      {read ? (
        <button
          title="Mark unread"
          onClick={(e) => markUnread(e, id)}
          className="font-medium text-error hover:underline dark:text-error"
        >
          <BsEnvelopeArrowDown />
        </button>
      ) : (
        <button
          title="Mark read"
          onClick={(e) => markRead(e, id)}
          className="font-bold text-accent hover:underline dark:text-cyan-500"
        >
          <BsEnvelopeArrowUpFill fontWeight="fill" />
        </button>
      )}
    </>
  );
};

export default EnvelopeIcons;
