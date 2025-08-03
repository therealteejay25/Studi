// import Image from "next/image";

import Link from "next/link";
import ArrowRight from "./components/ui/icons/ArrowRight";

export default function Home() {
  return (
    <div className="font-satoshi bg-gradient-to-b from-bgtop via-bglight to-bgbottom flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-accent text-center text-6xl font-medium">
        This page is yet to be completed. <br />{" "}
        <span className="text-2xl text-dark">
          Please move to the auth page.
        </span>
      </h1>
      <Link href='/auth/signin' className="flex items-center justify-center gap-2 px-16 py-4 bg-gradient-to-r from-accent to-gradientaccent text-light text-xl font-semibold rounded-full">Go to Auth <ArrowRight color="#EBF0FF" size={28}/></Link>
    </div>
  );
}
