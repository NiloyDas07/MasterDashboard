"use client";

import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ui/modeToggle";
import Link from "next/link";
import { navbarItems } from "../data/navBarItems";

const NavBar: React.FC = () => {
  return (
    <header className="flex items-center bg-muted h-14 px-4 gap-2">
      <nav className="flex items-center gap-4 flex-grow h-full">
        <Link
          href={"/dashboard"}
          className="mr-auto"
          aria-label="Go to weather news dashboard"
        >
          <Logo />
        </Link>

        {navbarItems.map(({ id, href, label }) => (
          <StyledLink href={href} key={id} label={label} />
        ))}
      </nav>

      <ModeToggle />
    </header>
  );
};

export interface StyledLinkProps {
  href: string;
  label: string;
}

export const StyledLink: React.FC<StyledLinkProps> = ({ href, label }) => {
  return (
    <Link href={`/dashboard/${href}`} className="text-blue-500">
      {label}
    </Link>
  );
};

export default NavBar;
