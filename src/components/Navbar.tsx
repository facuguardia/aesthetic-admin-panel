import React from "react";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const sesion = await getServerSession(authOptions);

  return (
    <nav className="px-4 py-2 flex justify-between items-center">
      <div>
        <span>Logo</span>
      </div>
      <div className="flex items-center gap-4">
        {!sesion?.user ? (
          <>
            <Link href="/">Home</Link>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/signout">Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
