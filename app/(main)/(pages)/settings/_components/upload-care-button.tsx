"use client";
import React, { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
type props = {
  onUpload: any;
};

function UploadCareButton() {
  const [files, setFiles] = useState<any>([]);

  const handleChangeEvent = (items: any) => {
    setFiles([
      ...items.allEntries.filter((file: any) => file.status === "success"),
    ]);
  };
  return (
    <>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        pubkey="f9930a9509927fdf7130"
      />
    </>
  );
}

export default UploadCareButton;
