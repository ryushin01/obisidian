import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";
import Image from "next/image";
import { CheckboxUncheckedIcon, CheckboxCheckedIcon } from "@icons20";
import "@styles/checkbox.css";

type CheckboxProps = {
  name: string;
  labelText: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

/**
 * @name Checkbox
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {string} name              - 양식 제출 시 서버에서 식별하기 위한 선택값
 * @property {string} labelText         - 라벨 텍스트
 * @property {boolean} checked          - 선택값
 * @property {boolean} disabled         - 비활성화 여부
 * @property {function} onChange        - 선택 시 호출 함수
 */
export default function Checkbox({
  name,
  labelText,
  checked,
  disabled,
  onChange,
}: CheckboxProps) {
  const className = `_checkbox`;

  return (
    <label className={className}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Image
        src={checked ? CheckboxCheckedIcon : CheckboxUncheckedIcon}
        alt={checked ? "선택 아이콘" : "선택 해제 아이콘"}
        width={20}
        height={20}
      />
      <span>{labelText}</span>
    </label>
  );
}
