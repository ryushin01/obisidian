"use client";

import { AUTH_LIST } from "@constants/auth";
import { ID_SAVER, INTERESTS_LIST } from "./data/data";
import { Checkbox, Radio } from "@components/form";
import { useCheckbox, useCheckboxes, useRadio } from "@hooks";

export default function SampleCheckboxAndRadio() {
  // NOTE: Checkbox 컴포넌트(단일) 사용 시 useCheckbox 커스텀 훅을 사용합니다.
  const [isChecked, handleCheckbox] = useCheckbox();

  // NOTE: Checkbox 컴포넌트(다중) 사용 시 useCheckboxes 커스텀 훅을 사용합니다.
  const [checkedList, handleCheckboxes] = useCheckboxes();

  // NOTE: Radio 컴포넌트 사용 시 useRadio 커스텀 훅을 사용하고, 초기값을 설정합니다.
  const [radioValue, handleRadio] = useRadio("institution");

  console.log("아이디 저장 유무: ", isChecked);
  console.log("지금 선택된 체크박스 값: ", checkedList);
  console.log("지금 선택된 라디오 값: ", radioValue);

  return (
    <div className="_flex-center flex-col gap-10">
      {/* checkbox component */}
      <div>
        <Checkbox
          name={ID_SAVER.name}
          labelText={ID_SAVER.labelText}
          checked={isChecked}
          disabled={ID_SAVER.disabled}
          onChange={handleCheckbox}
        />
      </div>

      {/* Checkboxs component */}
      <div>
        {INTERESTS_LIST.map((interest) => {
          const { id, name, labelText, disabled } = interest;

          return (
            <div key={id}>
              <Checkbox
                name={name}
                labelText={labelText}
                checked={checkedList.includes(name)}
                disabled={disabled}
                onChange={(event) => {
                  handleCheckboxes(event.target.name, event.target.checked);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Radio component */}
      <div>
        {AUTH_LIST.map((auth) => {
          const { id, name, value, labelText, disabled } = auth;

          return (
            <div key={id}>
              <Radio
                name={name}
                value={value}
                labelText={labelText}
                checked={radioValue === value}
                disabled={disabled}
                onChange={handleRadio}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
