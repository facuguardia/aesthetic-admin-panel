import React from "react";
import Link from "next/link";
// En este componente se importa la función getServerSession de next-auth/next
// para obtener la sesión del usuario en el servidor.
// También se importa el objeto authOptions que contiene las opciones de autenticación.
// Este objeto se pasa como argumento a la función getServerSession.
// authOptions contiene las opciones de autenticación que se definen en el archivo [...nextauth]/route.ts.


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
