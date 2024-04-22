"use client";

import React, { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Navlinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const pathName = usePathname();
  const [dropDownMenu, setDropDownMenu] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full flex flex-row justify-between items-center px-8 py-4 bg-blue-2 bg-white bg-opacity-95 shadow-md lg:hidden">
      <Image src="/assets/images/logo.png" alt="logo" width={150} height={70} />

      <div className="flex items-center gap-4">
        <div className="flex flex-row gap-4 max-md:hidden">
          {Navlinks.map((link) => (
            <Link
              href={link.url}
              key={link.label}
              className={`flex flex-row items-center gap-4 text-xl ${
                pathName === link.url ? "text-blue-400" : "text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="relative flex gap-4 items-center">
          <MenuIcon
            className="cursor-pointer md:hidden"
            onClick={() => setDropDownMenu(!dropDownMenu)}
          />

          {dropDownMenu && (
            <div className="absolute top-10 right-0 flex flex-col gap-8 p-5 bg-white opacity-95 shadow-md rounded">
              {Navlinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.label}
                  className={`flex items-center gap-8 text-xl ${
                    pathName === link.url ? "text-blue-400" : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <SignedOut>
            <SignInButton>
              <button className="bg-gray-400 hover:bg-black rounded-xl p-1 px-2 text-white">
                SignIn
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
