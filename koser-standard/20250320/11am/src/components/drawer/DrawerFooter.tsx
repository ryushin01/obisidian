import { Typography } from "@components/common";

/**
 * @name DrawerFooter
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function DrawerFooter() {
  return (
    <div className="_drawer-footer">
      <Typography kind="body-small" isBold={true}>서비스 이용문의</Typography>
      <a href="tel:1877-2945">
        <Typography kind="title-large" isBold={true} className="text-koser-main-100">1877-2495</Typography>
      </a>
      <Typography kind="caption-large" className="text-koser-grayscale-90">평일 09:00~18:00<br />(토요일, 공휴일
        휴무)</Typography>
    </div>
  );
};
