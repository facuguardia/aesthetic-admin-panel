"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

// Definicion de los valores que se utilizaran en el formulario
type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const [error, setError] = useState<any>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Se utiliza la funcion signIn para autenticar al usuario
    // Se pasa como argumento "credentials" que es el nombre del proveedor de autenticacion
    // Tambien se pasa un objeto con las credenciales del usuario
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Si el usuario no se encuentra en la base de datos se lanza un error
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Manejo de errores */}
        {error && (
          <div className="bg-red-200 p-2 rounded-md text-red-500">{error}</div>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="p-2 rounded-md border-2 border-gray-300 text-black"
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="p-2 rounded-md border-2 border-gray-300 text-black"
        />
        {errors.password && (
          <span className="text-red-500">This field is required</span>
        )}

        <button className="w-full bg-blue-400 rounded-full font-semibold py-2 mt-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
