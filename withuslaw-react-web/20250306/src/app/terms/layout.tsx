"use client";

import { Header } from "@components";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="개인정보 처리방침" />
      <main className="w-full min-h-screen px-4 py-6">{children}</main>
    </>
  );
}
