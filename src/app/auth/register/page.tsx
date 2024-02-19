"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

// Definicion de los valores que se utilizaran en el formulario
type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const router = useRouter();

  // Se utiliza la funcion useForm para manejar el formulario de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // La funcion onSubmit es la encargada de manejar el registro del usuario
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Se verifica que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    // Se utiliza la funcion fetch para enviar los datos del usuario al servidor
    // Se pasa como argumento el endpoint de la API
    // Tambien se pasa un objeto con las credenciales del usuario
    // realizamos una peticion POST
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Si el usuario se registra correctamente se redirige al usuario a la pagina de login
    // Si el usuario no se registra correctamente se lanza un error
    if (res.ok) {
      router.push("/auth/login");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="p-2 rounded-md border-2 border-gray-300 text-black"
        />
        {errors.username && (
          <span className="text-red-500">This field is required</span>
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

        <input
          type="confirmPassword"
          {...register("confirmPassword", { required: true })}
          placeholder="Confirm Password"
          className="p-2 rounded-md border-2 border-gray-300 text-black"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">This field is required</span>
        )}

        <button className="w-full bg-blue-400 rounded-full font-semibold py-2 mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
