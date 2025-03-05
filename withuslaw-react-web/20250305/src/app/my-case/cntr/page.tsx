"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@icons";
import { TypographyType } from "@components/typography/Constant";
import { Typography } from "@components";

export default function RegisterInfoPage() {
  return (
    <div className="flex flex-col">
      <Link href="" className="flex justify-between pl-4 pr-8.5 py-3">
        <Typography color={"text-kos-gray-800"} type={TypographyType.H3}>
          잔금일정
        </Typography>
        <Image className="-rotate-90" src={Arrow} alt="link icon" />
      </Link>
      <Link href="" className="flex justify-between pl-4 pr-8.5 py-3">
        <Typography color={"text-kos-gray-800"} type={TypographyType.H3}>
          전자신청정보
        </Typography>
        <Image className="-rotate-90" src={Arrow} alt="link icon" />
      </Link>
      <Link
        href="/my-case/pay-info"
        className="flex justify-between pl-4 pr-8.5 py-3"
      >
        <Typography color={"text-kos-gray-800"} type={TypographyType.H3}>
          지급정보
        </Typography>
        <Image className="-rotate-90" src={Arrow} alt="link icon" />
      </Link>
    </div>
  );
}
