import { Toast } from "flowbite-react";
import { FaTelegramPlane } from "react-icons/fa";

export function BillowToast({
  toastIsShowing,
  toastMsg
}: {
  toastIsShowing: boolean;
  toastMsg: string;
}) {
  return (
    <Toast
      className={`absolute bottom-10 right-10 animate-bounce ${
        toastIsShowing ? "block" : "hidden"
      }`}
    >
      <FaTelegramPlane className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
      <div className="pl-4 text-sm font-normal">{toastMsg ?? "Success!"}</div>
    </Toast>
  );
}
