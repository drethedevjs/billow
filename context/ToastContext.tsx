"use client";
import { BillowToast } from "@/components/BillowToast";
import { BillowToastContextType } from "@/interfaces/BillowToastContextType";
import { createContext, useState } from "react";

export const BillowToastContext = createContext<BillowToastContextType>({
  showToast: () => {},
  setToastMsg: () => {}
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastIsShowing, setToastIsShowing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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
