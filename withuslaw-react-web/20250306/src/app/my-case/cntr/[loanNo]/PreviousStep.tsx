import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@components";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { caseDetailAtom } from "@stores";
import { useAtomValue } from "jotai";

type TPrevProg = {
  progDesc: string;
  progGbCd: string;
  progGbNm: string;
  progGbNum: string;
  viewYn: string;
};
type TProps = {
  prevProgList?: TPrevProg[];
};

export default function PreviousStep({ prevProgList }: TProps) {
  const router = useRouter();
  const { lndHndgSlfDsc } = useAtomValue(caseDetailAtom);

  function getPathName(progGbNum: string) {
    if (lndHndgSlfDsc === "1") {
      switch (progGbNum) {
        case "5":
          return "/my-case/pay-request/loan-info"; // 대출금 요청
        case "6":
          return "/my-case/rpycncl"; // 상환말소
        case "7":
          return "/my-case/trreg"; // 접수번호 등록
        case "8":
          return "/my-case/image"; // 설정서류
        default:
          return "";
      }
    } else {
      switch (progGbNum) {
        case "5":
          return "/my-case/pay-request/sr-loan-info"; // 대출금 요청
        case "6":
          return "/my-case/sr-rpycncl"; // 상환말소
        case "7":
          return "/my-case/trreg"; // 접수번호 등록
        case "8":
          return "/my-case/image"; // 설정서류
        default:
          return "";
      }
    }
  }

  let viewYnPrevList = prevProgList?.filter((value) => value.viewYn === "Y");

  return (
    !!viewYnPrevList &&
    viewYnPrevList.length > 0 && (
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        className="px-5 bg-kos-gray-400 rounded-2xl text-kos-gray-600 font-bold"
      >
        <AccordionItem>
          <AccordionButton
            display="flex"
            justifyContent={"space-between"}
            className="py-3"
          >
            <span>대출금 실행 정보</span>
            <AccordionIcon width={30} height={30} />
          </AccordionButton>
          <AccordionPanel as="ul" className="pb-3">
            {viewYnPrevList.map((prev) => (
              <li className="flex justify-between" key={prev.progGbNm}>
                <Typography
                  type={Typography.TypographyType.H6}
                  color="text-kos-gray-700"
                >
                  {prev.progGbNm}
                </Typography>
                <button
                  onClick={() => router.push(getPathName(prev.progGbNum))}
                >
                  <Typography
                    type={Typography.TypographyType.B4}
                    color="text-kos-gray-700"
                  >
                    보기
                  </Typography>
                </button>
              </li>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  );
}
