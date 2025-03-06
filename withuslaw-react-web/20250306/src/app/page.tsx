"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RGSTR_GB_CD, RGSTR_TEXT } from "@constants";
import { BadgeColorType } from "@components/Constants";
import {
  Alarm,
  HamburgerMenu,
  SmartPhoneWithKosLogo,
  WooriBankLogoIcon,
  RightArrow,
  KosLogoWithText,
} from "@icons";
import { Badge, Loading, Notice, Typography } from "@components";
import { useFetchApi, useMoveScroll } from "@hooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/tabs";
import DataLoader from "@app/DataLoader";
import ListContainer from "@app/my-case/ListContainer";

type TData = {
  [key: string]: any;
  pageData: TPageData;
  allCnt: number;
  estmCnt: number;
  rgstrCnt: number;
  paymentCnt: number;
  execPlnDt: string;
  grpList: any;
  homeGrpInfoList: THomeGrpList[];
};

type TPageData = {
  currPageNum: number;
  last: boolean;
};

type THomeGrpList = {
  loanNo: string;
  dbtrNm: string;
  rgstrGbCd: string;
  rgstrGbNm: string;
  bnkCd: string;
  execPlnDt: string;
};

interface AlarmBadgeProps {
  show: boolean;
}

function AlarmBadge({ show }: AlarmBadgeProps) {
  if (!show) return null;
  // console.log(show);

  return (
    <span className="absolute top-[3px] right-[3px] w-[5px] h-[5px] bg-kos-orange-500 rounded-full" />
  );
}

export default function Home() {
  const { fetchApi } = useFetchApi();
  const { element, onMoveToScroll } = useMoveScroll();
  const [showBadge, setShowBadge] = useState(false);

  const infoTabData = {
    allCnt: { title: "전체", progCode: "ALL", index: 1 },
    estmCnt: { title: "견적서", progCode: "ESTM", index: 2 },
    rgstrCnt: { title: "등기 정보", progCode: "RGSTR", index: 3 },
    paymentCnt: { title: "지급 정보", progCode: "PAYMENT", index: 4 },
  };

  const { mutate } = useMutation({
    mutationKey: ["search-alarm-info"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/mesg/readhome`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("알람 여부 확인", res.data);
      if (res.data == "Y") {
        setShowBadge(true);
      } else {
        setShowBadge(false);
      }
    },
    onError: (error) => {
      console.log("실패", error);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  function CaseList() {
    const [activeIndex, setActiveIndex] = useState<any>(0);
    const [pageNum, setPageNum] = useState(1);
    const [progCd, setProgCd] = useState("ALL");
    const [listHeight, setListHeight] = useState(0);
    const panelRef = useRef<any>(null);
    const tabListRef = useRef<HTMLDivElement>(null);
    // 하단 정보 조회
    const { data: getHomeList, isLoading } = useQuery({
      queryKey: ["rgstr-homegrpinfo", progCd, pageNum],
      queryFn: (): Promise<TData> =>
        fetchApi({
          url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/rgstr/homegrpinfo/${progCd}/${pageNum}`,
          method: "get",
        })
          .then((res) => res.json())
          .then((res) => res.data),
    });

    useEffect(() => {
      if (pageNum === 1) {
        panelRef.current.scrollTop = 0;
        setListHeight(0);
      } else if (panelRef.current) {
        const height = panelRef.current.scrollHeight;
        if (listHeight < height) {
          panelRef.current.scrollTop = height;
        }
        return setListHeight(height);
      }
    }, [isLoading, pageNum]);

    return (
      <>
        {isLoading && <Loading />}
        <section className="py-8 px-4" ref={element}>
          <Typography
            color="text-kos-logo-brown"
            type={Typography.TypographyType.H2}
          >
            실행일 전에 진행해주세요
          </Typography>
          <Tabs
            onClick={onMoveToScroll}
            defaultIndex={parseInt(activeIndex)}
            onChange={(index: any) => {
              const progGd =
                index === 0
                  ? infoTabData.allCnt
                  : index === 1
                  ? infoTabData.estmCnt
                  : index === 2
                  ? infoTabData.rgstrCnt
                  : index === 3
                  ? infoTabData.paymentCnt
                  : undefined;
              setActiveIndex(progGd);
            }}
          >
            <TabList
              ref={tabListRef}
              className="mt-[17px] p-[5px] bg-kos-gray-100 rounded-[20px] shadow-tabList"
            >
              {Object.entries(infoTabData).map(([key, { title, progCode }]) => {
                return (
                  <Tab
                    onClick={() => {
                      setProgCd(progCode);
                      setPageNum(1);
                    }}
                    key={key}
                    className={`relative flex-col items-start px-3 py-2.5 basis-1/2 rounded-[14px] ${
                      progCd === progCode ? "bg-kos-white" : "bg-transparent"
                    } ${
                      progCd !== progCode && progCode !== "PAYMENT"
                        ? "after:absolute after:right-0 after:top-1/4 after:bg-kos-gray-300 after:w-[1px] after:h-[42px]"
                        : "after-none"
                    }
                        `}
                  >
                    <Typography
                      className="mr-auto"
                      color={`${
                        progCd === progCode
                          ? "text-kos-gray-700"
                          : "text-kos-gray-600"
                      }`}
                      type={Typography.TypographyType.B4}
                    >
                      {title}
                    </Typography>
                    <Typography
                      className="ml-auto mt-1"
                      color="text-kos-logo-brown"
                      type={Typography.TypographyType.H6}
                    >
                      {getHomeList?.[key] ?? 0}건
                    </Typography>
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels className="pb-5" ref={panelRef}>
              {Object.entries(infoTabData).map(([key]) => {
                return (
                  <TabPanel key={key}>
                    {getHomeList?.grpList.map(
                      (parent: TData, index: number) => (
                        <ul
                          key={parent.execPlnDt}
                          className={`${index === 0 ? "mt-6" : "mt-8"}`}
                        >
                          <ListContainer
                            date={parent.execPlnDt}
                            key={parent.allCnt}
                            className="text-base"
                          >
                            <li className="mt-3 px-5 py-4 bg-kos-white rounded-[20px] shadow-[0px_1px_20px_0px_#EAEAEA]">
                              {parent?.homeGrpInfoList.map(
                                (child, index, array) => (
                                  <div
                                    key={child.loanNo}
                                    onClick={() => {
                                      //@ts-ignore
                                      window.flutter_inappwebview.callHandler(
                                        "flutterFunc",
                                        {
                                          // @ts-ignore
                                          mode: "BOTTOM_TABVIEW_MOVE",
                                          data: {
                                            type: "1",
                                            url: `/my-case/cntr/${child.loanNo}?regType=${child.rgstrGbCd}`,
                                          },
                                        }
                                      );
                                    }}
                                    className={`flex items-center py-5 ${
                                      index === 0 && "pt-0"
                                    } 
                                    ${
                                      index !== array.length - 1
                                        ? "border-b border-b-1 border-kos-gray-200"
                                        : "pb-0"
                                    }`}
                                  >
                                    <div className="flex max-w-[78%]">
                                      <Image
                                        src={WooriBankLogoIcon}
                                        alt="우리은행 로고"
                                        width={24}
                                        height={24}
                                      />
                                      <Typography
                                        className="relative ml-2 mr-4 after:absolute after:right-[-8px] after:top-1/4 after:bg-kos-tab-bg after:w-[1px] after:h-[13px] truncate"
                                        color="text-kos-logo-brown"
                                        type={Typography.TypographyType.H5}
                                      >
                                        {child.dbtrNm}
                                      </Typography>
                                      <Typography
                                        className="font-normal"
                                        color="text-kos-gray-600"
                                        type={Typography.TypographyType.B1}
                                      >
                                        {child.loanNo}
                                      </Typography>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                      <Badge
                                        colorType={
                                          child.rgstrGbCd === RGSTR_GB_CD["01"]
                                            ? BadgeColorType.green
                                            : child.rgstrGbCd ===
                                              RGSTR_GB_CD["02"]
                                            ? BadgeColorType.blue
                                            : BadgeColorType.brown
                                        }
                                      >
                                        {RGSTR_TEXT[child.rgstrGbCd]}
                                      </Badge>
                                      <Image
                                        className="ml-2"
                                        src={RightArrow}
                                        alt="링크 화살표 아이콘"
                                        width={24}
                                        height={24}
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </li>
                          </ListContainer>
                        </ul>
                      )
                    )}
                  </TabPanel>
                );
              })}
              {getHomeList?.pageData && !getHomeList?.pageData?.last && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setPageNum((prevPageNum) => prevPageNum + 1);
                    }}
                    style={{
                      boxShadow:
                        "3px 4px 12px 0px rgba(161, 161, 161, 0.10), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 87px 101px 37px 0px rgba(161, 161, 161, 0.00)",
                    }}
                    className="_flex-center w-[120px] mt-2 py-3 bg-kos-white rounded-full text-base text-kos-gray-500"
                  >
                    더 보기
                  </button>
                </div>
              )}
            </TabPanels>
          </Tabs>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 w-full z-30 box-border">
        <div
          className={
            "h-[60px] w-full flex justify-between items-center bg-kos-white pl-4 pr-2"
          }
        >
          <h1>
            <Image src={KosLogoWithText} alt="KOS 로고" />
          </h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="_flex-center relative w-9 h-9"
              onClick={() => {
                //@ts-ignore
                window.flutter_inappwebview
                  .callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "URL_MOVE",
                    data: {
                      url: "/MoAlramPage",
                    },
                  })
                  .then(() => {
                    setShowBadge(false);
                  });
              }}
            >
              <Image src={Alarm} alt="알람 아이콘" width={18} height={18} />
              <AlarmBadge show={showBadge} />
            </button>
            <button
              type="button"
              onClick={() => {
                //@ts-ignore
                window.flutter_inappwebview.callHandler("flutterFunc", {
                  // @ts-ignore
                  mode: "URL_MOVE",
                  data: {
                    url: "/MoMainPage",
                  },
                });
              }}
            >
              <Image
                src={HamburgerMenu}
                alt="메뉴 토글 아이콘"
                width={36}
                height={36}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        className={`w-full flex flex-col overflow-x-hidden
      ${process.env.NEXT_PUBLIC_APP_MODE === "local" ? "pb-20" : ""}
      `}
      >
        {/* Notice */}
        <section className="bg-kos-gray-100">
          <h2 className="sr-only">알림 영역</h2>
          <Notice />
        </section>

        {/* 상단 캐러셀 리스트 */}
        <section className="mt-8">
          <h2 className="sr-only">내 사건 영역</h2>
          <DataLoader />
        </section>

        {/* 배너 이미지 */}
        <section className="py-2 px-4">
          <h2 className="sr-only">배너 영역</h2>
          <div className="w-full h-[100px] relative overflow-hidden">
            <div className="w-full h-[100px] left-0 top-0 absolute bg-amber-300 rounded-[20px]" />
            <Image
              className="absolute bottom-[-2px] right-5"
              style={{ transform: "rotate(2deg)" }}
              src={SmartPhoneWithKosLogo}
              alt="KOS 앱을 연 스마트폰"
            />
            <div className="w-[247px] left-[24px] top-[25px] absolute">
              <span
                style={{ color: "rgba(35, 25, 22, 0.70)" }}
                className="text-sm font-semibold"
              >
                법무사 맞춤 서비스 제공!
              </span>
              <br />
              <span className="text-kos-logo-brown text-lg font-bold">
                새로워진 코스를 만나보세요
              </span>
            </div>
          </div>
        </section>

        {/* 하단 실행일 사건 리스트 */}
        <CaseList />
      </main>
    </>
  );
}
