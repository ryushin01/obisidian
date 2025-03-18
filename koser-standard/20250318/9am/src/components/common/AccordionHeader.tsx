import { useResponsive } from "@hooks";
import "@styles/accordion.css";
import Typography from "./Typography";

/**
 * @name Accordion
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {Date} startDate               - 선택된 날짜(시작일)
 */
export default function AccordionHeader() {
  const [isMobile] = useResponsive();

  /* TODO : 모바일일때, accordion text 정렬.. */
  return (
    <div className={isMobile ? "_mb-accordion-header" : "_accordion-header"}>
      {isMobile ? (
        <>
          <div></div>
        </>
      ) : (
        <>
          <Typography kind={"title-medium"} className="_id w-2/12">
            번호
          </Typography>
          <Typography kind={"title-medium"} className="_title w-full">
            제목
          </Typography>
          <Typography kind={"title-medium"} className="_author w-2/12">
            작성자
          </Typography>
          <Typography kind={"title-medium"} className="_date-text w-2/12">
            등록일
          </Typography>
          <div className=" w-1/12"></div>
        </>
      )}
    </div>
  );
}
