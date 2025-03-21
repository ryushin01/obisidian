import type { Metadata } from "next";
import { AD_ASSIGN_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { ADBreadcrumb } from "@components/breadcrumb";

export const metadata: Metadata = {
  title: AD_ASSIGN_METADATA.TITLE,
  description: AD_ASSIGN_METADATA.DESCRIPTION,
};

export default async function Assign() {
  return (
    <CommonLayout>
      <div>
        <ADBreadcrumb />
        배정관리
      </div>
    </CommonLayout>
  );
}
