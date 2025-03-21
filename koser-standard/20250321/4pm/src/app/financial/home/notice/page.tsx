import type { Metadata } from "next";
import { FI_NOTICE_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { CustomErrorBoundary } from "@components/error-boundary";
import { FIBreadcrumb } from "@components/breadcrumb";
import Main from "@components/notice/financial/Main";

export const metadata: Metadata = {
  title: FI_NOTICE_METADATA.TITLE,
  description: FI_NOTICE_METADATA.DESCRIPTION,
};

export default function Notice() {
  return (
    <CommonLayout>
      <FIBreadcrumb />
      <CustomErrorBoundary element={<Main />} />
    </CommonLayout>
  );
}
