"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavLink } from "./NavLinks";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState<Boolean>();
  const [toggleButton, setToggleButton] = useState<HTMLButtonElement | null>();

  useEffect(() => {
    const themeMode = window.matchMedia("(prefers-color-scheme: dark)");
    themeMode.addEventListener("change", e => {
      console.log("Is it dark mode?", e.matches);
      setIsDarkMode(e.matches);
    });

    setIsDarkMode(themeMode.matches);

    const navLinks = document.getElementsByTagName("li");
    for (let link of navLinks)
      link.addEventListener("click", e => {
        console.log("Event listened to,: ", e);
      });

    setToggleButton(
      document.querySelector<HTMLButtonElement>(
        '[data-testid="flowbite-navbar-toggle"]'
      )
    );
  }, []);

  return (
    <Navbar fluid>
      <NavbarBrand as={Link} href="/">
        {isDarkMode ? (
          <img
            src="/billow-logo-cream-no-bckgrnd.png"
            className="h-6 sm:h-9 mx-3 my-3"
            alt="Billow Logo"
          />
        ) : (
          <img
            src="/billow-logo-blue-no-bckgrnd.png"
            className="h-6 sm:h-9 mx-3 my-3"
            alt="Billow Logo"
          />
        )}
      </NavbarBrand>
      <div className="flex md:order-2">
        <a
          href="#"
          className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Login
        </a>
        <Button className="bg-accent dark:bg-accent transition-colors dark:hover:bg-white dark:hover:text-accent hover:bg-white border border-accent focus:!ring-0 hover:text-accent">
          Sign Up
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse
        className={`absolute lg:static lg:drop-shadow-none lg:bg-transparent top-16 left-0 z-10 w-full drop-shadow-2xl rounded-b-lg ${
          isDarkMode ? "bg-primary" : "bg-cream"
        }`}
      >
        <NavLink href="/" toggleButton={toggleButton}>
          Home
        </NavLink>
        <NavLink href="/about" toggleButton={toggleButton}>
          About
        </NavLink>
        <NavLink href="/faq" toggleButton={toggleButton}>
          FAQ
        </NavLink>
        <NavLink href="/portal" toggleButton={toggleButton}>
          Dashboard
        </NavLink>
        {/* <NavLink href="/contact" disable={true}>
          Contact
        </NavLink> */}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
