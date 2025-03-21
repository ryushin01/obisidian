import type { Metadata } from "next";
import { AD_ASSIGN_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { CustomErrorBoundary } from "@components/error-boundary";
import { ADBreadcrumb } from "@components/breadcrumb";
import Main from "@components/admin/assign/Main";

export const metadata: Metadata = {
  title: AD_ASSIGN_METADATA.TITLE,
  description: AD_ASSIGN_METADATA.DESCRIPTION,
};

export default async function Assign() {
  return (
    <CommonLayout>
      <ADBreadcrumb />
      <CustomErrorBoundary element={<Main />} />
    </CommonLayout>
  );
}
