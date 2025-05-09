import paymentHistorySeedData from "@/data/paymentHistorySeedData";
import { createSlice } from "@reduxjs/toolkit";

const paymentHistorySlice = createSlice({
  name: "paymentHistory",
  initialState: paymentHistorySeedData,
  reducers: {
    getPaymentHistory() {}
  }
});

export default paymentHistorySlice;
