"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { KeyImage, WooriBankIcon } from "@icons";
import { Button } from "@components";
import { WooriFooter } from "@components/woori-layout";

export default function Cover() {
  const loanNoParams = useParams();
  const router = useRouter();

  return (
    <>
      <main className="flex flex-1 flex-col justify-center items-center w-full py-8 px-4">
        <h1>
          <Image src={WooriBankIcon} alt="우리은행 로고" />
        </h1>

        <h2 className="mt-5 py-3 text-[32px] leading-[34px] font-semibold -tracking-[0.64px]">
          대출 사후 서류 제출
        </h2>

        <div className="py-10">
          <Image src={KeyImage} alt="열쇠 이미지" />
        </div>

        <div className="w-full mb-[50px]">
          <Button.CtaButton
            size="XLarge"
            state="Woori"
            onClick={() =>
              router.push(`/view/searchcntr/${loanNoParams.loanNo}`)
            }
          >
            제출하기
          </Button.CtaButton>
        </div>

        <WooriFooter />
      </main>
    </>
  );
}
