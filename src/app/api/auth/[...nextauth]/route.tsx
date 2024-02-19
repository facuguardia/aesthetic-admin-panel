// Next auth tiene un registro de acrhivo de configuracion para la autenticacion (folder [...nextauth]) que se encuentra en la carpeta api/auth
// Este archivo es el encargado de manejar la autenticacion de la aplicacion
// En este archivo se definen las opciones de autenticacion que se utilizaran en la aplicacion

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

// AuthOptions es un objeto que contiene las opciones de autenticacion
export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // Si el usuario no se encuentra en la base de datos se lanza un error
        if (!userFound) throw new Error("User not found");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        // Si la contraseña no coincide con la contraseña del usuario se lanza un error
        if (!matchPassword) throw new Error("User not found");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

// La funcion handler es la encargada de manejar la autenticacion
const handler = NextAuth(authOptions);

// Se exporta la funcion handler para que pueda ser utilizada en otros archivos
// Se exporta dos veces para que pueda ser utilizada en los metodos GET y POST
export { handler as GET, handler as POST };
