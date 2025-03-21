import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AUTH_LIST } from "@constants/auth";
import { AD_ASSIGN, FI_HOME_PATH } from "@constants/path";
import { ID_INPUT, ID_SAVER, PASSWORD_INPUT } from "@constants/input";
import { Checkbox, Form, InputField, Radio } from "@components/form";
import { Button } from "@components/button";
import { useCheckbox, useRadio } from "@hooks";
import { ResponsiveType } from "@types";
import LoginPasswordField from "./LoginPasswordField";

export default function LoginForm({ isMobile }: ResponsiveType) {
  const router = useRouter();
  const [radioValue, handleRadio] = useRadio("FI");
  const [isChecked, handleCheckbox] = useCheckbox();

  // const handleLoginForm = (event: MouseEvent) => {
  //   event.preventDefault();
  //
  //   switch (radioValue) {
  //     case "FI":
  //       router.push(FI_HOME_PATH);
  //       break;
  //     case "LA":
  //       alert("법무대리인 서비스는 준비 중입니다.");
  //       break;
  //     case "AD":
  //       router.push(AD_ASSIGN);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <Form
      onSubmit={() => console.log("submit")}
      onChange={() => console.log("change")}
      legendText="로그인"
      isHiddenLegend={true}
      className="_login-form"
    >
      <div className="_login-radio-wrapper">
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
      <InputField
        type="text"
        name=""
        defaultValue=""
        required={false}
        placeholder={ID_INPUT.placeHolder}
        inputMessage={ID_INPUT.labelText}
        errorMessage={ID_INPUT.errorText}
        icon={
          <Image src={ID_INPUT.icon} alt="유저 아이콘" width={20} height={20} />
        }
        iconPosition="left"
        isError={false}
        inputSize={isMobile ? "md" : "lg"}
        // disabled={true}
      />
      <LoginPasswordField
        type="password"
        name=""
        defaultValue=""
        required={false}
        placeholder={PASSWORD_INPUT.placeHolder}
        inputMessage={PASSWORD_INPUT.labelText}
        errorMessage={PASSWORD_INPUT.errorText}
        icon={
          <Image
            src={PASSWORD_INPUT.icon}
            alt="자물쇠 아이콘"
            width={20}
            height={20}
          />
        }
        iconPosition="left"
        isError={false}
        inputSize={isMobile ? "md" : "lg"}
        // disabled={true}
      />
      <div className="_login-checkbox-wrapper">
        <Checkbox
          name={ID_SAVER.name}
          labelText={ID_SAVER.labelText}
          checked={isChecked}
          disabled={ID_SAVER.disabled}
          onChange={handleCheckbox}
        />
      </div>
      <Button
        // TODO: 로직 개발 시 submit 주석 해제
        // type="submit"
        shape="solid"
        size="lg"
        color="main100"
        onClick={() => {
          switch (radioValue) {
            case "FI":
              router.push(FI_HOME_PATH);
              break;
            case "LA":
              alert("법무대리인 서비스는 준비 중입니다.");
              break;
            case "AD":
              router.push(AD_ASSIGN);
              break;
            default:
              break;
          }
        }}
      >
        로그인
      </Button>
    </Form>
  );
}
