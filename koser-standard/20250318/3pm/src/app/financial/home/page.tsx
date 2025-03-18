import type { Metadata } from "next";
import { FI_HOME_METADATA } from "@constants/metadata";
import { CommonLayout, Footer } from "@components/layout";

export const metadata: Metadata = {
  title: FI_HOME_METADATA.TITLE,
  description: FI_HOME_METADATA.DESCRIPTION,
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