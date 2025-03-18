import { useState } from "react";
import Image from "next/image";
import { UpArrowIcon, DownArrowIcon } from "@icons24";
import "@styles/accordion.css";
import { useResponsive } from "@hooks";
import Typography from "./Typography";

type AccordionProps = {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
};

/**
 * @name Accordion
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {Date} startDate               - 선택된 날짜(시작일)
 */
export default function Accordion({
  id,
  title,
  author,
  date,
  description,
}: AccordionProps) {
  const [isMobile] = useResponsive();

  const [isOpen, setIsOpen] = useState(false);

  /* TODO : 모바일일때, accordion text 정렬.. */
  return (
    <div className="_accordion">
      <button
        type="button"
        className={`_accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={isMobile ? "_mb-accordion-texts" : "_accordion-text"}>
          {isMobile ? (
            <>
              <span className="_t-titles">
                <Typography
                  kind={!!isMobile ? "body-medium" : "title-medium"}
                  className="_id after:content-['|'] after:ml-1 after:mr-1"
                >
                  {id}
                </Typography>
                <Typography
                  kind={!!isMobile ? "body-medium" : "title-medium"}
                  className="_title"
                >
                  {title}
                </Typography>
              </span>
              <span className="_b-titles">
                <Typography
                  kind={!!isMobile ? "caption-large" : "title-medium"}
                  className="_author after:content-['|'] after:ml-1 after:mr-1"
                >
                  {author}
                </Typography>
                <Typography
                  kind={!!isMobile ? "caption-large" : "title-small"}
                  className="_date-text"
                >
                  {date}
                </Typography>
              </span>
            </>
          ) : (
            <>
              <Typography
                kind={!!isMobile ? "body-medium" : "title-medium"}
                className="_id w-2/12"
              >
                {id}
              </Typography>
              <Typography
                kind={!!isMobile ? "body-medium" : "title-medium"}
                className="_title w-full text-left"
              >
                {title}
              </Typography>
              <Typography
                kind={!!isMobile ? "caption-large" : "title-medium"}
                className="_author w-2/12"
              >
                {author}
              </Typography>
              <Typography
                kind={!!isMobile ? "caption-large" : "title-small"}
                className="_date-text w-2/12"
              >
                {date}
              </Typography>
            </>
          )}
          <div className="w-1/12">
            <Image
              src={isOpen ? UpArrowIcon : DownArrowIcon}
              width={20}
              height={20}
              alt={isOpen ? "열림 아이콘" : "닫힘 아이콘"}
            />
          </div>
        </span>
      </button>

      <div className={`_accordion-content ${isOpen ? "open" : ""}`}>
        <Typography kind={!!isMobile ? "body-medium" : "title-medium"}>
          {description}
        </Typography>
      </div>
    </div>
  );
}
