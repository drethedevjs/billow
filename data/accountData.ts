import { AccountData } from "@/interfaces/account/AccountData";
export const accountData: AccountData[] = [
  {
    id: 1,
    utilityCompanyName: "City Waterworks",
    accountHolderFirstName: "Jane",
    accountHolderLastName: "Doe",
    phone: "803-555-1234",
    email: "jane.doe@example.com",
    address: {
      address1: "123 Palmetto St",
      address2: "Apt 3B",
      city: "Columbia",
      state: "SC",
      postal: "29201"
    },
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
          { id: 1, type: "Water", price: 45.6, penalty: 0 },
          { id: 2, type: "Sewage", price: 23.1, penalty: 5.0 }
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
        services: [{ id: 3, type: "Recycling", price: 5.0, penalty: 0 }]
      }
    ]
  },
  {
    id: 2,
    utilityCompanyName: "Metro Utilities",
    accountHolderFirstName: "Carlos",
    accountHolderLastName: "Ramirez",
    phone: "912-555-5678",
    email: "carlos.ramirez@example.com",
    address: {
      address1: "789 Magnolia Blvd",
      address2: "Unit 12",
      city: "Savannah",
      state: "GA",
      postal: "31401"
    },
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
          { id: 4, type: "Water", price: 32.5, penalty: 10.0 },
          { id: 5, type: "Gas", price: 29.99, penalty: 2.5 }
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
        services: [{ id: 6, type: "Recycling", price: 4.25, penalty: 0 }]
      }
    ]
  },
  {
    id: 3,
    utilityCompanyName: "Sunstate Utility Services",
    accountHolderFirstName: "Aisha",
    accountHolderLastName: "Nguyen",
    phone: "404-555-7890",
    email: "aisha.nguyen@example.com",
    address: {
      address1: "321 Peach Tree Ln",
      address2: "",
      city: "Atlanta",
      state: "GA",
      postal: "30303"
    },
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
          { id: 7, type: "Gas", price: 36.45, penalty: 3.25 },
          { id: 8, type: "Miscellaneous", price: 3.1, penalty: 0 }
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
        services: [{ id: 9, type: "Sewage", price: 19.8, penalty: 1.75 }]
      }
    ]
  },
  {
    id: 4,
    utilityCompanyName: "Evergreen Municipal Services",
    accountHolderFirstName: "Liam",
    accountHolderLastName: "Chen",
    phone: "843-555-2345",
    email: "liam.chen@example.com",
    address: {
      address1: "908 Forest Dr",
      address2: "",
      city: "Charleston",
      state: "SC",
      postal: "29403"
    },
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
          { id: 10, type: "Water", price: 41.25, penalty: 0 },
          { id: 11, type: "Recycling", price: 6.0, penalty: 0 },
          { id: 12, type: "Sewage", price: 18.5, penalty: 2.0 }
        ]
      }
    ]
  },
  {
    id: 5,
    utilityCompanyName: "Northern Utility Co.",
    accountHolderFirstName: "Emma",
    accountHolderLastName: "Khan",
    phone: "706-555-3456",
    email: "emma.khan@example.com",
    address: {
      address1: "222 Riverfront Ave",
      address2: "",
      city: "Augusta",
      state: "GA",
      postal: "30901"
    },
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
          { id: 13, type: "Gas", price: 40.3, penalty: 4.0 },
          { id: 14, type: "Water", price: 28.75, penalty: 0 }
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
        services: [{ id: 15, type: "Miscellaneous", price: 8.2, penalty: 0 }]
      }
    ]
  }
];
