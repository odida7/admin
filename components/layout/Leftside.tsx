"use client";

import { Navlinks } from "@/lib/constants";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Leftside = () => {
  const pathName = usePathname();

  return (
    <div className="max-lg:hidden h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-gray-100 shadow-md">
      
      <Image src='/assets/images/logo.png' alt="logo" width={150} height={70} className="cursor-pointer"/>
      

      <div className="flex flex-col gap-12">
        {Navlinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex flex-row items-center gap-4 text-xl ${
              pathName === link.url ? "text-blue-400" : "text-gray-900"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
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
          <div className="flex items-center gap-2 text-md text-gray-900">
            <UserButton />
            <p>Profile</p>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Leftside;
