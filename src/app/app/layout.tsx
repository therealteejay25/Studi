import React from "react";
import Sidebar from "../components/ui/shared/Sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex flex-row bg-gradient-to-b from-bgtop via-bglight to-bgbottom">
      <Sidebar />
      <div className="ml-18 w-full p-6">
        {children}
      </div>
    </div>
  );
};

export default layout;
