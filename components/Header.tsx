import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from "flowbite-react";
import Link from "next/link";

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
        <Button className="bg-accent">Sign Up</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">FAQ</NavbarLink>
        <NavbarLink href="/portal">Dashboard</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
