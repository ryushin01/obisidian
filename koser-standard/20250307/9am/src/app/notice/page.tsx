import type { Metadata } from "next";
import { NOTICE_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";

export const metadata: Metadata = {
  title: NOTICE_METADATA.TITLE,
  description: NOTICE_METADATA.DESCRIPTION,
};

export default function Notice() {
  return (
    <CommonLayout>
      <div>공지사항</div>
    </CommonLayout>
  );
}