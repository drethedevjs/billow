import { Dispatch, SetStateAction } from "react";

export interface BillowToastContextType {
  showToast: () => void;
  setToastMsg: Dispatch<SetStateAction<string | null>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
}
