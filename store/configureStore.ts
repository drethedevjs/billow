import { configureStore } from "@reduxjs/toolkit";
import chalk from "chalk";
import { useSelector } from "react-redux";
import inboxSlice from "./inbox";
import paymentHistorySlice from "./paymentHistory";
import userAccountSlice from "./userAccount";

console.info(chalk.magenta("Creating store..."));

const store = configureStore({
  reducer: {
    inbox: inboxSlice.reducer,
    account: userAccountSlice.reducer,
    paymentHistory: paymentHistorySlice.reducer
  },
  devTools: true
});

console.info(chalk.magenta("Store created!"));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useBillowSelector = useSelector.withTypes<RootState>();
export default store;
