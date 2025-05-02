"use client";
import { accountData as data } from "@/data/accountData";
import { AccountData } from "@/interfaces/account/AccountData";
import Location from "@/interfaces/account/Location";
import type { RootState } from "@/store/configureStore";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const whichAccount: number = 4;
  const accountData: AccountData = useSelector<RootState, AccountData>(
    (s) => s.account[whichAccount]
  );

  const [location, setLocation] = useState<Location>(
    data[whichAccount].locations[0]
  );

  useEffect(() => {
    const firstAccount = document.getElementsByClassName("account-number")[0];
    firstAccount.classList.add("bg-accent");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectLocation = (e: any, accountNumber: number) => {
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

  const getTotal = () => {
    return location.services
      .reduce(
        (acc, currentValue) => acc + currentValue.price + currentValue.penalty,
        0
      )
      .toFixed(2);
  };
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
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })}

                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold text-xl">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Total Due:
                  </TableCell>
                  <TableCell className="">${getTotal()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              href="/pay"
              className="mt-3 w-full bg-primary hover:bg-accent transition-colors dark:bg-accent dark:hover:bg-slate dark:hover:text-accent"
            >
              <BiDollarCircle className="mr-2 h-5 w-5" />
              Make Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
