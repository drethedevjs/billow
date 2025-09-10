# 💧 Billow

**Billow** is a modern utility billing app where users can view, manage, and pay for their services like water, sewage, gas, and more — all from a sleek, responsive dashboard.

---

## 🛠 Tech Stack

- ⚡️ [Next.js](https://nextjs.org/) (Turbopack)
- 🔐 [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/) + [Flowbite UI](https://flowbite.com/)
- 🗄️ [Redux](https://redux.js.org/) for state management
- 💰 [Plaid](https://plaid.com/) for bank connections and ACH payments
- 🧠 Modular architecture with feature-based components

---

## 📌 Features

📊 View all active utility accounts

🧾 Detailed service breakdown (Water, Gas, Penalty, etc.)

🔒 Secure payment via Plaid (ACH or Credit Card)

🌙 Dark mode ready (via Flowbite)

⚙️ Sidebar navigation without full page reloads

## ToDo

- Find a modern way to use useContext. See toast.
- Figure out how to use axios base url.
- Remove all instances where `BillowRequest` is created and passed in and just use `billowGet` or `billowPost`. Or maybe do away with the latter and keep the former.
- Add success and fail toast that's in the payment button to a global utility.
