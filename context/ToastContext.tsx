"use client";
import { BillowToast } from "@/components/BillowToast";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface BillowToastContextType {
  showToast: () => void;
  setToastMsg: Dispatch<SetStateAction<string>>;
}

export const BillowToastContext = createContext<BillowToastContextType>({
  showToast: () => {},
  setToastMsg: () => {}
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastIsShowing, setToastIsShowing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const showToast = () => {
    setToastIsShowing(true);
    setTimeout(() => {
      setToastIsShowing(false);
    }, 5000);
  };
  return (
    <BillowToastContext.Provider value={{ showToast, setToastMsg }}>
      {children}
      <BillowToast toastIsShowing={toastIsShowing} toastMsg={toastMsg} />
    </BillowToastContext.Provider>
  );
};
