import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
}

export default layout;
