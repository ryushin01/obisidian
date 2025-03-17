import type { Metadata } from "next";
import { REQUEST_LIST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import Breadcrumb from "@components/common/Breadcrumb";
import Main from "./components/main";

export const metadata: Metadata = {
  title: REQUEST_LIST_METADATA.TITLE,
  description: REQUEST_LIST_METADATA.DESCRIPTION,
};

export default function RequestList() {
  return (
    <CommonLayout>
      <Breadcrumb />
      <Main />
    </CommonLayout>
  );
}