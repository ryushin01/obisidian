import type { Metadata } from "next";
import { REQUEST_LIST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";

export const metadata: Metadata = {
  title: REQUEST_LIST_METADATA.TITLE,
  description: REQUEST_LIST_METADATA.DESCRIPTION,
};

export default function RequestList() {
  return (
    <CommonLayout>
      <div>의뢰목록</div>
    </CommonLayout>
  );
}