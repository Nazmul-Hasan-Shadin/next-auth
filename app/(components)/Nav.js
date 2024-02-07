import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div>
      <header className="bg-gray-600 text-gray-100">
        <nav className="flex justify-between items-centr w-full px-10 py-4 ">
          <div>MY site</div>
          <div className="flex gap-10">
            <Link href={"/"}>Home</Link>
            <Link href={"/createUser"}>create user</Link>
            <Link href={"/Member"}>Member</Link>
            <Link href={"/ClientMember"}>client mentver</Link>
            <Link href={"/Public"}>Public</Link>
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/">Log out</Link>
            ) : (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
