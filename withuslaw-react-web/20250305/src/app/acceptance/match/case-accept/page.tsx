"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlignIcon, WooriBankLogoIcon } from "@icons";
import { Alert, CaseList, Typography } from "@components";
import { Checkbox } from "@components/button";
import { TypographyType } from "@components/typography/Constant";
import {
  useDisclosure,
  useFetchApi,
  useListInfiniteScroll,
  usePulltoRefresh,
} from "@hooks";
import { useAddInfoData } from "@libs";
import { authAtom, toastState } from "@stores";
import { formatDate, formatNumber } from "@utils";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { Sheet } from "react-modal-sheet";
import { getAddInfoStatus } from "@app/acceptance/match/getAddInfoStatus";
import RegionModal from "@app/acceptance/match/case-accept/RegionModal";
import RegionSelectedItem from "@app/acceptance/match/case-accept/RegionSelectedItem";

export default function CaseAcceptPage() {
  const authInfo = useAtomValue(authAtom);
  const callToast = useSetAtom(toastState);
  const el = useRef<any>(null);
  const router = useRouter();
  const { isOpen: isReptOpen, open: reptOpen } = useDisclosure();
  const { isOpen: isMembOpen, open: membOpen } = useDisclosure();
  const { isOpen: isIsrnWaitOpen, open: isrnWaitOpen } = useDisclosure();
  const { isOpen: isIsrnReturnOpen, open: isrnReturnOpen } = useDisclosure();
  const [filterOpen, setFilterOpen] = useState(false);
  const [showCommision, setShowCommision] = useState(false);
  const [activeSido, setActiveSido] = useState<TSido>({
    sidoNm: "",
    sidoCd: "",
    sidoNmCvt: "",
  });
  const [checkedSort, setCheckedSort] = useState([
    {
      id: "BASE",
      name: "기본순",
      sort: "BASE",
      isChecked: true,
    },
    {
      id: "RPRICE",
      name: "매매금액 높은 순",
      sort: "RPRICE",
      isChecked: false,
    },
    {
      id: "PRICE",
      name: "매매금액 낮은 순",
      sort: "PRICE",
      isChecked: false,
    },
    {
      id: "DATE",
      name: "실행일 빠른 순",
      sort: "DATE",
      isChecked: false,
    },
    {
      id: "RDATE",
      name: "실행일 늦은 순",
      sort: "RDATE",
      isChecked: false,
    },
  ]);
  const [saveSort, saveSetSort] = useState("BASE");
  const [sortName, setSortName] = useState<string>("기본순");
  const { fetchApi } = useFetchApi();
  const { rootRef } = useListInfiniteScroll();
  const isIos = sessionStorage.getItem("isIos");

  // 법무사 희망지역 저장
  const { mutate: saveRegion } = useMutation({
    mutationKey: [""],
    mutationFn: (selectedRegions: TSgg[]) => {
      /**전체 일 경우 빈 값으로 데이터 보내기 */
      const allRegion = selectedRegions?.some(
        (region) => region.sggNm === "전체"
      )
        ? selectedRegions
            .filter((region) => region.sggNm === "전체")
            .map(({ sidoNm, sidoCd, sidoNmCvt }) => ({
              sidoNm,
              sidoCd,
              sidoNmCvt,
            }))
        : [];

      const existRegion = selectedRegions.filter(
        (region) => region.sggNm !== "전체"
      );

      const updateRegions = [...existRegion, ...allRegion];

      return fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/brnch/crtmachlocalinfolist`,
        method: "post",
        body: updateRegions,
      }).then((res) => res.json());
    },
    onSuccess: (res) => {
      getSearchRegion();

      if (res.code === "00") caseList({ sort: saveSort });
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  // 사건수임 리스트 조회
  const { data: caseData, mutate: caseList } = useMutation({
    mutationKey: [""],
    mutationFn: ({ sort }: { sort: string }) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregbfmatchinfolist/${sort}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("사건수임 리스트 조회", res);
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  // 동시성 코드 업데이트
  const { mutate: updateMatchCode } = useMutation({
    mutationKey: [""],
    mutationFn: ({ loanNo, statCd }: TCaseArgs) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/procconcurrencycontrol/${loanNo}/${statCd}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res, variables) => {
      if (res.code === "00") {
        router.push(`/acceptance/match/${variables.loanNo}`);
      } else {
        callToast({
          msg: res.msg,
          status: "error",
        });
        caseList({ sort: saveSort });
      }

      console.log("동시성 코드 업데이트", res);
    },
    onError: (error) => {
      console.log("실패", error);
    },
  });

  // 내 관심지역 가져오기
  const { data: searchRegionData, mutate: getSearchRegion } = useMutation({
    mutationKey: [""],
    mutationFn: async () => {
      try {
        const response = await fetchApi({
          url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/brnch/searchmymachlocalinfolist`,
          method: "post",
        });

        const res = await response.json();

        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res) => {
      console.log("내 관심지역 조회", res);

      if (res?.data?.length !== 0) {
        const [{ sidoCd, sidoNm, sidoNmCvt }] = res?.data;
        setActiveSido && setActiveSido({ sidoCd, sidoNm, sidoNmCvt });
        caseList({ sort: saveSort });
      } else {
        setShowCommision(true);
      }
    },
    onError: (error) => {
      console.log("실패", error);
    },
  });

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData({
    onSuccess: (checkAddInfo: TObj) => {
      const trregElement = checkAddInfo?.data?.trregElement;
      const trregPssbYn = checkAddInfo?.data?.trregPssbYn;

      // 보험가입 증명서 승인 대기/반려
      if (authInfo.isRept && trregPssbYn === "N") {
        if (
          trregElement?.elregIdYn === "Y" &&
          trregElement?.cmmsAcctYn === "Y" &&
          trregElement?.profiImgYn === "Y"
        ) {
          if (trregElement?.isrnEntrAprvGbCd === "01") {
            isrnWaitOpen();
          } else if (trregElement?.isrnEntrAprvGbCd === "02") {
            isrnReturnOpen();
          } else {
            reptOpen();
          }
        } else {
          reptOpen();
        }
      } else if (!authInfo.isRept && trregPssbYn === "N") {
        const { isBank, isFormId, isProfile } = getAddInfoStatus(
          checkAddInfo?.data?.trregElement
        );

        if (!isProfile) {
          membOpen();
        } else {
          router.push("/acceptance/match/add-info/rept/notice");
        }
      } else if (trregPssbYn === "Y") {
        getSearchRegion();
      }
    },
  });

  /** 대표 / 소속직원 상태 */
  const { isBank, isFormId, isProfile, isrnEntrBefore } = getAddInfoStatus(
    checkAddInfo?.data?.trregElement
  );

  /** 정렬 필터 */
  const handleSortClick = (index: number) => {
    const sortItem = checkedSort[index];
    setSortName(sortItem.name);

    setCheckedSort((prev) =>
      prev.map((item, i) => ({
        ...item,
        isChecked: i === index,
        // isChecked: i === index && !item.isChecked,
      }))
    );
    caseList({ sort: sortItem.sort });
    saveSetSort(sortItem.sort);
  };

  useEffect(() => {
    const handleRouteChange = async () => {
      await getCheckAddInfo();
    };

    handleRouteChange();

    return () => {};
  }, [getCheckAddInfo]);

  usePulltoRefresh(filterOpen || showCommision ? "" : rootRef, getCheckAddInfo);

  return (
    <main
      className={`${
        process.env.NEXT_PUBLIC_APP_MODE === "local" ? "pb-20" : ""
      }`}
    >
      {/* 추가정보: 대표 */}
      <Alert
        isOpen={isReptOpen}
        title={`사건수임을 위해 \n아래 추가정보 등록이 필요합니다`}
        cancelText="취소"
        cancelCallBack={() => {
          // router.push("/");
          router.push("/acceptance/match/case-accept");
          //@ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            // @ts-ignore
            mode: "GO_HOME",
            data: {
              type: "0",
              url: "",
            },
          });
        }}
        confirmCallBack={() => {
          if (!isProfile) {
            router.push("/acceptance/match/add-info/profile");
          } else if (!isBank) {
            router.push("/acceptance/match/add-info/rept/commision");
          } else if (!isFormId) {
            router.push("/acceptance/match/add-info/rept/id");
          } else if (
            checkAddInfo?.data?.trregElement?.isrnEntrAprvGbCd === "00"
          ) {
            router.push("/acceptance/match/add-info/rept/isrn");
          }
        }}
        bodyText={`${!isProfile ? "• 프로필 사진\n" : ""}${
          !isBank ? "• 법무수수료 안내용 계좌\n" : ""
        }${!isFormId ? "• E-FORM ID\n" : ""}${
          checkAddInfo?.data?.trregElement?.isrnEntrAprvGbCd === "00"
            ? "• 보험가입증명서 (사진첨부필수)\n"
            : ""
        }`}
      />

      {/* 추가정보: 소속 직원 */}
      <Alert
        isOpen={isMembOpen}
        title={
          <p>
            사건수임을 위해 <br />
            프로필 사진 등록이 필요합니다
          </p>
        }
        cancelText="취소"
        cancelCallBack={() => {
          // router.push("/");
          router.push("/acceptance/match/case-accept");
          //@ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            // @ts-ignore
            mode: "GO_HOME",
            data: {
              type: "0",
              url: "",
            },
          });
        }}
        confirmCallBack={() => {
          if (!isProfile) {
            router.push("/acceptance/match/add-info/profile");
          }
        }}
        bodyText={"[확인]을 누르면 등록 페이지로 이동합니다."}
      />

      {/* 보험가입 증명서 승인 대기 */}
      <Alert
        isOpen={isIsrnWaitOpen}
        title={
          <p>
            보험가입증명서 관리자 승인 후 <br />
            이용 가능합니다
          </p>
        }
        confirmCallBack={() => {
          // router.push("/");
          router.push("/acceptance/match/case-accept");
          //@ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            // @ts-ignore
            mode: "GO_HOME",
            data: {
              type: "0",
              url: "",
            },
          });
        }}
      />

      {/* 보험가입 증명서 반려 */}
      <Alert
        isOpen={isIsrnReturnOpen}
        title={<p>보험가입증명서가 반려되었습니다</p>}
        confirmCallBack={() => {
          // TODO:: 재등록 페이지로 이동필요
          router.push("/acceptance/match/add-info/rept/isrn");
        }}
        confirmText="등록하기"
        bodyText={`가입기간이 유효하지 않습니다.\n다시 등록해주세요.`}
      />

      {/* 지역 선택 */}
      <section className="_header-next-sticky-area w-full flex justify-between pl-4 py-4 bg-kos-white border-b-kos-gray-200 border-b-8 z-[1]">
        <h2 className="sr-only">지역 선택 영역</h2>
        <div className="flex w-auto grow overflow-x-auto w-[173px] min-h-[40px] pr-2.5">
          <RegionSelectedItem
            selectedRegions={searchRegionData?.data}
            setShowCommision={setShowCommision}
          />
        </div>
        {/* <div
          onClick={() => {
            if (!!searchRegionData?.data) {
              const [{ sidoCd, sidoNm, sidoNmCvt }] = searchRegionData?.data;
              setActiveSido && setActiveSido({ sidoCd, sidoNm, sidoNmCvt });
            }
            setShowCommision(true);
          }}
          className="flex items-center shrink-0 pr-4 text-[14px] text-[#545454] font-semibold z-[1] shadow-[-40px_0px_14px_-5px_#fff]"
        >
          <span className="flex justify-center mr-1 w-6">
            <Image src={RegionIcon} alt="region icon" />
          </span>
          지역선택
        </div> */}
      </section>

      {/* 사건 내역 */}
      <section ref={rootRef}>
        <h2 className="sr-only">사건수임 사건 목록 영역</h2>
        <div className="pt-[24px] px-4 pb-10" ref={el}>
          {!!caseData?.data?.length && caseData?.data?.length > 0 ? (
            <>
              <div className="flex items-center">
                <Typography
                  color={"text-kos-gray-900"}
                  type={TypographyType.H2}
                >
                  총 {caseData?.data?.length}건의 사건이 있어요
                </Typography>
                {/* 리프레시버튼 추가 */}
                {/* <button
                type="button"
                className="bg-kos-white rounded-full"
                onClick={() => {
                  getCheckAddInfo([]);
                  if (!!el.current) {
                    // @ts-ignore
                    el.current.goToSlide(0, true);
                  }
                }}
              >
                <Image
                  src={ResetIcon}
                  alt="reset icon"
                  width={24}
                  height={24}
                />
              </button> */}
              </div>

              <div
                className="text-[14px] text-[#545454] font-semibold"
                onClick={() => {
                  setFilterOpen(true);
                  // @ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    mode: "BOTTOM",
                    data: {
                      type: "false",
                    },
                  });
                }}
              >
                {sortName && (
                  <button
                    type="button"
                    className={`ml-[auto] border border-solid border-[#EAEAEA] rounded-lg flex items-center p-2 gap-1`}
                  >
                    <Image src={AlignIcon} width={24} alt="필터 아이콘" />
                    <Typography
                      color={"text-kos-gray-700"}
                      type={TypographyType.B4}
                    >
                      {sortName}
                    </Typography>
                  </button>
                )}
                {/* {sortName === "기본순" ? (
                  <button
                    className={`ml-[auto] border border-solid border-[#EAEAEA] rounded-lg flex items-center p-2 gap-1`}
                  >
                    <Image src={AlignIcon} width={24} alt="check icon" />
                    <Typography
                      color={"text-kos-gray-700"}
                      type={TypographyType.B4}
                    >
                      {sortName}
                    </Typography>
                  </button>
                ) : (
                  <button
                    className={`ml-[auto] bg-[#FFF8EE] rounded-lg flex items-center p-2 gap-1`}
                  >
                    <Image src={AlignActiveIcon} width={24} alt="check icon" />
                    <Typography
                      color={"text-kos-orange-500"}
                      type={TypographyType.B4}
                    >
                      {sortName}
                    </Typography>
                  </button>
                )} */}
              </div>

              {/* 정렬 모달 */}
              <Sheet
                isOpen={filterOpen}
                onClose={() => {
                  setFilterOpen(false);
                  // @ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    mode: "BOTTOM",
                    data: {
                      type: "true",
                    },
                  });
                }}
                detent={"content-height"}
                snapPoints={[600, 400, 100, 0]}
              >
                <Sheet.Container
                  style={{
                    boxShadow: "none",
                    borderRadius: "20px 20px 0 0",
                  }}
                >
                  <Sheet.Header />
                  <div className="py-4 text-center text-lg text-[#2E2E2E] font-semibold">
                    <p>정렬</p>
                  </div>
                  <Sheet.Content className={`${!!isIos ? "pb-5" : ""}`}>
                    <ul>
                      {checkedSort.map((item, index) => (
                        <li
                          key={item.id}
                          className="flex items-center w-full justify-between py-3 px-4"
                          onClick={() => {
                            handleSortClick(index);
                            setFilterOpen(false);
                            // @ts-ignore
                            window.flutter_inappwebview.callHandler(
                              "flutterFunc",
                              {
                                mode: "BOTTOM",
                                data: {
                                  type: "true",
                                },
                              }
                            );
                          }}
                        >
                          <Typography
                            color={`${
                              item.isChecked
                                ? "text-kos-brand-900 font-semibold"
                                : "text-kos-gray-600 font-medium"
                            }`}
                            type={TypographyType.B1}
                          >
                            {item.name}
                          </Typography>
                          {item.isChecked && (
                            <Checkbox
                              size="Small"
                              id={item.sort}
                              checked={item.isChecked}
                              onChange={(prevState) => !prevState}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop
                  onTap={() => {
                    setFilterOpen(false);
                    // @ts-ignore
                    window.flutter_inappwebview.callHandler("flutterFunc", {
                      mode: "BOTTOM",
                      data: {
                        type: "true",
                      },
                    });
                  }}
                  style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
                />
              </Sheet>

              {/* 사건 리스트 */}
              <ul className="flex flex-col">
                {caseData?.data?.map((data: TCaseData) => (
                  <li
                    key={data.loanNo}
                    onClick={() =>
                      updateMatchCode({ loanNo: data.loanNo, statCd: "10" })
                    }
                    className={`${
                      caseData?.data.length &&
                      "bg-red border-b border-b-1 border-kos-gray-200"
                    }`}
                  >
                    <CaseList.CaseListItem
                      rgstrGbCd={data.regType}
                      leftItem={
                        <Image src={WooriBankLogoIcon} alt="우리은행 로고" />
                      }
                      footerRightItem={`${formatNumber(data.slPrc)}`}
                      price={true}
                      contentsList={[
                        <CaseList.Address
                          key={data.dpAddr}
                          address={data.dpAddr}
                        />,
                        <CaseList.NameWithLoanNo
                          key={data.dbtrNm}
                          firstItem={data.dbtrNm}
                          secondItem={`${formatDate(data.execPlnDt)}`}
                        />,
                      ]}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex align-center justify-center mt-[150px]">
              <Typography color={"text-kos-gray-600"} type={TypographyType.H5}>
                대기중인 사건이 없습니다.
              </Typography>
            </div>
          )}
        </div>
      </section>

      {showCommision && (
        <RegionModal
          searchRegionData={searchRegionData?.data}
          activeSido={activeSido}
          setShowCommision={setShowCommision}
          saveRegion={saveRegion}
        />
      )}
    </main>
  );
}
