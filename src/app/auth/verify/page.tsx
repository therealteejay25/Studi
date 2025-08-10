"use client";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const [redirecting, setRedirecting] = useState('Redirecting...')
  const name = searchParams.get("name");

  let displayMessage = "Waiting for verification...";

  if (status === "success") {
    displayMessage = `Welcome${name ? ` ${name}` : ""}! Your account is verified.
    ${redirecting}`;
    router.push('/app')
  } else if (status === "error") {
    displayMessage = message || "Verification failed. Please try again.";
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bgtop via-bglight to-bgbottom px-6">
      <div className="text-dark justify-center items-center flex flex-col gap-5 rounded-2xl p-10 w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">{displayMessage}</h2>
        <Loader size={32} color="#5A4FFF" className="animate-spin" />
      </div>
    </div>
  );
}
