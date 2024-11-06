"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type props = {
  userImage: string | null;
};

function ProfilePicture({ userImage }: props) {
  const router = useRouter();

  return (
    <div className=" flex">
      <div className=" flex">
        {userImage ? (
          <Image src={userImage} alt="user-img" width={100} height={100} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
