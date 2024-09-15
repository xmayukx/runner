"use client";
import React from "react";
import UploadCareButton from "./upload-care-button";
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
    <div className=" flex flex-col">
      <p className=" text-lg text-white">Profile Picture</p>
      <div className=" flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className=" relative h-full w-2/12 ">
              <Image src={userImage} alt="user-img" fill />{" "}
            </div>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
