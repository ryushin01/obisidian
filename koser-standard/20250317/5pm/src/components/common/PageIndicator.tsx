import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import "@styles/pagination.css";

type PageIndicatorProps = {
  total: number;
  page: number;
  limit: number;
};

/**
 * @name PageIndicator
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} total        - 총 데이터 개수 정의합니다.
 * @property {number} page         - 현재 페이지를 정의합니다.
 * @property {number} limit        - 한페이지에 표시할 데이터 개수를 정의합니다.
 */

export default function PageIndicator({
                                        total,
                                        page,
                                        limit,
                                      }: PageIndicatorProps) {
  const [isMobile] = useResponsive();
  const allPageNum = Math.ceil(total / limit); // 총 페이지네이션 갯수

  return (
    <div className="_page-indicator">
      <Typography kind={isMobile ? "caption-large" : "body-large"}>
        전체 <strong>{total}</strong>건 ({page}/{allPageNum} 페이지)
      </Typography>
    </div>
  );
}
