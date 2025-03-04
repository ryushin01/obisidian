import { ReactNode } from "react";
import { Gnb, Footer } from "@components/layout";

/**
 * @name CommonLayout
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="_main-wrapper">
      <Gnb />
      <main>{children}</main>
      <Footer />
    </div>
  );
}