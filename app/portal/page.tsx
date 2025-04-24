"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems
} from "flowbite-react";
import { FC, useState } from "react";
import Dashboard from "../../components/portal/Dashboard";
import Inbox from "../../components/portal/Inbox";
import Payment from "../../components/portal/Payment";
import PaymentHistory from "../../components/portal/PaymentHistory";
import Profile from "../../components/portal/Profile";

const Portal = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const renderContent = () => {
    const obj: Record<string, FC> = {
      dashboard: Dashboard,
      payment: Payment,
      paymentHistory: PaymentHistory,
      profile: Profile,
      inbox: Inbox
    };

    const ActiveComponent = obj[activeTab] ?? Dashboard;
    return <ActiveComponent />;
  };

  return (
    <div className="p-10 flex flex-row">
      <Sidebar aria-label="Default sidebar example" color="green">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem onClick={() => setActiveTab("dashboard")}>
              Dashboard
            </SidebarItem>
            <SidebarItem
              onClick={() => setActiveTab("payment")}
              label="Coming Soon"
              labelColor="dark"
            >
              Make a Payment
            </SidebarItem>
            <SidebarItem
              onClick={() => setActiveTab("inbox")}
              label="Coming Soon"
              labelColor="dark"
            >
              Inbox
            </SidebarItem>
            <SidebarItem
              onClick={() => setActiveTab("profile")}
              label="Coming Soon"
              labelColor="dark"
            >
              Profile
            </SidebarItem>
            <SidebarItem
              onClick={() => setActiveTab("paymentHistory")}
              label="Coming Soon"
              labelColor="dark"
            >
              Payment History
            </SidebarItem>
            <SidebarItem>Sign Out</SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      <div className="p-10 w-full">{renderContent()}</div>
    </div>
  );
};

export default Portal;
