import type { Metadata } from "next";
import { DASHBOARD_METADATA } from "@constants/metadata";
import { CommonLayout } from "@components/layout";

export const metadata: Metadata = {
  title: DASHBOARD_METADATA.TITLE,
  description: DASHBOARD_METADATA.DESCRIPTION,
};

export default function Dashboard() {
  return (
    <CommonLayout>
      <div>대시보드</div>
    </CommonLayout>
  );
}