import inboxSlice from "@/store/inbox";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const StarIcons = ({ id, important }: { id: number; important: boolean }) => {
  const dispatch = useDispatch();
  const { markImportant, markUnimportant } = inboxSlice.actions;
  return (
    <>
      {important ? (
        <button
          title="Mark unimportant"
          onClick={() => dispatch(markUnimportant(id))}
          className="font-medium text-error hover:underline dark:text-error"
        >
          <BsBookmarkStarFill />
        </button>
      ) : (
        <button
          title="Mark important"
          onClick={() => dispatch(markImportant(id))}
          className="font-bold text-accent hover:underline dark:text-cyan-500"
        >
          <BsBookmarkStar fontWeight="fill" />
        </button>
      )}
    </>
  );
};

export default StarIcons;
