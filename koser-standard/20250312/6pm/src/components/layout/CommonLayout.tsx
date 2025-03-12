import { ReactNode } from "react";
import { Gnb } from "@components/layout";

/**
 * @name CommonLayout
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="_main-outer-wrapper">
      <Gnb />
      <main>
        <div className="_main-inner-wrapper">{children}</div>
      </main>
    </div>
  );
}