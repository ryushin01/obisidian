import type { Metadata } from "next";
import { HOME_METADATA } from "@constants/metadata";
import { CommonLayout, Footer } from "@components/layout";

export const metadata: Metadata = {
  title: HOME_METADATA.TITLE,
  description: HOME_METADATA.DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <CommonLayout>
        <div className="h-[3000px]">홈</div>
      </CommonLayout>
      <Footer />
    </>
  );
}