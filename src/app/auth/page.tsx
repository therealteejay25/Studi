"use client";
import Logo from "@/app/components/ui/Logo";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(4, "Name is too short"),
  email: yup.string().required("Email is required").email("Invalid email"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 700);
    return () => clearTimeout(timeout);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      setMessage(result.message);
      reset();
      router.push(`/auth/message?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bgtop via-bglight to-bgbottom">
      {!isMounted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={32} color="#5A4FFF" className="animate-spin" />
        </div>
      )}

      {isMounted && (
        <div>
          <div className="flex flex-col justify-center items-center text-center">
            <Logo size={64} />
            <h1 className="bg-gradient-to-r text-3xl font-black from-accent to-gradientaccent bg-clip-text text-transparent">
              Studi
            </h1>
          </div>

          <div>
            <div className="bg-white/35 my-8 rounded-2xl w-[40rem] p-12">
              <h3 className="text-dark font-bold text-3xl mb-8">
                Enter your email to continue to studi...
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <input
                  className="w-full mt-5 bg-white/75 rounded-md outline-none p-3"
                  placeholder="Enter your email..."
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <input
                  className="w-full mt-2 bg-white/75 rounded-md outline-none p-3"
                  placeholder="Enter your name..."
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <button
                  type="submit"
                  className="p-3 w-full flex gap-2 items-center justify-center text-lg text-light mt-8 rounded-full cursor-pointer hover:opacity-90 bg-gradient-to-r from-accent to-gradientaccent"
                >
                  {!isLoading && "Get magic link"}
                  {isLoading && (
                    <Loader size={32} color="#EBF0FF" className="animate-spin" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
