import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prisma";

type Request = {
  json: () => Promise<any>;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Vaslidar que el usuario no exista
    const userFound = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (userFound) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Validar que el email no exista
    const userEmailFound = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userEmailFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Encryptar la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Retornar el usuario creado sin la contraseña
    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
