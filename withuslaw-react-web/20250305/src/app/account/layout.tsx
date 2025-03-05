"use client";

import React from "react";
import { Header } from "@components";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="계정 삭제" />
      <main className="flex justify-center items-center w-full py-16">
        {children}
      </main>
    </>
  );
}
