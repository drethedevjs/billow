import { AccountData } from "@/interfaces/AccountData";

export const accountData: AccountData[] = [
  {
    utilityCompanyName: "City Waterworks",
    accountHolderFirstName: "Jane",
    accountHolderLastName: "Doe",
    locations: [
      {
        accountNumber: 100001001,
        address: {
          address1: "123 Palmetto St",
          address2: "Apt 3B",
          city: "Columbia",
          state: "SC",
          postal: "29201"
        },
        services: [
          { name: "Water", price: 45.6, penalty: 0 },
          { name: "Sewage", price: 23.1, penalty: 5.0 }
        ]
      },
      {
        accountNumber: 100001002,
        address: {
          address1: "456 Wren Dr",
          address2: "",
          city: "Greenville",
          state: "SC",
          postal: "29607"
        },
        services: [{ name: "Recycling", price: 5.0, penalty: 0 }]
      }
    ]
  },
  {
    utilityCompanyName: "Metro Utilities",
    accountHolderFirstName: "Carlos",
    accountHolderLastName: "Ramirez",
    locations: [
      {
        accountNumber: 100002001,
        address: {
          address1: "789 Magnolia Blvd",
          address2: "Unit 12",
          city: "Savannah",
          state: "GA",
          postal: "31401"
        },
        services: [
          { name: "Water", price: 32.5, penalty: 10.0 },
          { name: "Gas", price: 29.99, penalty: 2.5 }
        ]
      },
      {
        accountNumber: 100002002,
        address: {
          address1: "102 Peachtree Pkwy",
          address2: "",
          city: "Atlanta",
          state: "GA",
          postal: "30305"
        },
        services: [{ name: "Recycling", price: 4.25, penalty: 0 }]
      }
    ]
  },
  {
    utilityCompanyName: "Sunstate Utility Services",
    accountHolderFirstName: "Aisha",
    accountHolderLastName: "Nguyen",
    locations: [
      {
        accountNumber: 100003001,
        address: {
          address1: "321 Peach Tree Ln",
          address2: "",
          city: "Atlanta",
          state: "GA",
          postal: "30303"
        },
        services: [
          { name: "Gas", price: 36.45, penalty: 3.25 },
          { name: "Miscellaneous", price: 3.1, penalty: 0 }
        ]
      },
      {
        accountNumber: 100003002,
        address: {
          address1: "100 Coastal Hwy",
          address2: "Suite 400",
          city: "Brunswick",
          state: "GA",
          postal: "31520"
        },
        services: [{ name: "Sewage", price: 19.8, penalty: 1.75 }]
      }
    ]
  },
  {
    utilityCompanyName: "Evergreen Municipal Services",
    accountHolderFirstName: "Liam",
    accountHolderLastName: "Chen",
    locations: [
      {
        accountNumber: 100004001,
        address: {
          address1: "908 Forest Dr",
          address2: "",
          city: "Charleston",
          state: "SC",
          postal: "29403"
        },
        services: [
          { name: "Water", price: 41.25, penalty: 0 },
          { name: "Recycling", price: 6.0, penalty: 0 },
          { name: "Sewage", price: 18.5, penalty: 2.0 }
        ]
      }
    ]
  },
  {
    utilityCompanyName: "Northern Utility Co.",
    accountHolderFirstName: "Emma",
    accountHolderLastName: "Khan",
    locations: [
      {
        accountNumber: 100005001,
        address: {
          address1: "222 Riverfront Ave",
          address2: "",
          city: "Augusta",
          state: "GA",
          postal: "30901"
        },
        services: [
          { name: "Gas", price: 40.3, penalty: 4.0 },
          { name: "Water", price: 28.75, penalty: 0 }
        ]
      },
      {
        accountNumber: 100005002,
        address: {
          address1: "600 Lakeview Rd",
          address2: "Bldg 2",
          city: "Macon",
          state: "GA",
          postal: "31210"
        },
        services: [{ name: "Miscellaneous", price: 8.2, penalty: 0 }]
      }
    ]
  }
];
