import { useState } from "react";
import Image from "next/image";
import { AlertTriangleIcon14 } from "@icons14";
import { AlertTriangleIcon20 } from "@icons20";
import { UpArrowIcon, DownArrowIcon } from "@icons24";
import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import "@styles/accordion.css";

type AccordionProps = {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  isUrgent?: boolean;
};

/**
 * @name Accordion
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 */
export default function Accordion({
                                    id,
                                    title,
                                    author,
                                    date,
                                    description,
                                    isUrgent,
                                  }: AccordionProps) {
  const [isMobile] = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`_accordion ${isOpen ? "_open" : ""}`}>
      <button
        type="button"
        className="_accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={isMobile ? "_mobile-accordion-texts" : "_accordion-text"}
        >
          <span className="_top-titles">
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              className={`_id ${
                isMobile
                  ? "relative pr-2 mr-2 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-koser-grayscale-40 after:w-[1px] after:h-[10px]"
                  : "after-none"
              } `}
            >
              {id}
            </Typography>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              className={`_title ${isUrgent ? "flex gap-x-[6px] text-koser-secondary-red-50" : ""}`}
            >
              {(isMobile && isUrgent) && <Image src={AlertTriangleIcon14} alt="긴급점검 아이콘" width={14} height={14} />}
              {(!isMobile && isUrgent) && <Image src={AlertTriangleIcon20} alt="긴급점검 아이콘" width={20} height={20} />}
              {title}
            </Typography>
          </span>
          <span className="_bottom-titles">
            <Typography
              kind={isMobile ? "caption-large" : "title-medium"}
              className={`_author ${
                isMobile
                  ? "relative pr-2 mr-2 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-koser-grayscale-40 after:w-[1px] after:h-[10px]"
                  : "after-none"
              }`}
            >
              {author}
            </Typography>
            <Typography
              kind={isMobile ? "caption-large" : "title-medium"}
              className="_date-text"
            >
              {date}
            </Typography>
          </span>

          <span className="_accordion-toggle-icon">
            <Image
              src={isOpen ? UpArrowIcon : DownArrowIcon}
              width={20}
              height={20}
              alt={isOpen ? "열림 아이콘" : "닫힘 아이콘"}
            />
          </span>
        </span>
      </button>

      <div className="_accordion-content">
        <Typography kind={isMobile ? "body-medium" : "title-medium"}>
          {description}
        </Typography>
      </div>
    </div>
  );
}
