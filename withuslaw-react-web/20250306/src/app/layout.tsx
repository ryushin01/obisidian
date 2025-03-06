import React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Providers from "@/provider";
import HeaderWithoutRightItem from "@app/HeaderWithoutRightItem";
import FooterNavBar from "@app/FooterNavBar";
import ToastModal from "@app/ToastModal";
import "@app/globals.css";

const pretendard = localFont({
  src: [
    {
      path: "./_fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./_fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./_fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./_fonts/Pretendard-Black.subset.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOS APP",
  description: "부동산 대출 디지털 업무지원 시스템",
  icons: {
    icon: "/KosLogo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} w-full flex flex-col justify-between`}
      >
        <Providers>
          <HeaderWithoutRightItem />

          <div className="self flex flex-col grow">{children}</div>
          {
            /* 로컬로 실행할 경우에만 푸터 영역 노출 */
            process.env.NEXT_PUBLIC_APP_MODE === "local" && <FooterNavBar />
          }
          <ToastModal />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
