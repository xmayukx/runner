import React from "react";
import Sidebar from "@/components/sidebar";
import InfoBar from "@/components/infobar";
import ModalProvider from "@/providers/modal-provider";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <ModalProvider>
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className=" w-full">
          <InfoBar />
          {children}
        </div>
      </div>
    </ModalProvider>
  );
};

export default Layout;
