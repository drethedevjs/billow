import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import { NavLink } from "./NavLinks";

const Header = () => {
  return (
    <Navbar fluid rounded className="">
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Billow
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <a
          href="#"
          className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Login
        </a>
        <Button className="bg-accent dark:bg-accent transition-colors dark:hover:bg-white dark:hover:text-accent">
          Sign Up
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
        <NavLink href="/portal">Dashboard</NavLink>
        <NavLink href="/contact" disable={true}>
          Contact
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
