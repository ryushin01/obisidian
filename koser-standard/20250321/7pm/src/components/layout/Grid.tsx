import { ReactNode } from "react";
import "@styles/responsive-grid-system.css";

type GridProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * @name Grid
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 반응형 웹 그리드 시스템은 Grid, GridItem 컴포넌트가 필요합니다.
 */
export default function Grid({
                               children,
                               className = "",
                             }: GridProps) {
  return (
    <div
      className={`_responsive-grid-system ${className}`}
    >
      {children}
    </div>
  );
}
