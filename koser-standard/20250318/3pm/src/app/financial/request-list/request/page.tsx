import type { Metadata } from "next";
import { FI_REQUEST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { FIBreadcrumb } from "@components/breadcrumb";
import Main from "./components/main";

export const metadata: Metadata = {
  title: FI_REQUEST_METADATA.TITLE,
  description: FI_REQUEST_METADATA.DESCRIPTION,
};

export default function Request() {
  return (
    <CommonLayout>
      <FIBreadcrumb />
      <Main />
    </CommonLayout>
  );
}