"use client";

import Logo from '@/app/components/ui/Logo';
import { useSearchParams } from 'next/navigation';

export default function MessagePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const message = email
    ? `✨ A magic login link has been sent to ${email}. Check your inbox (and spam folder, just in case) to continue.`
    : "No email provided.";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bgtop via-bglight to-bgbottom">
      <div className="flex flex-col justify-center items-center text-center">
        <Logo size={64} />
        <h1 className="bg-gradient-to-r text-3xl font-black from-accent to-gradientaccent bg-clip-text text-transparent">
          Studi
        </h1>
      </div>
      <div className="mt-6 max-w-lg text-center text-lg font-medium text-dark">
        {message}
      </div>
    </div>
  );
}
