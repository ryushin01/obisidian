import type { Metadata } from "next";
import { FI_HOME_METADATA } from "@constants/metadata";
import { LoginLayout } from "@components/layout";
import LoginSection from "@components/login/LoginSection";
import "@styles/login.css";

export const metadata: Metadata = {
  title: FI_HOME_METADATA.TITLE,
  description: FI_HOME_METADATA.DESCRIPTION,
};

export default function Login() {
  return (
    <LoginLayout>
      <LoginSection />
    </LoginLayout>
  );
}