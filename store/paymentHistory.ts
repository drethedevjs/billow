import { BillowAction } from "@/interfaces/BillowAction";
import { PaymentHistory } from "@/interfaces/PaymentHistory";
import { createSlice } from "@reduxjs/toolkit";

const paymentHistorySlice = createSlice({
  name: "paymentHistory",
  initialState: [] as PaymentHistory[],
  // initialState: paymentHistorySeedData,
  reducers: {
    addPaymentHistory(
      state: PaymentHistory[],
      action: BillowAction<PaymentHistory>
    ) {
      state.push(action.payload);
    }
  }
});

export default paymentHistorySlice;
