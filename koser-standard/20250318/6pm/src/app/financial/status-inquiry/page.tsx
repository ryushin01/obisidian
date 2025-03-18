import type { Metadata } from "next";
import { FI_STATUS_INQUIRY_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { FIBreadcrumb } from "@components/breadcrumb";

export const metadata: Metadata = {
  title: FI_STATUS_INQUIRY_METADATA.TITLE,
  description: FI_STATUS_INQUIRY_METADATA.DESCRIPTION,
};

export default function StatusInquiry() {
  return (
    <CommonLayout>
      <div>
        <FIBreadcrumb />
        현황조회
      </div>
    </CommonLayout>
  );
}