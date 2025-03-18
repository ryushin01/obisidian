import type { Metadata } from "next";
import { FI_REQUEST_LIST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { FIBreadcrumb } from "@components/breadcrumb";
import Main from "@components/request-list/main";

export const metadata: Metadata = {
  title: FI_REQUEST_LIST_METADATA.TITLE,
  description: FI_REQUEST_LIST_METADATA.DESCRIPTION,
};

export default function RequestList() {
  return (
    <CommonLayout>
      <FIBreadcrumb />
      <Main />
    </CommonLayout>
  );
}