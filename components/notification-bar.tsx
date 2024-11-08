"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function NotificationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100); // Delay for smooth transition
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 w-full bg-purple-600 text-white text-center py-0.5 px-4 transition-transform duration-500 z-[110]", // z-index set to 110
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <span className=" lg:text-sm text-xs">
        This application is currently in beta. Your feedback is welcome!
      </span>
    </div>
  );
}
