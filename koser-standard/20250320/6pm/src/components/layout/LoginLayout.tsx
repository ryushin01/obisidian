import { ReactNode } from "react";

/**
 * @name LoginLayout
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="_login-outer-wrapper">
      <main>
        <div className="_login-inner-wrapper">{children}</div>
      </main>
    </div>
  );
}