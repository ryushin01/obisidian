import { useState } from "react";
import Image from "next/image";
import { ArrowUpIcon, ArrowDownIcon } from "@icons";
import "@styles/accordion.css";

type AccordionProps = {
  id: number,
  title: string,
  author: string,
  date: string,
  description: string,
};

/**
 * @name Accordion
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {Date} startDate               - 선택된 날짜(시작일)
 */
export default function Accordion({ id, title, author, date, description }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="_accordion">
      <button type="button" className="_accordion-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{id}</span>
        <span>{title}</span>
        <span>{author}</span>
        <span>{date}</span>
        <Image src={isOpen ? ArrowUpIcon : ArrowDownIcon} width={20} height={20} alt={isOpen ? "열림 아이콘" : "닫힘 아이콘"} />
      </button>

      <div className={`_accordion-content ${isOpen ? "open" : ""}`}>{description}</div>
    </div>
  );
}
