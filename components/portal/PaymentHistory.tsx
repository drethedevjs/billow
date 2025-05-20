import useUser from "@/hooks/useUser";
import Address from "@/interfaces/account/Address";
import { PaymentHistory as PayHist } from "@/interfaces/PaymentHistory";
import { useBillowSelector } from "@/store/configureStore";
import moment from "moment";
import React from "react";

const PaymentHistory = () => {
  const user = useUser();
  const paymentHistory: PayHist[] = useBillowSelector((s) =>
    s.paymentHistory.filter((ph) => ph.userId === user.id)
  );

  const convertAddressToString = (address: Address) => {
    return `${address.address1}, ${
      address.address2 ? address.address2 + "," : ""
    } ${address.city}, ${address.state}, ${address.postal}`;
  };
  return (
    <section id="payment-history">
      <h1>Payment History</h1>

      <table className="table-fixed border md:w-2/3 w-full text-center mt-10 rounded-md">
        <thead>
          <tr className="text-2xl h-16 bg-accent text-white">
            <th>Date</th>
            <th>Account</th>
            <th>Address</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((ph) => {
            return (
              <React.Fragment key={ph.id}>
                <tr className="border h-10">
                  <td>{moment(ph.date).format("MMMM D, yyyy")}</td>
                  <td>{ph.accountNumber}</td>
                  <td>{convertAddressToString(ph.address)}</td>
                  <td>${ph.total.toFixed(2)}</td>
                </tr>
                <tr className="border-b-4 bg-neutral-200 font-semibold text-primary">
                  <td colSpan={4}>
                    <ul>
                      {ph.servicePaymentHistory.map((sph) => {
                        return (
                          <React.Fragment key={sph.service}>
                            <li className="list-none border-b h-8 text-right pr-10">
                              {sph.service} - ${sph.amount.toFixed(2)}
                            </li>
                            <li
                              className={`list-none border-b h-8 text-right pr-10 bg-error text-white ${
                                sph.penaltyAmount ? "" : "hidden"
                              }`}
                            >
                              Penalty - ${sph.penaltyAmount.toFixed(2)}
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default PaymentHistory;
