import type { Metadata } from "next";
import { REQUEST_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";
import Breadcrumb from "@components/common/Breadcrumb";

export const metadata: Metadata = {
  title: REQUEST_METADATA.TITLE,
  description: REQUEST_METADATA.DESCRIPTION,
};

export default function Request() {
  return (
    <CommonLayout>
      <div>
        <Breadcrumb />

        전자등기 의뢰

      </div>
    </CommonLayout>
  );
}