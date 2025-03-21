import type { Metadata } from "next";
import { AD_REGISTRATION_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import { ADBreadcrumb } from "@components/breadcrumb";

export const metadata: Metadata = {
  title: AD_REGISTRATION_METADATA.TITLE,
  description: AD_REGISTRATION_METADATA.DESCRIPTION,
};

export default async function Registration() {
  return (
    <CommonLayout>
      <div>
        <ADBreadcrumb />

        등기관리
      </div>
    </CommonLayout>
  );
}
