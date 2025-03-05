import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { TITLE, DESCRIPTION, FAVICON, OG_IMAGE } from "@constants/metadata";
import { Header } from "@components/layout";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: FAVICON,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGE,
    siteName: TITLE,
    type: "website",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGE,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
    <head>
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
      />
    </head>
    <body>
    <div id="app">
      <Header />
      {children}
    </div>
    <div id="portal" />
    </body>
    </html>
  );
}
