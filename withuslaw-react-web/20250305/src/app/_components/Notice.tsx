import React, { useEffect, useState } from "react";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useFetchApi } from "@hooks";
import { useMutation } from "@tanstack/react-query";

type TNotice = {
  ptupTtl: string;
  topYn: string;
  ptupSeq: string;
};

export default function Notice() {
  const { fetchApi } = useFetchApi();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const { data, mutate } = useMutation({
    mutationKey: ["board-list"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/board/list`,
        method: "post",
        body: {
          ptupDsc: "NOTI",
          ptupTrgtDsc: "NOTI",
          searchWord: "",
          page: 0,
          pageSize: 1,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("공지사항 리스트", res);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      {data?.list.length !== 0 && (
        <div className="relative max-w-md h-[48px] px-4 text-sm rounded-xl">
          <div className="flex items-center left-4">
            {data?.list?.map((item: TNotice, index: number) => (
              <div
                key={index}
                className={`flex items-center transition-all duration-1000 ease-out absolute w-full h-full ${
                  index === currentMessageIndex
                    ? "-top-0 opacity-100"
                    : "-top-full opacity-0"
                }`}
                onClick={() => {
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "NOTI_VIEW",
                    data: {
                      ptupSeq: item.ptupSeq,
                    },
                  });
                }}
              >
                <Typography
                  color={"text-kos-orange-500"}
                  type={TypographyType.H6}
                  className="mr-2"
                >
                  알림
                </Typography>
                <Typography
                  color={"text-kos-gray-600"}
                  type={TypographyType.B2}
                >
                  {item.ptupTtl}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
