import PlaidProvider from "@/context/PlaidContext";
import Providers from "@/store/Providers";
import type { Metadata } from "next";
import Header from "../components/Header";
import TheFooter from "../components/TheFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Billow",
  description: "A fresh way to pay for your utilities."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="container mx-auto min-h-screen flex flex-col">
          <Providers>
            <PlaidProvider>{children}</PlaidProvider>
          </Providers>
        </main>
        <TheFooter />
      </body>
    </html>
  );
}
