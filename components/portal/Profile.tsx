"use client";

import useUser from "@/hooks/useUser";
import { User } from "@/interfaces/User";
import { Button, Label, TextInput } from "flowbite-react";
import { ChangeEvent, useState } from "react";

const Profile = () => {
  const signedInUser = useUser();

  const [user, setUser] = useState<User>(signedInUser);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("name", e.target.name);
    console.log("value", e.target.value);
    if (e.target.name.includes("address")) {
      setUser((prev) => {
        return {
          ...prev,
          address: {
            ...prev.address,
            [e.target.name]: e.target.value
          }
        };
      });
      return;
    }

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = () => alert("form submitted!");
  const handleAddressInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return {
        ...prev,
        address: {
          ...prev.address,
          [e.target.name]: e.target.value
        }
      };
    });
  };

  return (
    <section id="profile">
      <h1>Profile</h1>

      <form className="space-y-6 max-w-xl mt-10 p-6 bg-white rounded-lg shadow-md border border-accent">
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="firstName">
              First Name
            </Label>
            <TextInput
              className="mt-2"
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleInputChange}
              value={user.firstName}
              required
            />
          </div>

          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="lastName">
              Last Name
            </Label>
            <TextInput
              className="mt-2"
              id="lastName"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <Label className="font-semibold" htmlFor="address1">
            Address Line 1
          </Label>
          <TextInput
            className="mt-2"
            id="address1"
            name="address1"
            type="text"
            required
            value={user.address.address1}
            onChange={handleAddressInputChange}
          />
        </div>

        <div>
          <Label className="font-semibold" htmlFor="address2">
            Address Line 2
          </Label>
          <TextInput
            className="mt-2"
            id="address2"
            name="address2"
            type="text"
            value={user.address.address2}
            onChange={handleAddressInputChange}
          />
        </div>

        <div>
          <Label className="font-semibold" htmlFor="city">
            City
          </Label>
          <TextInput
            className="mt-2"
            id="city"
            name="city"
            type="text"
            value={user.address.city}
            onChange={handleAddressInputChange}
            required
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="state">
              State
            </Label>
            <TextInput
              className="mt-2"
              id="state"
              name="state"
              type="text"
              value={user.address.state}
              onChange={handleAddressInputChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="postal">
              Postal Code
            </Label>
            <TextInput
              className="mt-2"
              id="postal"
              name="postal"
              type="text"
              inputMode="numeric"
              max={99999}
              value={user.address.postal}
              onChange={handleAddressInputChange}
              required
            />
          </div>
        </div>

        <div>
          <Label className="font-semibold" htmlFor="email">
            Email Address
          </Label>
          <TextInput
            className="mt-2"
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label className="font-semibold" htmlFor="confirmEmail">
            Re-enter Email Address
          </Label>
          <TextInput
            className="mt-2"
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            required
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="phone">
              Phone Number
            </Label>
            <TextInput
              className="mt-2"
              id="phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label className="font-semibold" htmlFor="altPhone">
              Alternate Phone Number
            </Label>
            <TextInput
              className="mt-2"
              id="altPhone"
              name="altPhone"
              type="tel"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-white border border-accent hover:text-accent transition-color"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
