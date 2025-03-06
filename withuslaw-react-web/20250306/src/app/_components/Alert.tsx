"use client";

import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { TypographyType } from "@components/typography/Constant";
import Typography from "@components/typography";
import Button from "@components/common/Button";

type TAlert = {
  isOpen: boolean;
  title: string | ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmCallBack: () => void;
  cancelCallBack?: () => void;
  bodyText?: ReactNode;
  children?: ReactNode;
};

/**
 * title 모달 제목, children 모달 내용
 * cancelText 왼쪽 버튼 - 아무 내용 없을 시 확인 버튼만 남음 (확인 버튼만 있을 때)
 * confirmText 오른쪽 버튼 - 확인 버튼
 *
 */

export default function Alert({
  isOpen = false,
  title,
  confirmText = "확인",
  confirmCallBack,
  cancelText,
  cancelCallBack,
  bodyText,
  children,
}: TAlert) {
  return (
    isOpen &&
    createPortal(
      <div className="z-40 fixed top-0 w-full h-screen bg-kos-dim-60">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[inherit] max-w-[343px] p-5 bg-kos-white rounded-[20px]">
          <div className="py-3">
            <Typography color="text-kos-gray-800" type={TypographyType.H3}>
              {title}
            </Typography>
          </div>
          <Typography color="text-kos-gray-700" type={TypographyType.B1}>
            {bodyText}
          </Typography>
          {children}
          <div className="flex align-center pt-5 pb-2 gap-2">
            {cancelText && (
              <Button
                className="h-[44px]"
                background="white"
                color="kos-gray-600"
                border="kos-gray-400"
                onClick={cancelCallBack}
              >
                <Typography type={TypographyType.H5} color="text-kos-gray-600">
                  {cancelText}
                </Typography>
              </Button>
            )}
            <Button
              className="h-[44px]"
              background="kos-orange-500"
              color="white"
              onClick={confirmCallBack}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
