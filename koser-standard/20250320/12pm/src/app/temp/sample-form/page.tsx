"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button, IconButton } from "@components/button";
import { Badge } from "@/components/common";
import {
  Input,
  Label,
  Form,
  InputField,
  SearchInput,
  Select,
} from "@components/form";

import { NarrowRightIcon } from "@icons/20";
import { SearchIcon } from "@icons/24";
import {
  TEXT_INPUT,
  CHANGE_PASSWORD_INPUT,
  APPLICATION_NUMBER_INPUT,
  DEBTOR_INPUT,
  ID_INPUT,
  PASSWORD_INPUT,
} from "@constants/input";
import { CONUTRY_LIST } from "./data/data";
import TextArea from "@/components/form/TextArea";

export default function FormComponent() {
  // NOTE: 1. form 안의 값들을 객체로 묶어서 저장하기 위해 각 input의 name 기준으로 key를 할당합니다.
  const [formValues, setFormValues] = useState({
    test1: "",
    test2: "",
    test3: "",
    test4: "",
    test5: "",
    test6: "",
    test7: "",
    test8: "",
    test9: "",
    test10: "",
    test11: "",
    test12: "",
    select: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(CONUTRY_LIST[0].value);
  // const OPTIONS = [
  //   { value: "apple", label: "사과" },
  //   { value: "banana", label: "바나나" },
  //   { value: "orange", label: "오렌지" },
  // ];

  // NOTE: 2. input 값 변화를 감지하기 위한 함수를 생성합니다.
  const typingMonitor = (e: ChangeEvent<HTMLFormElement>) => {
    // NOTE: 3. 각 input의 name과 value를 구조 분해 할당합니다.
    const { name, value } = e.target;

    // NOTE: 4. 각 input의 name(key)과 value를 매핑합니다.
    // NOTE: 5. 기존 객체를 스프레드 오퍼레이터로 복제하여 SetStateAction에 넣습니다. 이로써 각 input의 value가 변하면 실시간으로 리렌더링할 수 있습니다.
    setFormValues({ ...formValues, [name]: value });
  };

  // NOTE: 6. 콘솔 출력 시 객체 안에 각 name에 value가 찍히는 것이 확인됩니다.
  // console.log(formValues);

  // NOTE: 10. 마지막으로 Form의 모든 input 값을 DTO 형태로 묶어서 서버로 보냅니다.
  const handleSubmit = () => {
    console.log("formValues", formValues);
    if (formValues.test2 === "") {
      setIsError(true);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
  //   console.log(e.target.value);
  // };

  const handleClick = () => {
    console.log("검색버튼 클릭");
    setOpenSearch(!openSearch);
  };
  const handleClick2 = () => {
    console.log("텍스트버튼 클릭");
    handleSubmit();
  };
  // const handleClick3 = () => {
  //   console.log("리셋버튼 클릭");
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     test10: "", // test10 값만 초기화
  //   }));
  // };
  const clickIconBtn = () => {
    console.log("아이콘버튼 클릭");
    setOpenSearch(!openSearch);
  };

  // const handleClick = (i) => {
  //   console.log(i);
  //   setOptionValue(i.target.value);
  // };

  const [isError, setIsError] = useState(Boolean);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <main>
      <Form
        onSubmit={handleSubmit}
        legendText="인풋테스트"
        isHiddenLegend={false}
        // NOTE: 7. Form에 onChange 이벤트를 걸고, 모든 input의 값들을 제어합니다.
        onChange={typingMonitor}
      >
        <div>1</div>
        <Label>
          <Input
            name="test1"
            // NOTE: 8. input의 value는 onChange가 있어야 됩니다. 그렇기 때문에 여기서 에러가 발생합니다. 따라서 input의 value를 유동적으로 변경해야 하는 경우는 value 대신 defaultValue로 바꿔서 사용합니다.
            // NOTE: 9. value의 값을 아래와 같이 지정해야 합니다.
            defaultValue={formValues.test1}
            shape="xl"
            isError={isError}
            // disabled={true}
          />
        </Label>

        <div>2</div>
        <InputField
          name="test2"
          defaultValue={formValues.test2}
          // htmlFor="text2"
          // labelText="ID를 입력해주세요"
          required={false}
          placeholder={ID_INPUT.placeHolder}
          inputMessage={ID_INPUT.labelText}
          errorMessage={ID_INPUT.errorText}
          icon={
            <Image
              src={ID_INPUT.icon}
              alt="유저아이콘"
              width={20}
              height={20}
            />
          }
          iconPosition="left"
          isError={isError}
          // disabled={true}
        />
        <div>3</div>
        <InputField
          name="test3"
          defaultValue={formValues.test3}
          htmlFor=""
          labelText={""}
          required={false}
          placeholder={PASSWORD_INPUT.placeHolder}
          inputMessage={PASSWORD_INPUT.labelText}
          errorMessage={PASSWORD_INPUT.errorText}
          icon={
            <Image
              src={PASSWORD_INPUT.icon}
              alt="자물쇠아이콘"
              width={20}
              height={20}
            />
          }
          iconPosition="left"
          isError={isError}
          // disabled={true}
        />

        <div>4</div>
        <InputField
          name="test4"
          defaultValue={formValues.test4}
          // htmlFor="test4"
          // labelText={"test4"}
          required={false}
          placeholder={APPLICATION_NUMBER_INPUT.placeHolder}
          inputMessage={APPLICATION_NUMBER_INPUT.labelText}
          errorMessage={APPLICATION_NUMBER_INPUT.errorText}
          isError={isError}
          // disabled={true}
        />

        <div>5</div>
        <InputField
          name="test5"
          defaultValue={formValues.test5}
          htmlFor="test2"
          // labelText={"test5"}
          // required={true}
          placeholder={DEBTOR_INPUT.placeHolder}
          inputMessage={DEBTOR_INPUT.labelText}
          errorMessage={DEBTOR_INPUT.errorText}
          isError={isError}
          // disabled={true}
        />

        <div>5</div>
        <SearchInput name="test6" defaultValue={formValues.test6} shape="xl" />

        <div>6</div>
        <Button
          shape="outline"
          size="sm"
          onClick={handleClick2}
          color="grayscale"
          // disabled={true}
        >
          텍스트 버튼
        </Button>

        <div>7</div>
        <InputField
          name="test7"
          defaultValue={formValues.test7}
          htmlFor="현재비밀번호"
          labelText={CHANGE_PASSWORD_INPUT.currentLabelText}
          type="password"
          required={true}
          placeholder={CHANGE_PASSWORD_INPUT.currentPassword}
          errorMessage={CHANGE_PASSWORD_INPUT.currentErrorText}
          isError={isError}
          // disabled={true}
        />

        {/* <div>8</div> */}
        <InputField
          name="test8"
          type="password"
          defaultValue={formValues.test8}
          htmlFor="새비밀번호"
          labelText={CHANGE_PASSWORD_INPUT.newLabelText}
          required={true}
          placeholder={CHANGE_PASSWORD_INPUT.newPassword}
          errorMessage={CHANGE_PASSWORD_INPUT.newErrorText}
          isError={isError}
          // disabled={true}
        />
        <InputField
          name="test9"
          type="password"
          defaultValue={formValues.test9}
          htmlFor="비밀번호재확인"
          labelText=""
          required={true}
          placeholder={CHANGE_PASSWORD_INPUT.repeatPassword}
          errorMessage={CHANGE_PASSWORD_INPUT.repeatErrorText}
          isError={isError}
          inputSize="md"
          // disabled={true}
        />

        <div>9</div>
        <>
          {openSearch === true ? (
            <SearchInput
              name="test10"
              defaultValue={formValues.test10}
              shape="xl"
              onClick={handleClick}
            />
          ) : (
            <IconButton
              size="md"
              // color="neutral"
              onClick={clickIconBtn}
              icon={
                <Image
                  src={SearchIcon.src}
                  alt="arrow icon"
                  width={24}
                  height={24}
                />
              }
              // disabled={true}
            />
          )}
        </>

        <div>10</div>
        <Button
          shape="none"
          size="sm"
          color="grayscale"
          icon={
            <Image
              src={NarrowRightIcon.src}
              alt="더보기"
              width={20}
              height={20}
            />
          }
          iconPosition="right"
          // onClick={handleClick}
          // disabled={true}
        >
          더보기
        </Button>

        <div>11</div>
        <Select
          id="select"
          name="select"
          options={CONUTRY_LIST}
          value={selectedCountry}
          selectSize="xs"
          onChange={(e) => setSelectedCountry(e.target.value)}
          isError={isError}
          // disabled={true}
        />

        <div>12</div>
        <Select
          id="select"
          name="select"
          shape="none"
          options={CONUTRY_LIST}
          value={selectedCountry}
          selectSize="xs"
          onChange={(e) => setSelectedCountry(e.target.value)}
          isError={isError}
          // disabled={true}
        />

        <div>13</div>
        <InputField
          key="test11"
          name="test11"
          defaultValue={formValues.test11}
          // htmlFor="인풋테스트"
          // labelText="인풋테스트"
          hasButton={true}
          required={false}
          placeholder={TEXT_INPUT.placeHolder}
          // onClick={handleClick3}
          icon={
            <Image
              src={TEXT_INPUT.icon}
              alt="삭제 아이콘"
              width={20}
              height={20}
            />
          }
          isError={isError}
          // disabled={true}
        />

        <>14</>
        <TextArea
          name="test12"
          isError={isError}
          placeholder="입력해주세요"
          defaultValue={formValues.test12}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          // disabled={true}
        ></TextArea>
      </Form>

      <div>15</div>
      <div className="flex items-center ml-auto">
        <Badge colorType="active" type="number">
          1
        </Badge>
        <Badge colorType="default" type="text">
          미배정 50건
        </Badge>
      </div>
    </main>
  );
}
