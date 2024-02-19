// Codigo best practice para instanciar prisma en un solo lugar y reutilizar la misma instancia en toda la aplicacion
// Esto es para evitar que se cree una nueva instancia de prisma cada vez que se importe en un archivo diferente
// Esto puede causar problemas de memoria y rendimiento

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
