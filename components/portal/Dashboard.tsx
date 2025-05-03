"use client";
import { accountData as data } from "@/data/accountData";
import { AccountData } from "@/interfaces/account/AccountData";
import Location from "@/interfaces/account/Location";
import Service from "@/interfaces/account/Service";
import type { RootState } from "@/store/configureStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PaymentButton from "./PaymentButton";

const Dashboard = () => {
  const whichAccount: number = 4;
  const accountData: AccountData = useSelector<RootState, AccountData>(
    (s) => s.account[whichAccount]
  );

  const [location, setLocation] = useState<Location>(
    data[whichAccount].locations[0]
  );

  const [processing, setProcessing] = useState<boolean>(false);

  const [servicePaymentAmounts, setServicePaymentAmounts] = useState<
    Record<string, number>
  >({});

  const changeToMostPrice = (type: string, service: Service) => {
    const element = document.getElementById(
      type.toLowerCase()
    ) as HTMLInputElement;

    const mostCustomerCanPay = service.penalty + service.price;

    if (element) {
      element.value = mostCustomerCanPay.toString();
    } else throw new Error(`Cannot find the id for the ${type} utility.`);

    return mostCustomerCanPay;
  };

  const updateServicePaymentAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void => {
    const amount = Number(e.target.value);

    const service = location.services.find((s) => s.type === type);
    if (!service) return;

    if (service.price < amount) {
      const mostCustomerCanPay = changeToMostPrice(type, service);
      setServicePaymentAmounts((prev) => ({
        ...prev,
        [type]: mostCustomerCanPay
      }));
      return;
    }

    setServicePaymentAmounts((prev) => ({ ...prev, [type]: amount }));
  };

  useEffect(() => {
    const firstAccount = document.getElementsByClassName("account-number")[0];
    firstAccount.classList.add("bg-accent");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectLocation = (e: any, accountNumber: number) => {
    setServicePaymentAmounts({ "": 0 });
    const activeAccountEl = document.getElementsByClassName(
      "bg-accent account-number"
    );
    activeAccountEl[0]?.classList.remove("bg-accent");
    e.target?.classList.add("bg-accent");

    const loc = accountData.locations.find(
      (l) => l.accountNumber === accountNumber
    );
    setLocation(loc!);
  };

  const processPayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
    }, 3000);
  };

  const totalDue = useMemo(() => {
    return location.services
      .reduce(
        (acc, currentValue) => acc + currentValue.price + currentValue.penalty,
        0
      )
      .toFixed(2);
  }, [location.services]);

  const calcTotalPayment = useMemo(() => {
    const paymentAmounts = Object.values(servicePaymentAmounts);

    const total = paymentAmounts
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2);

    return total;
  }, [servicePaymentAmounts]);

  return (
    <>
      <h1>Dashboard</h1>

      <h2 className="mt-8 p-3 bg-accent text-white font-semibold rounded-sm">
        {accountData.utilityCompanyName}
      </h2>

      <p className="my-4">
        <span className="font-semibold">Customer Name: </span>
        {accountData.accountHolderFirstName} {accountData.accountHolderLastName}
      </p>
      <hr></hr>
      <div className="flex xl:flex-row flex-col mt-5">
        <div className="w-full xl:w-1/2">
          <h3 className="text-center mb-4">Account Number</h3>
          <ul className="bg-primary">
            {accountData.locations.map((l) => {
              return (
                <li
                  key={l.accountNumber}
                  id={l.accountNumber.toString()}
                  onClick={(e) => selectLocation(e, l.accountNumber)}
                  className="border-b-2 text-center p-3 text-white account-number"
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
              <TableHead>
                <TableRow>
                  <TableHeadCell>Utility</TableHeadCell>
                  <TableHeadCell>Cost</TableHeadCell>
                  <TableHeadCell>Payment</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {location.services.map((s, idx) => {
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
                    ${calcTotalPayment}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <PaymentButton
              processing={processing}
              processPayment={processPayment}
              calcTotalPayment={calcTotalPayment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
