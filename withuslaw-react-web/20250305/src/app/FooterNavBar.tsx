"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TProps = {
  children: React.ReactNode;
  bgColor: string;
  href: string;
};

const FooterNavBarItem = (props: TProps) => {
  return (
    <Link
      href={props.href}
      className={`basis-1/4 text-xs flex flex-col items-center justify-center`}
    >
      {props.children}
    </Link>
  );
};

const FooterNavBarTemplate = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isShow =
    pathname === "/my-case" ||
    pathname === "/" ||
    pathname === "/acceptance/match/case-accept" ||
    pathname === "/my-info";

  return (
    isShow && (
      <footer
        className="fixed bottom-0 z-20 rounded-t-2xl overflow-hidden flex h-20 w-full bg-pink-50"
        style={{
          backgroundColor: "#FFF",
          boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
        }}
      >
        {children}
      </footer>
    )
  );
};

export default function FooterNavBar() {
  return (
    <FooterNavBarTemplate>
      <FooterNavBarItem href={"/"} bgColor="bg-red-500">
        <span className="text-lg">🏠</span>
        <span>홈</span>
      </FooterNavBarItem>
      <FooterNavBarItem href={"/my-case"} bgColor="bg-green-500">
        <span className="text-lg">📑</span>
        <span>내 사건</span>
      </FooterNavBarItem>
      <FooterNavBarItem
        href={"/acceptance/match/case-accept"}
        bgColor="bg-blue-500"
      >
        <span className="text-lg">📜</span>
        <span>사건 수임</span>
      </FooterNavBarItem>
      <FooterNavBarItem href={"/my-info"} bgColor="bg-pink-500">
        <span className="text-lg">👱🏼</span>
        <span>내 정보</span>
      </FooterNavBarItem>
    </FooterNavBarTemplate>
  );
}
