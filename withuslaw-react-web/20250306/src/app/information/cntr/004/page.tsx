"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Typography } from "@components";
import { useCheckBox } from "@hooks";

export default function IN_CN_004M() {
  const [isChecked, onChangeCheckBox] = useCheckBox();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="basis-3/4 relative bg-kos-gray-100 p-4">
        <Typography
          type={Typography.TypographyType.H2}
          color="text-kos-gray-700"
        >
          대출금 입금지정계좌 등록 신청
        </Typography>
        {/* <br /> */}
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          [신규 대출금 수령 및 지급용 (금융기관 상환자금)]
          <br />
          우리은행과의 ‘법무사 위임계약’ 거래 및 금융기관 선순위 대출상환,
          말소(감액) 업무처리 관련, 우리은행의「대출금 지급 및 사후관리 업무
          표준화 서비스」를 이용하고자 입금지정계좌를 아래와 같이 신청합니다.
        </Typography>
        <br />
        <Typography
          type={Typography.TypographyType.H3}
          color="text-kos-gray-700"
        >
          대출금 지급 및 사후관리 업무 표준화 서비스를 위한 대출금 입금지정계좌
          등록 안내
        </Typography>
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          [필수]
          <br />
          우리은행 계좌 (기등록한 제비용 및 수수료입금 지정계좌 활용 가능)
        </Typography>
        {/* <br /> */}
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          [선택]
          <br />
          타행계좌 : KB국민은행, 신한은행, 하나은행, NH농협, IBK기업은행,
          부산은행, 광주은행, 경남은행, 전북은행, 대구은행, 제주은행
          <br />※ 한국시티, SC제일, 지방은행, 수협, 신협, 새마을금고,
          인터넷은행, 저축은행 및 보험사 등 금융기관, 또는 가상계좌를 활용하여
          영업점 방문 없이 선순위 대출상환 가능 시 우리은행 계좌 입금
        </Typography>
        <br />
        <Typography
          type={Typography.TypographyType.H2}
          color="text-kos-gray-700"
        >
          유의사항
        </Typography>
        {/* <br /> */}
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          법무사(지정법무사 포함)가 은행의 담보권 설정/변경/말소 등의 등기,
          채무자 등에 대한 은행의 채권, 담보권 등의 권리대행 및 보전을 위한
          금융기관의 선순위 조회, 대출상환, 말소(감액) 업무, 대출금 현장지급
          업무 등 은행이 위임하는 업무를 수행하기 위한 용도로만 위 계좌를 활용할
          수 있습니다.
          <br />
          대출실행(지급)일 은행으로부터 대출금을 수령 하고, 동일 대출금의 현장
          지급 업무 및 선순위 금융기관 상환업무처리 용도로만 제한합니다.
        </Typography>
        <br />
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          위 서비스와 관련 정당한 업무처리 외 도난, 분실, 횡령, 기타 이와 유사한
          행위 등으로 인하여, 기표 당일 대출금이 지급되지 아니 하거나 지연되는
          경우 또는 기타 은행에 발생하는 일체의 손해에 대하여 기 작성한
          위임계약서에 따라 책임을 부담할 수 있습니다.
        </Typography>
        <br />
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          위 계좌정보의 수정/변동 및 계약해지 등 발생 즉시 가까운 영업점에
          서면으로 통보하도록 하여야 합니다.
        </Typography>
      </div>
      <Divider />
      <footer className="basis-1/4">
        <div className="flex flex-col px-4 w-full h-full pt-6 pb-4 gap-y-6">
          <Button.Checkbox
            size="Big"
            id="check"
            label="위 내용을 확인했습니다."
            onChange={onChangeCheckBox}
            fontSize="H3"
          />
          <Button.CtaButton
            size="XLarge"
            state={"On"}
            disabled={!isChecked}
            onClick={() => router.push("/information/cntr/005")}
          >
            다음
          </Button.CtaButton>
        </div>
      </footer>
    </div>
  );
}
