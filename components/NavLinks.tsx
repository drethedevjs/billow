"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export const NavLink = ({
  href,
  children,
  disable = false
}: {
  href: string;
  children: ReactNode;
  disable?: boolean;
}) => {
  const path: string | null = usePathname();

  return (
    <>
      {disable ? (
        <button className="text-muted cursor-not-allowed">{children}</button>
      ) : (
        <Link href={href} className={`${path === href ? "text-accent" : ""}`}>
          {children}
        </Link>
      )}

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
