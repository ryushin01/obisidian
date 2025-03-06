"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Size } from "@components/Constants";
import { Button, Typography } from "@components";
import { useFetchApi } from "@hooks";
import { caseDetailAtom } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function Page() {
  const router = useRouter();
  const { loanNo } = useAtomValue(caseDetailAtom);

  const { fetchApi } = useFetchApi();
  const { mutate } = useMutation({
    mutationKey: ["send-sms-auth"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/owshcnfmpprog/${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (res.code === "00") router.push("/my-case/loan-cert/confirm");
    },
  });

  return (
    <div className="flex flex-col justify-between grow w-full h-full">
      <div>
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
        >
          차주에게 전송된
          <br />
          승인번호 6자리를 입력해주세요
        </Typography>
        <Typography
          type={Typography.TypographyType.H3}
          color="text-kos-gray-600"
          className="mt-4"
        >
          차주에게 승인번호가 알림톡으로 전송됩니다.
        </Typography>
      </div>
      <footer>
        <Button.CtaButton
          size={Size.XLarge}
          state={"On"}
          onClick={() => mutate()}
        >
          인증번호 요청
        </Button.CtaButton>
      </footer>
    </div>
  );
}
