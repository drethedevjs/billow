import { configureStore } from "@reduxjs/toolkit";
import reducer from "./inbox";

console.log("Creating store...");
const store = configureStore({ reducer, devTools: true });
console.log("Store created!");

export default store;
