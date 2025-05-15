"use client";
import { PlaidContext } from "@/context/PlaidContext";
import { AccountData } from "@/interfaces/account/AccountData";
import Service from "@/interfaces/account/Service";
import type { RootState } from "@/store/configureStore";
import { changeToMostPrice } from "@/utils/dashboardHelper";
import plaidHelper from "@/utils/plaidHelper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from "flowbite-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useSelector } from "react-redux";
import PaymentButton from "./PaymentButton";

const Dashboard = () => {
  const whichAccount: number = 4;
  const accountData: AccountData = useSelector<RootState, AccountData>(
    (s) => s.account[whichAccount]
  );

  const linkToken = useContext(PlaidContext);
  const [whichLocation, setWhichLocation] = useState<number>(0);
  const services: Service[] = accountData.locations[whichLocation].services;
  const [processing, setProcessing] = useState<boolean>(false);
  const [servicePaymentAmounts, setServicePaymentAmounts] = useState<
    Record<string, number>
  >({});

  const config: PlaidLinkOptions = {
    // onSuccess runs when users links their bank accounts.
    onSuccess: plaidHelper.getAndStoreAccessToken,
    onExit: plaidHelper.logErrorsToConsole,
    // onEvent: (eventName, metadata) => {},
    token: linkToken
  };

  const { open } = usePlaidLink(config);

  useEffect(() => {
    const firstAccount = document.getElementsByClassName("account-number")[0];
    firstAccount.classList.add("bg-accent");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectLocation = (e: any, locationIdx: number) => {
    setServicePaymentAmounts({ "": 0 });
    const activeAccountEl = document.getElementsByClassName(
      "bg-accent account-number"
    );
    activeAccountEl[0]?.classList.remove("bg-accent");
    e.target?.classList.add("bg-accent");
    setWhichLocation(locationIdx);
  };

  const updateServicePaymentAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void => {
    const amount = Number(e.target.value);

    const service = services.find((s) => s.type === type);
    if (!service) return;

    if (amount > service.price) {
      const mostCustomerCanPay = changeToMostPrice(type, service);
      setServicePaymentAmounts((prev) => ({
        ...prev,
        [type]: mostCustomerCanPay
      }));

      return;
    }

    setServicePaymentAmounts((prev) => ({ ...prev, [type]: amount }));
  };

  const runMockFunc = (mockFunction: () => Promise<void>) => {
    setProcessing(true);

    setTimeout(async () => {
      await mockFunction();
      setProcessing(false);
      setServicePaymentAmounts({});
    }, 3000);
  };

  const totalDue = useMemo(() => {
    return services
      .reduce(
        (acc, currentValue) => acc + currentValue.price + currentValue.penalty,
        0
      )
      .toFixed(2);
  }, [services]);

  const calcTotalPayment = () => {
    const paymentAmounts = Object.values(servicePaymentAmounts);

    const total = paymentAmounts
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2);

    return total;
  };

  return (
    <>
      <h1>Dashboard</h1>

      <h2 className="mt-8 p-3 bg-accent text-white font-semibold rounded-sm">
        {accountData.utilityCompanyName}
      </h2>

      <button
        onClick={() => open()}
        className="bg-black px-5 py-3 text-white rounded-md font-semibold my-5 focus:ring-4 focus:ring-neutral-300"
      >
        Connect to Plaid
      </button>

      <p className="my-4">
        <span className="font-semibold">Customer Name: </span>
        {accountData.accountHolderFirstName} {accountData.accountHolderLastName}
      </p>
      <hr></hr>
      <div className="flex xl:flex-row flex-col mt-5">
        <div className="w-full xl:w-1/2">
          <h3 className="text-center mb-4">Account Number</h3>
          <ul className="bg-primary">
            {accountData.locations.map((l, idx) => {
              return (
                <li
                  key={l.accountNumber}
                  id={l.accountNumber.toString()}
                  onClick={(e) => selectLocation(e, idx)}
                  className="border-b-2 text-center p-3 text-white account-number cursor-pointer"
                >
                  {l.accountNumber} | {l.address.address1}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full xl:w-1/2">
          <h3 className="text-center mb-4">Services</h3>
          <div className="px-4 pb-5">
            <Table>
              <TableHead className="dark:bg-accent">
                <TableRow className="dark:!bg-accent dark:text-white">
                  <TableHeadCell>Utility</TableHeadCell>
                  <TableHeadCell>Cost</TableHeadCell>
                  <TableHeadCell>Payment</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {services.map((s, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <TableRow
                        key={s.type}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {s.type}
                        </TableCell>
                        <TableCell>${s.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <TextInput
                            id={s.type.toLowerCase()}
                            className="paymentAmountInput"
                            type="number"
                            placeholder="0.00"
                            min="1.00"
                            step="0.01"
                            max={s.price + s.penalty}
                            addon="$"
                            onChange={(e) =>
                              updateServicePaymentAmount(e, s.type)
                            }
                          />
                        </TableCell>
                      </TableRow>
                      {s.penalty > 0 ? (
                        <tr
                          key={`${s.type}-penalty`}
                          className="bg-error dark:border-gray-700  text-white h-6"
                        >
                          <td className="whitespace-nowrap font-medium text-right">
                            Penalty
                          </td>
                          <td className="text-center">
                            ${s.penalty.toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })}

                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold text-xl">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Total Due:
                  </TableCell>
                  <TableCell className="text-primary dark:text-error">
                    ${totalDue}
                  </TableCell>
                  <TableCell className="text-accent">
                    ${calcTotalPayment()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <PaymentButton
              isProcessing={processing}
              runMockFunction={runMockFunc}
              totalPayment={calcTotalPayment()}
              location={accountData.locations[whichLocation]}
              servicePaymentAmounts={servicePaymentAmounts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
