import { Toast } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";

export function BillowToast({
  toastIsShowing,
  toastMsg = null
}: {
  toastIsShowing: boolean;
  toastMsg: string | null;
}) {
  return (
    <Toast
      className={`fixed bottom-10 right-10 animate-bounce flex-row ${
        toastIsShowing ? "flex" : "hidden"
      }`}
    >
      <FaThumbsUp className="h-5 w-5 text-accent dark:text-secondary" />
      <div className="pl-4 text-sm font-normal">{toastMsg ?? "Success!"}</div>
    </Toast>
  );
}
