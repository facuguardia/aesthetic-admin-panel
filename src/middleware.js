// Next auth middleware permite proteger rutas de la aplicación
// Se debe exportar el middleware por defecto
// La configuración del middleware debe tener un objeto matcher con un array de rutas a proteger

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*"] };
