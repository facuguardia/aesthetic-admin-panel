"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

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
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

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
        {error && (
          <div className="bg-red-200 p-2 rounded-md text-red-500">
            {error}
          </div>
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
