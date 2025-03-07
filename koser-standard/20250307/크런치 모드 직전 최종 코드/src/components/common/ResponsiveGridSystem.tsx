import { ReactNode } from "react";

type ResponsiveGridSystemProps = {
  mobile: number,
  tablet: number,
  desktop: number,
  children?: ReactNode;
};

/**
 * @name ResponsiveGridSystem
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} mobile        - 모바일 해상도(max-width: 767px)에서 n개 화면 분할
 * @property {number} tablet        - 태블릿 해상도(min-width: 768px)에서 n개 화면 분할
 * @property {number} desktop       - 데스크탑 해상도(min-width: 1280px)에서 n개 화면 분할
 */
export default function ResponsiveGridSystem({
                                               mobile,
                                               tablet,
                                               desktop,
                                               children,
                                             }: ResponsiveGridSystemProps) {
  const mobileGridCols: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const tabletGridCols: { [key: number]: string } = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  };

  const desktopGridCols: { [key: number]: string } = {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  };

  return (
    <div
      className={`grid h-full ${mobileGridCols[mobile]} ${tabletGridCols[tablet]} ${desktopGridCols[desktop]}`}
    >
      {children}
    </div>
  );
}
