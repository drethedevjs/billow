"use client";
import useUser from "@/hooks/useUser";
import Service from "@/interfaces/account/Service";
import VerifyAccessTokenAndAccountInformation from "@/interfaces/account/VerifyAccessTokenAndAccountInformation";
import { verifyAccessTokenAndGetAccountInformation } from "@/services/userService";
import {
  calcPenaltyAndAmount,
  calcTotalPayment,
  changeBackgroundToActiveAccount,
  highlightFirstAccount
} from "@/utils/dashboardHelper";
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
import ConnectToPlaidButton from "./ConnectToPlaidButton";
import LocationSelector from "./LocationSelector";
import PaymentButton from "./PaymentButton";

const Dashboard = () => {
  const user = useUser();
  const [locationIdx, setLocationIdx] = useState<number>(0);
  const services: Service[] = useMemo(
    () => user.accountData.locations[locationIdx].services,
    [user.accountData.locations, locationIdx]
  );

  const [servicePaymentAmounts, setServicePaymentAmounts] = useState<
    Record<string, number>
  >({});

  const [penaltyPayments, setPenaltyPayments] = useState<
    Record<string, number>
  >({});

  const [plaidConnectivityVerification, setPlaidConnectivityVerification] =
    useState<VerifyAccessTokenAndAccountInformation | null>(null);

  useEffect(() => {
    highlightFirstAccount();

    const runFunction = async () => {
      const response = await verifyAccessTokenAndGetAccountInformation(
        user!.id
      );

      if (response.isSuccess && response.data)
        setPlaidConnectivityVerification(response.data);
    };

    runFunction();
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectLocation = (e: any, locationIdx: number) => {
    setServicePaymentAmounts({});
    setPenaltyPayments({});
    changeBackgroundToActiveAccount(e);
    setLocationIdx(locationIdx);
  };

  const updateServicePaymentAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    serviceType: string
  ): void => {
    const { amount, penaltyAmt } = calcPenaltyAndAmount(
      Number(e.target.value),
      serviceType,
      services
    );

    setPenaltyPayments((prev) => {
      return {
        ...prev,
        [serviceType]: penaltyAmt
      };
    });

    setServicePaymentAmounts((prev) => ({ ...prev, [serviceType]: amount }));
  };

  const totalDue = useMemo(() => {
    return services
      .reduce(
        (acc, currentValue) => acc + currentValue.price + currentValue.penalty,
        0
      )
      .toFixed(2);
  }, [services]);

  return (
    <>
      <h1>Dashboard</h1>

      <h2 className="mt-8 p-3 bg-accent text-white font-semibold rounded-sm">
        {user.accountData.utilityCompanyName}
      </h2>

      <p className="my-4">
        <span className="font-semibold">Customer Name: </span>
        {user.accountData.accountHolderFirstName}{" "}
        {user.accountData.accountHolderLastName}
      </p>
      <hr></hr>
      <div className="flex xl:flex-row flex-col mt-5">
        <div className="w-full xl:w-1/2">
          <LocationSelector
            accountData={user.accountData}
            selectLocation={selectLocation}
          />
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
                        <TableCell>${Number(s.price).toFixed(2)}</TableCell>
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
                            disabled={s.price === 0}
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
                    ${calcTotalPayment(servicePaymentAmounts, penaltyPayments)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {plaidConnectivityVerification?.hasAccessToken ? (
              <PaymentButton
                setServicePaymentAmounts={setServicePaymentAmounts}
                setPenaltyPayments={setPenaltyPayments}
                totalPayment={calcTotalPayment(
                  servicePaymentAmounts,
                  penaltyPayments
                )}
                location={user.accountData.locations[locationIdx]}
                servicePaymentAmounts={servicePaymentAmounts}
                accountMask={
                  plaidConnectivityVerification?.accountInformation?.accountMask
                }
                penaltyPayments={penaltyPayments}
              />
            ) : (
              <ConnectToPlaidButton />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
