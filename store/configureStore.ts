import { configureStore } from "@reduxjs/toolkit";
import { inboxSlice } from "./inbox";

console.log("Creating store...");
const store = configureStore({
  reducer: { inbox: inboxSlice.reducer },
  devTools: true
});
console.log("Store created!");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
