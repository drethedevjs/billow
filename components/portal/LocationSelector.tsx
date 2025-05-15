import { AccountData } from "@/interfaces/account/AccountData";

const LocationSelector = ({
  accountData,
  selectLocation
}: {
  accountData: AccountData;
  selectLocation: (e: React.MouseEvent<HTMLLIElement>, idx: number) => void;
}) => {
  return (
    <>
      <h3 className="text-center mb-4">Account Number</h3>
      <ul className="bg-primary">
        {accountData.locations?.map((l, idx) => {
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
    </>
  );
};

export default LocationSelector;
