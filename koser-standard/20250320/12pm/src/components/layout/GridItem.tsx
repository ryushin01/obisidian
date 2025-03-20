import { ReactNode } from "react";

type GridItemProps = {
  mobile: number,
  tablet: number,
  desktop: number,
  children?: ReactNode;
};

/**
 * @name GridItem
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description X축 기준으로 화면은 12분할되어 있습니다.
 * @property {number} mobile        - 모바일 해상도(max-width: 767px)에서 차지할 화면 분할 갯수
 * @property {number} tablet        - 태블릿 해상도(min-width: 768px)에서 차지할 화면 분할 갯수
 * @property {number} desktop       - 데스크탑 해상도(min-width: 1280px)에서 차지할 화면 분할 갯수
 */
export default function GridItem({
                                   mobile,
                                   tablet,
                                   desktop,
                                   children,
                                 }: GridItemProps) {
  const mobileGridCols: { [key: number]: string } = {
    1: "w-1/12",
    2: "w-2/12",
    3: "w-3/12",
    4: "w-4/12",
    5: "w-5/12",
    6: "w-6/12",
    7: "w-7/12",
    8: "w-8/12",
    9: "w-9/12",
    10: "w-10/12",
    11: "w-11/12",
    12: "w-full",
  };

  const tabletGridCols: { [key: number]: string } = {
    1: "md:w-1/12",
    2: "md:w-2/12",
    3: "md:w-3/12",
    4: "md:w-4/12",
    5: "md:w-5/12",
    6: "md:w-6/12",
    7: "md:w-7/12",
    8: "md:w-8/12",
    9: "md:w-9/12",
    10: "md:w-10/12",
    11: "md:w-11/12",
    12: "md:w-full",
  };

  const desktopGridCols: { [key: number]: string } = {
    1: "xl:w-1/12",
    2: "xl:w-2/12",
    3: "xl:w-3/12",
    4: "xl:w-4/12",
    5: "xl:w-5/12",
    6: "xl:w-6/12",
    7: "xl:w-7/12",
    8: "xl:w-8/12",
    9: "xl:w-9/12",
    10: "xl:w-10/12",
    11: "xl:w-11/12",
    12: "xl:w-full",
  };

  return (
    <div className={`${mobileGridCols[mobile]} ${tabletGridCols[tablet]} ${desktopGridCols[desktop]}`}>
      {children}
    </div>
  );
}
