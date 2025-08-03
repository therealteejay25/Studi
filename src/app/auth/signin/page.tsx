"use client"
import AccountButton from "@/app/components/auth/AccountButton";
import Plus from "@/app/components/ui/icons/Plus";
import Logo from "@/app/components/ui/Logo";
// import { useState } from "react";
// import UserImage from ''
// import React from 'react'

const SignInpage = () => {

  // const [showModal, setShowModal] = useState(false)

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bgtop via-bglight to-bgbottom">
      <div className="flex flex-col justify-center items-center text-center">
        <Logo size={64} />
        <h1 className="bg-gradient-to-r text-3xl font-black from-accent to-gradientaccent bg-clip-text text-transparent">
          Studi
        </h1>
      </div>
      <div className="bg-white/35 my-8 rounded-2xl w-[40rem] p-12">
        <h3 className="text-dark font-bold text-3xl mb-8">
          Choose an account to continue.
        </h3>
        <div className="">
          <AccountButton
            src="/assets/userImg.jpg"
            alt="User Image"
            userName="Tee Jay"
            userEmail="therealteejay25@gmail.com"
          />
          <AccountButton
            src="/assets/userImg.jpg"
            alt="User Image"
            userName="Tee Jay"
            userEmail="therealteejay25@gmail.com"
          />
          <AccountButton
            src="/assets/userImg.jpg"
            alt="User Image"
            userName="Tee Jay"
            userEmail="therealteejay25@gmail.com"
          />
        </div>
        <button className="p-3 w-full flex gap-2 items-center justify-center text-xl font-semibold text-light mt-8 rounded-full cursor-pointer hover:opacity-90 bg-gradient-to-r from-accent to-gradientaccent">
          <Plus size={32} color="#EBF0FF" />
          Add Account
        </button>
        <button className="p-3 w-full flex gap-2 items-center justify-center text-xl font-semibold text-transparent rounded-full cursor-pointer hover:opacity-90 bg-clip-text mt-4 bg-gradient-to-r from-accent to-gradientaccent">
          Delete All Accounts
        </button>
      </div>
    </div>
  );
};

export default SignInpage;
