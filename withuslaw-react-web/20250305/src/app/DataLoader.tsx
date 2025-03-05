"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResetIcon, DocumentIcon } from "@icons";
import { Carousel, Typography } from "@components";
import { useNoFilterMyCaseData } from "@libs";
import { authAtom } from "@stores";
import { useAtomValue } from "jotai";
import { TailSpin } from "react-loader-spinner";

export default function DataLoader() {
  const router = useRouter();
  const { officeNm, membNm } = useAtomValue(authAtom);
  // const [data, setData] = useState<TCntrData[]>([]);
  const [calledPageNum, setCalledPageNum] = useState<number[]>([]);
  const carouselRef = useRef<any>(null);
  const [allData, setAllData] = useState<TCntrData[]>([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [noFilteredData, getNoFilteredData, isPending] = useNoFilterMyCaseData({
    onSuccess(res, variables) {
      if (res.code === "00") {
        if (res.data.progCntrInfo.cntrList) {
          const newData = res.data.progCntrInfo.cntrList.reduce(
            (prev: TCntrData[], curr: any) => {
              return [...prev, ...curr.cntrDataList];
            },
            []
          );

          // pageNum이 있는 경우에만 호출된 pageNum을 추가
          if (!calledPageNum.includes(res.data.pageData.currPageNum)) {
            setCalledPageNum((prev) => [
              ...prev,
              res.data.pageData.currPageNum,
            ]);
          }
          // 기존 allData와 새로운 데이터를 합쳐서 업데이트
          setAllData((prevData) => [...prevData, ...newData]);
          setIsRefresh(false);
          console.log(isRefresh);
        }

        if (variables?.pageNum && !calledPageNum.includes(variables?.pageNum)) {
          setCalledPageNum((prev) => [...prev, variables?.pageNum]);
        }
      }
    },
  });

  // 데이터 & 캐러셀 초기화 함수
  const resetCarousel = () => {
    setAllData([]); // 데이터 초기화
    setCalledPageNum([1]); // 페이지 번호 초기화

    getNoFilteredData({
      pageNum: 1,
      pageSize: 5,
      cntrGb: "PROG",
      myCasePgYn: "N",
    });
    setCurrentSlide(0); // 슬라이드 인덱스를 0으로 초기화
    if (carouselRef.current) {
      carouselRef.current.goToSlide(0, true); // 첫 번째 슬라이드로 이동
    }
    setIsRefresh(true);
  };

  /** 상단 캐러셀 페이지네이션 */
  const handleCarouselMove = (currentSlide: number) => {
    if (
      !!noFilteredData?.data.pageData === false ||
      noFilteredData?.data.pageData?.last
    )
      return;

    setCurrentSlide(currentSlide);
    if (currentSlide + 1 === 5 * calledPageNum[calledPageNum.length - 1]) {
      setCurrentSlide(currentSlide);
      const nextPageNum = calledPageNum[calledPageNum.length - 1] + 1;
      getNoFilteredData({
        pageNum: nextPageNum,
        pageSize: 5,
        cntrGb: "PROG",
        myCasePgYn: "N",
      });
    }
  };

  /** 화면 랜더링시 데이터 & 캐러셀 초기화 */
  useEffect(() => {
    resetCarousel();
  }, []);

  // useEffect(() => {
  //   setAllData([]);
  //   setCalledPageNum([1]);
  //   getNoFilteredData({
  //     pageNum: 1,
  //     pageSize: 5,
  //     cntrGb: "PROG",
  //     myCasePgYn: "N",
  //   });
  // }, [getNoFilteredData]);

  /** data 재조회시 슬라이드 상태 유지 */
  useEffect(() => {
    if (!isRefresh && carouselRef.current) {
      carouselRef.current.goToSlide(currentSlide);
    }
  }, [allData]);

  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden">
        {/* 상단 캐러셀 리스트 */}
        <div className="flex justify-between items-end px-4">
          <Typography
            color="text-kos-brown-500"
            type={Typography.TypographyType.H1}
          >
            {officeNm}
            <br />
            {membNm}님
          </Typography>
          <div className="flex items-center">
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B4}
            >
              총 {noFilteredData?.data?.pageData?.totalElements ?? 0}개
            </Typography>
            <button
              type="button"
              className="bg-kos-white rounded-full"
              onClick={() => {
                resetCarousel(); // 데이터 & 캐러셀 초기화
              }}
            >
              <Image
                src={ResetIcon}
                alt="리프레쉬 아이콘"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="relative min-h-[218px]">
          {isPending && (
            <div className="absolute top-0 left-0 z-20 w-full flex items-center justify-center mt-3 mb-[38px] px-5 py-4 bg-kos-white rounded-[20px] h-[218px]">
              <TailSpin color="#FABE00" width={50} height={50} />
            </div>
          )}
          {!isPending && allData.length === 0 ? (
            <div className="absolute top-0 left-0 z-0 w-full px-[26px]">
              <div
                onClick={() => {
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "BOTTOM_TABVIEW_MOVE",
                    data: {
                      type: "2",
                      url: "/acceptance/match/case-accept",
                    },
                  });
                }}
                className="flex flex-col items-center justify-center h-[166px] mt-3 mb-[38px] px-5 py-4 bg-kos-white rounded-[20px] shadow-[3px_4px_12px_0px_rgba(161,_161,_161,_0.1),14px_16px_21px_0px_rgba(161,_161,_161,_0.09),87px_101px_37px_0px_rgba(161,_161,_161,_0.00)]"
              >
                <Image src={DocumentIcon} alt="문서 아이콘" width={48} />
                <Typography
                  className="mt-3 text-center"
                  color="text-kos-gray-600"
                  type={Typography.TypographyType.H5}
                >
                  진행중인 사건이 없습니다.
                  <br />
                  카드를 눌러 사건을 수임해보세요.
                </Typography>
              </div>
            </div>
          ) : (
            <Carousel.CarouselContainer
              allData={allData}
              onMove={handleCarouselMove}
              ref={carouselRef}
              currentSlide={currentSlide}
            >
              {allData?.map((el) => {
                return <Carousel.CarouselCard key={el.loanNo} {...el} />;
              })}
            </Carousel.CarouselContainer>
          )}
        </div>
      </div>
    </>
  );
}
