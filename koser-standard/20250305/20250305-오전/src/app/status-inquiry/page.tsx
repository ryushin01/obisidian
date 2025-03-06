import type { Metadata } from "next";
import { STATUS_INQUIRY_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";

export const metadata: Metadata = {
  title: STATUS_INQUIRY_METADATA.TITLE,
  description: STATUS_INQUIRY_METADATA.DESCRIPTION,
};

export default function StatusInquiry() {
  return (
    <CommonLayout>
      <div>현황조회</div>
    </CommonLayout>
  );
}