import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@components";

type TProps = {
  containerClassName?: string;
  href?: string;
  bodyTextColor?:
    | "text-kos-brown-50"
    | "text-kos-red-500"
    | "text-kos-gray-700"
    | "text-kos-brown-100";
  title: string;
  body?: string;
  onClick?: () => void;
};

export default function RegisterInfoStepItem({
  containerClassName,
  href,
  bodyTextColor,
  title,
  body,
  onClick,
}: TProps) {
  const router = useRouter();
  const moveToRouter = () => {
    router.push(href!);
  };

  return (
    <button
      type="button"
      className={`flex flex-col items-center w-full  gap-y-2 ${
        containerClassName ?? ""
      }`}
      onClick={!!href ? moveToRouter : onClick}
    >
      <Typography
        type={Typography.TypographyType.H6}
        color="text-kos-gray-800"
        className={body ? "" : "py-3"}
      >
        {title}
      </Typography>
      {body && (
        <Typography
          type={Typography.TypographyType.B5}
          color={bodyTextColor ?? ""}
        >
          {body}
        </Typography>
      )}
    </button>
  );
}
