import { accountData } from "@/data/accountData";
import { BillPayment } from "@/interfaces/account/BillPayment";
import { BillowAction } from "@/interfaces/BillowAction";
import { createSlice } from "@reduxjs/toolkit";

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: accountData ?? [],
  reducers: {
    payAllBills(state, action: BillowAction<number>) {
      const accountNumber = action.payload;
      const account = state.find((a) =>
        a.locations.some((l) => l.accountNumber === accountNumber)
      );

      if (!account) return;

      const location = account.locations.find(
        (l) => l.accountNumber === accountNumber
      );

      location?.services.forEach((s) => (s.price = 0));
    },
    payBill(state, action: BillowAction<BillPayment>) {
      const account = state.find((a) =>
        a.locations.find(
          (l) => l.accountNumber === action.payload.accountNumber
        )
      );

      const location = account?.locations.find(
        (l) => l.accountNumber === action.payload.accountNumber
      );

      const service = location?.services.find(
        (s) => s.type.toString() === action.payload.serviceName
      );

      if (!service) return;

      service.price = service?.price - action.payload.payment;
    }
  }
});

export default userAccountSlice;
