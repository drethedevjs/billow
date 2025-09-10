"use client";
import { BillowToast } from "@/components/BillowToast";
import { BillowToastContextType } from "@/interfaces/BillowToastContextType";
import { createContext, useState } from "react";

export const BillowToastContext = createContext<BillowToastContextType>({
  showToast: () => {},
  setToastMsg: () => {},
  setIsError: () => {}
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastIsShowing, setToastIsShowing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = () => {
    setToastIsShowing(true);
    setTimeout(() => {
      setToastIsShowing(false);
    }, 5000);
  };
  return (
    <BillowToastContext.Provider value={{ showToast, setToastMsg, setIsError }}>
      {children}
      <BillowToast
        toastIsShowing={toastIsShowing}
        toastMsg={toastMsg}
        isError={isError}
      />
    </BillowToastContext.Provider>
  );
};
