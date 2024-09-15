import React from "react";

type Props = {
  children: React.ReactNode;
};

export const SecondayHeader = ({ children }: Props) => {
  return (
    <h1 className=" sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
      {children}
    </h1>
  );
};
