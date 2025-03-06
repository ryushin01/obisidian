import Image from "next/image";
import { WooriBankLogoIcon } from "@icons";
import { RGSTR_GB_CD, RGSTR_TEXT } from "@constants";
import { BadgeColorType } from "@components/Constants";
import { Badge, Typography } from "@components";
import {
  formatStringToDate,
  getCompareWithToday,
  getDay,
} from "@utils/dateUtil";

const pathSpy = () => {
  const localSt = globalThis?.localStorage;
  const putPath = localSt.getItem("checkPath");

  if (!localSt) {
    return;
  }

  localSt.setItem("putPath", putPath!);
  localSt.setItem("checkPath", globalThis?.location.pathname);
};

export default function CarouselCard(props: TCntrData) {
  return (
    <div className="w-full pt-3 pb-8">
      <div
        className="justify-between h-[166px] rounded-2xl px-5 py-4"
        onClick={() => {
          pathSpy();
          //@ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            // @ts-ignore
            mode: "BOTTOM_TABVIEW_MOVE",
            data: {
              type: "1",
              url: `/my-case/cntr/${props.loanNo}?regType=${props.rgstrGbCd}`,
            },
          });
        }}
        style={{
          backgroundColor: "#FFF",
          boxShadow: "0px 1px 20px 0px rgba(234, 234, 234, 1)",
        }}
      >
        <div className="flex w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 items-center text-xs">
              {getCompareWithToday(props.date) === "same" && (
                <Badge colorType="orange-white">당일</Badge>
              )}
              <Typography
                color="text-kos-brown-500"
                type={Typography.TypographyType.B2}
              >
                {formatStringToDate(props.date, ". ")} ({getDay(props.date)})
              </Typography>
            </div>
            <Image
              src={WooriBankLogoIcon}
              alt="우리은행 아이콘"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="mt-3">
          <Typography
            className="line-clamp-2 h-[56px]"
            color="text-kos-brown-500"
            type={Typography.TypographyType.H3}
          >
            {props.lndThngAddr}
          </Typography>
          <div className="flex items-center mt-2">
            <Typography
              className="truncate relative pr-2 mr-2 after:content-[''] after:block after:w-[1px] after:h-[13px] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:bg-kos-gray-300"
              color="text-kos-brown-500"
              type={Typography.TypographyType.H5}
            >
              {props.dbtrNm}
            </Typography>
            <Typography
              className="mr-2"
              color="text-kos-gray-600"
              type={Typography.TypographyType.H4}
            >
              {props.loanNo}
            </Typography>
            <Badge
              colorType={
                props.rgstrGbCd === RGSTR_GB_CD["01"]
                  ? BadgeColorType.green
                  : props.rgstrGbCd === RGSTR_GB_CD["02"]
                  ? BadgeColorType.blue
                  : BadgeColorType.brown
              }
            >
              {RGSTR_TEXT[props.rgstrGbCd]}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
