import { Toast } from "flowbite-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export function BillowToast({
  toastIsShowing,
  toastMsg = null,
  isError = false
}: {
  toastIsShowing: boolean;
  toastMsg: string | null;
  isError: boolean;
}) {
  return (
    <Toast
      className={`fixed bottom-10 right-10 animate-bounce flex-row ${
        toastIsShowing ? "flex" : "hidden"
      }`}
    >
      {isError ? (
        <FaThumbsDown className="h-5 w-5 text-error" />
      ) : (
        <FaThumbsUp className="h-5 w-5 text-accent dark:text-secondary" />
      )}
      <div className="pl-4 text-sm font-normal">{toastMsg ?? "Success!"}</div>
    </Toast>
  );
}
