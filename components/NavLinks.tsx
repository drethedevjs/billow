"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export const NavLink = ({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) => {
  const path: string | null = usePathname();

  return (
    <>
      <Link href={href} className={path === href ? "text-accent" : ""}>
        {children}
      </Link>

      {/* <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">FAQ</NavbarLink>
        <NavbarLink href="/portal">Dashboard</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse> */}
    </>
  );
};
