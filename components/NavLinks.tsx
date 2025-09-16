"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export const NavLink = ({
  href,
  children,
  disable = false,
  toggleButton
}: {
  href: string;
  children: ReactNode;
  disable?: boolean;
  toggleButton: HTMLButtonElement | null | undefined;
}) => {
  const path: string | null = usePathname();

  return (
    <>
      {disable ? (
        <button className="text-muted cursor-not-allowed">{children}</button>
      ) : (
        <Link
          onClick={e => toggleButton?.click()}
          href={href}
          className={`${
            path === href ? "text-accent" : ""
          } lg:static lg:z-0 relative z-10 w-full text-2xl p-3`}
        >
          {children}
        </Link>
      )}
    </>
  );
};
