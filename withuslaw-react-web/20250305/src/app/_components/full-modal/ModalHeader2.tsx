"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DeleteIcon, HeaderBack } from "@icons";

type ModalHeaderType = {
  title: string;
  onClick?: () => void;
  showCloseBtn?: boolean;
};

export default function ModalHeader({
  title,
  onClick,
  showCloseBtn,
}: ModalHeaderType) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "GO_HOME",
      data: {
        type: "0",
        url: "",
      },
    });
  };

  return (
    <div className="relative flex justify-between h-[60px] flex w-full items-center px-[16px] py-[17px]">
      <h1 className="absolute left-1/2 transform -translate-x-1/2 flex text-[#2E2E2E] text-lg font-semibold">
        {title}
      </h1>
      {showCloseBtn ? (
        <button
          type="button"
          onClick={onClick}
          className="absolute right-0 transform -translate-x-1/2"
        >
          <Image src={DeleteIcon} width={36} alt="back icon" />
        </button>
      ) : (
        <button type="button" onClick={handleClick}>
          <Image src={HeaderBack} width={10} alt="back icon" />
        </button>
      )}
    </div>
  );
}
