import type { Metadata } from "next";
import { FI_REQUEST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { CustomErrorBoundary } from "@components/error-boundary";
import { FIBreadcrumb } from "@components/breadcrumb";
import Main from "@components/request/Main";

export const metadata: Metadata = {
  title: FI_REQUEST_METADATA.TITLE,
  description: FI_REQUEST_METADATA.DESCRIPTION,
};

export default function Request() {
  return (
    <CommonLayout>
      <FIBreadcrumb />
      <CustomErrorBoundary element={<Main />} />
    </CommonLayout>
  );
}