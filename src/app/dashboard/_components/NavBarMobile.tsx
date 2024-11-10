"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ModeToggle } from "@/components/ui/modeToggle";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

import { navbarItems } from "../data/navBarItems";

const NavBarMobile: React.FC = () => {
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

        <Drawer>
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent className="h-[90svh]">
            <div className="flex items-center justify-between px-4 mb-6 my-2">
              <DrawerHeader className="p-0 m-0">
                <DrawerTitle>
                  <DrawerClose asChild>
                    <Link href={"/dashboard/weather-news"}>
                      <Logo />
                    </Link>
                  </DrawerClose>
                </DrawerTitle>

                <DrawerDescription className="sr-only">
                  Navigation Menu
                </DrawerDescription>
              </DrawerHeader>

              <DrawerClose asChild className="">
                <button className="">
                  <X />
                </button>
              </DrawerClose>
            </div>

            <div className="flex flex-col gap-2 px-4 pb-4">
              {navbarItems.map(({ id, href, label }) => (
                <DrawerClose asChild key={id}>
                  <Link href={`/dashboard/${href}`} className="text-blue-500">
                    {label}
                  </Link>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </nav>

      <ModeToggle />
    </header>
  );
};

export default NavBarMobile;
