"use client";

import { RootState } from "@/store/configureStore";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems
} from "flowbite-react";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/portal/Dashboard";
import Inbox from "../../components/portal/inbox/Inbox";
import PaymentHistory from "../../components/portal/PaymentHistory";
import Profile from "../../components/portal/Profile";

const Portal = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const unreadMessageCount = useSelector((state: RootState) =>
    state.inbox.filter(msg => !msg.read).length.toString()
  );

  const highlightSidebarItem = (tabName: string) => {
    const activeMenuItem = document.getElementsByClassName(
      "active-sidebar-item sidebar-item"
    )[0];
    activeMenuItem.classList.remove("active-sidebar-item");

    const selectedMenuItem = document.getElementById(tabName);
    selectedMenuItem!.classList.add("active-sidebar-item");
  };

  const selectTab = (tabName: string) => {
    highlightSidebarItem(tabName);

    const selectedMenuItem = document.getElementById(tabName);
    selectedMenuItem!.classList.add("active-sidebar-item");

    setActiveTab(tabName);
  };

  const renderContent = () => {
    const menuMap: Record<string, FC> = {
      dashboard: Dashboard,
      paymentHistory: PaymentHistory,
      profile: Profile,
      inbox: Inbox
    };

    const ActiveComponent = menuMap[activeTab] ?? Dashboard;

    return <ActiveComponent />;
  };

  return (
    <div className="py-10 flex md:flex-row flex-col">
      <Sidebar
        aria-label="Default sidebar example"
        className="w-full md:w-3/12 xl:w-auto"
      >
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
              id="inbox"
              onClick={() => selectTab("inbox")}
              label={unreadMessageCount}
              labelColor="dark"
              className="sidebar-item"
            >
              Inbox
            </SidebarItem>
            <SidebarItem
              id="profile"
              onClick={() => selectTab("profile")}
              className="sidebar-item"
            >
              Profile
            </SidebarItem>
            <SidebarItem
              id="paymentHistory"
              onClick={() => selectTab("paymentHistory")}
              className="sidebar-item"
            >
              Payment History
            </SidebarItem>
            <SidebarItem className="border border-error text-error hover:bg-error hover:text-white transition-colors">
              Sign Out
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      <div className="lg:p-10 w-full md:w-9/12">{renderContent()}</div>
    </div>
  );
};

export default Portal;
