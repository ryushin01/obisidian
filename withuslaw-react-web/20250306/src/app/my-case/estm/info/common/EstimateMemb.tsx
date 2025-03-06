import React from "react";
import Image from "next/image";
import { ProfileImg } from "@icons";
import { Typography } from "@components";
import { hypenNumber } from "@utils/hypenNumber";

type TProps = {
  clientForm: TEstimateSaveForm;
  isDDay?: string | null;
  searchDbtrInfo?: TEstimateSaveForm;
};

export default function EstimateMemb({
  clientForm,
  isDDay,
  searchDbtrInfo,
}: TProps) {
  const time = parseInt(clientForm?.schdTm?.slice(0, 2)) + "시" + " ";
  let result;

  if (clientForm?.schdTm?.slice(3, 5) !== "00") {
    result = time + clientForm?.schdTm?.slice(3, 5) + "분";
  } else {
    result = time;
  }

  return (
    <div className="px-4 py-6">
      {isDDay ? (
        <div>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            담당자 정보
          </Typography>
          <div className="flex justify-center w-[80px] h-[80px] mt-[22px] mx-auto rounded-full overflow-hidden">
            {clientForm?.imgSeq === "" ? (
              <Image src={ProfileImg} alt="profile" width={80} />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchview?imgSeq=${clientForm?.imgSeq}`}
                alt="profile image"
                width={80}
                height={80}
                className="object-cover"
                unoptimized={true}
              />
            )}
          </div>
          <div className="flex items-center justify-between mt-[11px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              담당자
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {clientForm?.mvLwyrMembNm}
            </Typography>
          </div>
          <div className="flex items-center justify-between mt-[9px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              전화번호
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {hypenNumber(clientForm?.mvLwyrMembCphnNo)}
            </Typography>
          </div>
          <div className="flex items-center justify-between mt-[9px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              잔금일시
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {searchDbtrInfo?.execDtmmdd.slice(0, 3) +
                " " +
                searchDbtrInfo?.execDtmmdd.slice(3)}{" "}
              {searchDbtrInfo?.schdDateTime}
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            담당자 정보
          </Typography>
          <div className="flex justify-center w-[80px] h-[80px] mt-[22px] mx-auto rounded-full overflow-hidden">
            {clientForm?.imgSeq === "" ? (
              <Image src={ProfileImg} alt="profile" width={80} />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchview?imgSeq=${clientForm?.imgSeq}`}
                alt={`${clientForm?.membNm} 프로필 사진`}
                width={80}
                height={80}
                className="object-cover"
                unoptimized={true}
              />
            )}
          </div>
          <div className="flex items-center justify-between mt-[11px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              담당자
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {clientForm?.membNm}
            </Typography>
          </div>
          <div className="flex items-center justify-between mt-[9px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              전화번호
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {hypenNumber(clientForm?.cphnNo)}
            </Typography>
          </div>
          {clientForm.schdTm !== "" && (
            <div className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                잔금일시
              </Typography>
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.B1}
              >
                {clientForm.execDtmmdd} {result}
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
