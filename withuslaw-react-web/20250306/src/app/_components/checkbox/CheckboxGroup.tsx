import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckBoxBigOff, RightArrow, WooriCheckBoxBigOn } from "@icons";

type CheckboxProps = {
  id: string;
  label: string;
  path?: string;
  required?: boolean;
};

type CheckboxGroupProps = {
  dataSet: CheckboxProps[];
  setIsAllCheck: Dispatch<SetStateAction<boolean>>;
};

export default function CheckboxGroup({
  id,
  label,
  dataSet,
  setIsAllCheck,
}: CheckboxProps & CheckboxGroupProps) {
  const [checkList, setCheckList] = useState<string[]>([]);
  const valueArray: string[] = [];

  for (let object of dataSet) {
    valueArray.push(object.id);
  }

  const checkAll = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setCheckList(valueArray) : setCheckList([]);

    setIsAllCheck((prevState: boolean) => !prevState);
  };

  const check = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setCheckList([...checkList, event.target.id])
      : setCheckList(
          checkList.filter((checkListItem) => checkListItem !== event.target.id)
        );

    setIsAllCheck((prevState: boolean) => !prevState);
  };

  return (
    <>
      <div className="relative flex gap-x-2 items-center h-[34px] py-3 box-content border-b border-kos-gray-200">
        <input
          type="checkbox"
          name={id}
          id={id}
          onChange={checkAll}
          checked={checkList.length === dataSet.length}
          className="peer appearance-none relative shrink-0 w-6 h-6 mt-[18px] focus:outline-none"
        />
        <Image
          className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-[18px]"
          src={CheckBoxBigOff}
          alt="미선택 표시 아이콘"
        />
        <Image
          className="absolute top-0 hidden w-6 h-6 pointer-events-none peer-checked:block mt-[18px]"
          src={WooriCheckBoxBigOn}
          alt="선택 표시 아이콘"
        />
        <label
          htmlFor={id}
          className="text-lg leading-[26px] text-kos-gray-800 font-semibold"
        >
          {label}
        </label>
      </div>
      <ul>
        {dataSet?.map((data) => {
          const { id, label, path, required } = data;

          return (
            <li key={id}>
              <div className="relative flex gap-x-2 items-center py-2">
                <input
                  type="checkbox"
                  name={id}
                  id={id}
                  onChange={check}
                  checked={checkList.includes(id!)}
                  className="peer appearance-none relative shrink-0 w-6 h-6 mb-1.5 focus:outline-none"
                />
                <Image
                  className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-3"
                  src={CheckBoxBigOff}
                  alt="미선택 표시 아이콘"
                />
                <Image
                  className="absolute top-0 hidden w-6 h-6 pointer-events-none peer-checked:block mt-3"
                  src={WooriCheckBoxBigOn}
                  alt="선택 표시 아이콘"
                />
                <label
                  htmlFor={id}
                  className="text-lg leading-[26px] text-kos-gray-800 font-semibold"
                >
                  {required && `[필수] `}
                  {label}
                </label>
              </div>
              <Link
                href={path!}
                className="flex gap-x-2 justify-between items-center w-full pl-8 text-lg leading-[26px] text-kos-gray-600 font-medium"
              >
                <span>{label}</span>
                <Image
                  src={RightArrow}
                  alt="링크 화살표 아이콘"
                  width={16}
                  height={16}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
