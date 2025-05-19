// import { PaymentHistory } from "@/interfaces/PaymentHistory";

// const paymentHistorySeedData = (): PaymentHistory[] => [
//   {
//     id: 1,
//     date: "2025-05-04",
//     total: 57.16,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.41,
//         penaltyAmount: 0
//       },
//       {
//         service: "Gas",
//         amount: 28.75,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 2,
//     date: "2025-04-28",
//     total: 45.51,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Gas",
//         amount: 41.51,
//         penaltyAmount: 4.0
//       }
//     ]
//   },
//   {
//     id: 3,
//     date: "2025-04-21",
//     total: 8.2,
//     accountNumber: 100005002,
//     address: {
//       address1: "600 Lakeview Rd",
//       address2: "Bldg 2",
//       city: "Macon",
//       state: "GA",
//       postal: "31210"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Miscellaneous",
//         amount: 8.2,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 4,
//     date: "2025-04-15",
//     total: 63.05,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.75,
//         penaltyAmount: 0
//       },
//       {
//         service: "Gas",
//         amount: 30.3,
//         penaltyAmount: 4.0
//       }
//     ]
//   },
//   {
//     id: 5,
//     date: "2025-04-10",
//     total: 28.75,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.75,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 6,
//     date: "2025-03-30",
//     total: 8.2,
//     accountNumber: 100005002,
//     address: {
//       address1: "600 Lakeview Rd",
//       address2: "Bldg 2",
//       city: "Macon",
//       state: "GA",
//       postal: "31210"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Miscellaneous",
//         amount: 8.2,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 7,
//     date: "2025-03-15",
//     total: 34.3,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Gas",
//         amount: 30.3,
//         penaltyAmount: 4.0
//       }
//     ]
//   },
//   {
//     id: 8,
//     date: "2025-03-02",
//     total: 57.75,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.75,
//         penaltyAmount: 0
//       },
//       {
//         service: "Gas",
//         amount: 25.0,
//         penaltyAmount: 4.0
//       }
//     ]
//   },
//   {
//     id: 9,
//     date: "2025-02-22",
//     total: 8.2,
//     accountNumber: 100005002,
//     address: {
//       address1: "600 Lakeview Rd",
//       address2: "Bldg 2",
//       city: "Macon",
//       state: "GA",
//       postal: "31210"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Miscellaneous",
//         amount: 8.2,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 10,
//     date: "2025-02-14",
//     total: 33.3,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Gas",
//         amount: 33.3,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 11,
//     date: "2025-01-31",
//     total: 56.0,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.0,
//         penaltyAmount: 0
//       },
//       {
//         service: "Gas",
//         amount: 28.0,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 12,
//     date: "2025-01-12",
//     total: 28.75,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Water",
//         amount: 28.75,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 13,
//     date: "2024-12-30",
//     total: 36.1,
//     accountNumber: 100005002,
//     address: {
//       address1: "600 Lakeview Rd",
//       address2: "Bldg 2",
//       city: "Macon",
//       state: "GA",
//       postal: "31210"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Miscellaneous",
//         amount: 36.1,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 14,
//     date: "2024-12-19",
//     total: 30.3,
//     accountNumber: 100005001,
//     address: {
//       address1: "222 Riverfront Ave",
//       address2: "",
//       city: "Augusta",
//       state: "GA",
//       postal: "30901"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Gas",
//         amount: 30.3,
//         penaltyAmount: 0
//       }
//     ]
//   },
//   {
//     id: 15,
//     date: "2024-11-22",
//     total: 8.2,
//     accountNumber: 100005002,
//     address: {
//       address1: "600 Lakeview Rd",
//       address2: "Bldg 2",
//       city: "Macon",
//       state: "GA",
//       postal: "31210"
//     },
//     servicePaymentHistory: [
//       {
//         service: "Miscellaneous",
//         amount: 8.2,
//         penaltyAmount: 0
//       }
//     ]
//   }
// ];

// export default paymentHistorySeedData;
