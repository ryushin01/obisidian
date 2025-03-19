"use client";

import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import LoginForm from "./LoginForm";
import LoginNotice from "./LoginNotice";

export default function LoginSection() {
  const [isMobile] = useResponsive();

  return (
    <section className="_login-section">
      <Typography
        as="h2"
        kind={isMobile ? "headline-small" : "headline-large"}
        isBold={true}
        className="text-koser-main-100"
      >전자등기 관리 시스템</Typography>
      <LoginForm isMobile={isMobile} />
      <LoginNotice isMobile={isMobile} />
    </section>
  );
}