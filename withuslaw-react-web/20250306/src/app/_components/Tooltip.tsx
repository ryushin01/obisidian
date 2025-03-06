import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DiscriptionIcon, DeleteGrayIcon } from "@icons";

type TProps = {
  className?: string;
  children: React.ReactNode;
  deleteIcon?: boolean;
};

/**
 * deleteIcon으로 Tooltip 내 X버튼 추가
 *
 */

export default function Tooltip({ children, className, deleteIcon }: TProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleShowTooltip() {
    setShowTooltip((prevState) => !prevState);
  }

  // tooltip 외 클릭 시 닫히게 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="relative" onClick={handleShowTooltip}>
      <Image
        src={DiscriptionIcon}
        alt="description icon"
        width={20}
        className="ml-0.5 cursor-pointer"
      />
      {showTooltip && (
        <div className={`absolute ${className}`} ref={modalRef}>
          <p
            className="flex justify-center items-center relative max-w-[calc(100vw-84px)] w-max max-h-[74px] py-2.5 pl-2.5 pr-2  bg-kos-brown-300 rounded-lg text-[13px]
            weight-medium text-kos-white after:absolute after:left-2 after:bottom-[-4px]
            after:w-3 after:h-2 after:border-[8px] after:border-solid after:border-transparent after:border-t-[8px] after:border-b-[0] after:border-t-kos-brown-300"
          >
            {children}
            {deleteIcon && (
              <span
                className="block w-5 h-5 cursor-pointer"
                onClick={() => setShowTooltip(false)}
              >
                <Image src={DeleteGrayIcon} alt="delete" width={24} />
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
