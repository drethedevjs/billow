import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";

const StarIcons = ({
  id,
  important,
  markImportant,
  markUnimportant
}: {
  id: number;
  important: boolean;
  markImportant: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  markUnimportant: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}) => {
  return (
    <>
      {important ? (
        <button
          title="Mark unimportant"
          onClick={(e) => markUnimportant(e, id)}
          className="font-medium text-error hover:underline dark:text-error"
        >
          <BsBookmarkStarFill />
        </button>
      ) : (
        <button
          title="Mark important"
          onClick={(e) => markImportant(e, id)}
          className="font-bold text-accent hover:underline dark:text-cyan-500"
        >
          <BsBookmarkStar fontWeight="fill" />
        </button>
      )}
    </>
  );
};

export default StarIcons;
