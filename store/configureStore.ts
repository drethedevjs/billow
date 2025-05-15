import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import inboxSlice from "./inbox";
import paymentHistorySlice from "./paymentHistory";
import userAccountSlice from "./userAccount";

console.info("Creating store...");

const store = configureStore({
  reducer: {
    inbox: inboxSlice.reducer,
    account: userAccountSlice.reducer,
    paymentHistory: paymentHistorySlice.reducer
  },
  devTools: true
});

console.info("Store created!");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useBillowSelector = useSelector.withTypes<RootState>();
export default store;
