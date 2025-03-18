"use client";

import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import DesktopFileUploader from "./desktop-file-uploader";
import MobileFileUploader from "./mobile-file-uploader";

export default function Main() {
  const [isMobile] = useResponsive();

  return (
    <section>
      <Typography
        as="h2"
        kind={isMobile ? "title-large" : "headline-medium"}
        isBold={true}
        className={isMobile ? "pb-4" : "py-6"}
      >전자등기 의뢰</Typography>

      {!isMobile && <DesktopFileUploader />}
      {isMobile && <MobileFileUploader />}
    </section>
  );
}