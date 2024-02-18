"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

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
