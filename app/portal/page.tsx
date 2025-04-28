"use client";

import store from "@/components/portal/inbox/store";
import portalUtils from "@/utils/portalUtils";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems
} from "flowbite-react";
import { FC, useEffect, useState } from "react";
import Dashboard from "../../components/portal/Dashboard";
import Inbox from "../../components/portal/inbox/Inbox";
import Payment from "../../components/portal/Payment";
import PaymentHistory from "../../components/portal/PaymentHistory";
import Profile from "../../components/portal/Profile";

const Portal = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [inboxCount, setInboxCount] = useState<string>(
    store
      .getState()
      .filter((msg) => !msg.read)
      .length.toString()
  );

  useEffect(() => {
    const unsubscribe = portalUtils.getInboxNewMessageCount(setInboxCount);

    return () => unsubscribe();
  }, []);

  const selectTab = (tabName: string) => {
    const activeMenuItem = document.getElementsByClassName(
      "active-sidebar-item sidebar-item"
    )[0];
    activeMenuItem.classList.remove("active-sidebar-item");

    const selectedMenuItem = document.getElementById(tabName);
    selectedMenuItem!.classList.add("active-sidebar-item");

    setActiveTab(tabName);
  };

  const renderContent = () => {
    const menuMap: Record<string, FC> = {
      dashboard: Dashboard,
      payment: Payment,
      paymentHistory: PaymentHistory,
      profile: Profile,
      inbox: Inbox
    };

    const ActiveComponent = menuMap[activeTab] ?? Dashboard;
    return <ActiveComponent />;
  };

  return (
    <div className="p-10 flex flex-row">
      <Sidebar aria-label="Default sidebar example">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              id="dashboard"
              className="active-sidebar-item sidebar-item"
              onClick={() => selectTab("dashboard")}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              id="payment"
              onClick={() => selectTab("payment")}
              label="Coming Soon"
              labelColor="dark"
              className="sidebar-item"
            >
              Pay Bill
            </SidebarItem>
            <SidebarItem
              id="inbox"
              onClick={() => selectTab("inbox")}
              label={inboxCount}
              labelColor="dark"
              className="sidebar-item"
            >
              Inbox
            </SidebarItem>
            <SidebarItem
              id="profile"
              onClick={() => selectTab("profile")}
              label="Coming Soon"
              labelColor="dark"
              className="sidebar-item"
            >
              Profile
            </SidebarItem>
            <SidebarItem
              id="paymentHistory"
              onClick={() => selectTab("paymentHistory")}
              label="Coming Soon"
              labelColor="dark"
              className="sidebar-item"
            >
              Payment History
            </SidebarItem>
            <SidebarItem className="bg-error text-white">Sign Out</SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      <div className="p-10 w-full">{renderContent()}</div>
    </div>
  );
};

export default Portal;
