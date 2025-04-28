import inboxSeedData from "@/data/storeSeed";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

console.log("Creating store...");
const store = createStore(reducer, inboxSeedData);
console.log("Store created!");

export default store;
